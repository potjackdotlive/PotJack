import { expect } from "chai";
import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import {
  Raffle,
  MockV3Aggregator,
  TestToken,
  VRFCoordinatorV2_5Mock
} from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("Raffle", function () {
  let raffle: Raffle,
    owner: HardhatEthersSigner,
    alice: HardhatEthersSigner,
    bob: HardhatEthersSigner,
    charlie: HardhatEthersSigner,
    beneficiary: HardhatEthersSigner,
    mockBtcPriceFeed: MockV3Aggregator,
    mockEthPriceFeed: MockV3Aggregator,
    mockTokenPriceFeed: MockV3Aggregator,
    testToken: TestToken,
    vrfCoordinator: VRFCoordinatorV2_5Mock,
    testTokenAddress: string,
    ethAddress: string;

  // Test constants
  const SUBSCRIPTION_ID = 1;
  const KEY_HASH =
    "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c";
  const ENTRANCE_FEE = 1; // 1%
  const CALLBACK_GAS_LIMIT = 500000;
  const BTC_PRICE = 50_000_000_000n; // $50,000 (6 decimals)
  const ETH_PRICE = 30_000_000_000_000_000n; // 30 ETH (18 decimals)
  const TEST_TOKEN_PRICE = 1000000n; // $1.00 (6 decimals)
  const TICKET_BTC_PRICE = 5000n; // 0.00005 BTC (8 decimals) = 0.00005 * 10^8

  beforeEach(async function () {
    [owner, alice, bob, charlie, beneficiary] = await ethers.getSigners();

    // Deploy VRF Coordinator Mock
    const VRFCoordinatorV2_5MockFactory = await ethers.getContractFactory(
      "VRFCoordinatorV2_5Mock"
    );
    vrfCoordinator = await VRFCoordinatorV2_5MockFactory.deploy(0, 0, 0);
    await vrfCoordinator.waitForDeployment();
    await vrfCoordinator.createSubscription();

    // Deploy mock price feeds
    const MockV3AggregatorFactory = await ethers.getContractFactory(
      "MockV3Aggregator"
    );

    // BTC Price Feed (8 decimals)
    mockBtcPriceFeed = await MockV3AggregatorFactory.deploy(8, BTC_PRICE);
    await mockBtcPriceFeed.waitForDeployment();

    // ETH Price Feed (8 decimals)
    mockEthPriceFeed = await MockV3AggregatorFactory.deploy(8, ETH_PRICE);
    await mockEthPriceFeed.waitForDeployment();

    // Update price feeds with current timestamp to avoid staleness
    const currentTime = Math.floor(Date.now() / 1000);
    await mockBtcPriceFeed.updateRoundData(1, BTC_PRICE, currentTime, 1);
    await mockEthPriceFeed.updateRoundData(1, ETH_PRICE, currentTime, 1);

    // Test Token Price Feed (8 decimals)
    mockTokenPriceFeed = await MockV3AggregatorFactory.deploy(
      8,
      TEST_TOKEN_PRICE
    );
    await mockTokenPriceFeed.waitForDeployment();

    // Deploy test token
    const TestTokenFactory = await ethers.getContractFactory("TestToken");
    testToken = await TestTokenFactory.deploy("TestToken", "TT");
    await testToken.waitForDeployment();
    testTokenAddress = await testToken.getAddress();
    ethAddress = ethers.ZeroAddress; // This is address(0) in Solidity

    // Mint tokens to test accounts
    await testToken.grantRole(await testToken.MINTER_ROLE(), owner.address);
    await testToken.grantRole(await testToken.MINTER_ROLE(), alice.address);
    await testToken.grantRole(await testToken.MINTER_ROLE(), bob.address);
    await testToken.grantRole(await testToken.MINTER_ROLE(), charlie.address);

    await testToken.mint(alice.address, ethers.parseEther("10000"));
    await testToken.mint(bob.address, ethers.parseEther("10000"));
    await testToken.mint(charlie.address, ethers.parseEther("10000"));

    // Deploy Raffle contract
    const RaffleFactory = await ethers.getContractFactory("Raffle");
    raffle = await RaffleFactory.deploy(
      SUBSCRIPTION_ID,
      KEY_HASH,
      ENTRANCE_FEE,
      CALLBACK_GAS_LIMIT,
      await vrfCoordinator.getAddress(),
      beneficiary.address,
      await mockBtcPriceFeed.getAddress(),
      await mockEthPriceFeed.getAddress(),
      [testTokenAddress], // Supported tokens
      [await mockTokenPriceFeed.getAddress()] // Token price feeds
    );
    await raffle.waitForDeployment();

    // The automation role is already granted to VRF coordinator in the constructor
  });

  describe("Deployment", function () {
    it("Should deploy with correct initial values", async function () {
      expect(await raffle.getSupportedTokens()).to.include(testTokenAddress);
      expect(await raffle.isSupportedToken(testTokenAddress)).to.be.true;
      expect(await raffle.isSupportedToken(ethAddress)).to.be.true;
    });
  });

  describe("Price Functions", function () {
    it("Should return correct BTC ticket price", async function () {
      const price = await raffle.getTicketPriceInBtc();
      expect(price).to.equal(TICKET_BTC_PRICE);
    });

    it("Should return correct USD ticket price", async function () {
      const price = await raffle.getTicketPriceInUsd();
      expect(price).to.equal(25000n); // 0.025 USD (6 decimals)
    });

    it("Should return correct ETH ticket price", async function () {
      const price = await raffle.getTicketPriceInEth();
      expect(price).to.equal(1500_000_000_000n); // 0.0000015 ETH (18 decimals)
    });

    it("Should return correct token ticket price", async function () {
      const price = await raffle.getTicketPriceForToken(testTokenAddress);
      // This depends on the token's decimals and price feed
      expect(price).to.be.gt(0);
    });

    it("Should revert for unsupported token", async function () {
      const unsupportedToken = bob.address;
      await expect(
        raffle.getTicketPriceForToken(unsupportedToken)
      ).to.be.revertedWithCustomError(raffle, "Raffle__PriceFeedNotSet");
    });

    it("Should revert for invalid price data", async function () {
      // Set invalid price
      await mockBtcPriceFeed.updateRoundData(0, -1n, await time.latest(), 0);

      await expect(raffle.getTicketPriceInUsd()).to.be.revertedWithCustomError(
        raffle,
        "Raffle__InvalidPriceData"
      );
    });
  });

  describe("Ticket Purchase", function () {
    it("Should revert if token is not supported", async function () {
      const unsupportedToken = bob.address;
      await expect(
        raffle.connect(alice).buyTicket(unsupportedToken, 1)
      ).to.be.revertedWithCustomError(raffle, "Raffle__TokenNotSupported");
    });

    it("Should revert if count is 0", async function () {
      await expect(
        raffle.connect(alice).buyTicket(testTokenAddress, 0)
      ).to.be.revertedWithCustomError(raffle, "Raffle__InvalidTicketCount");
    });

    it("Should revert if insufficient ETH payment", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await expect(
        raffle
          .connect(alice)
          .buyTicket(ethAddress, 1, { value: ticketPrice - 1n })
      ).to.be.revertedWithCustomError(raffle, "Raffle__InsufficientFunds");
    });

    it("Should revert if insufficient token allowance", async function () {
      const ticketPrice = await raffle.getTicketPriceForToken(testTokenAddress);
      await expect(
        raffle.connect(alice).buyTicket(testTokenAddress, 1)
      ).to.be.revertedWithCustomError(raffle, "Raffle__InsufficientAllowance");
    });

    it("Should revert if insufficient token balance", async function () {
      const ticketPrice = await raffle.getTicketPriceForToken(testTokenAddress);
      await testToken
        .connect(alice)
        .approve(await raffle.getAddress(), ticketPrice);

      // Transfer all tokens away
      await testToken
        .connect(alice)
        .transfer(bob.address, await testToken.balanceOf(alice.address));

      await expect(
        raffle.connect(alice).buyTicket(testTokenAddress, 1)
      ).to.be.revertedWithCustomError(raffle, "Raffle__InsufficientFunds");
    });

    it("Should successfully buy tickets with ETH", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      const ticketCount = 3;
      const totalCost = ticketPrice * BigInt(ticketCount);

      await expect(
        raffle
          .connect(alice)
          .buyTicket(ethAddress, ticketCount, { value: totalCost })
      ).to.emit(raffle, "TicketPurchased");

      // Check round data
      const [round, players] = await raffle.getRaffleRoundData(ethAddress, 0);
      expect(round.status).to.equal(1); // Open
      expect(round.poolBalance).to.equal(
        totalCost - (totalCost * BigInt(ENTRANCE_FEE)) / 100n
      );
      expect(round.commissionBalance).to.equal(
        (totalCost * BigInt(ENTRANCE_FEE)) / 100n
      );
      expect(players.length).to.equal(1);
      expect(players[0].player).to.equal(alice.address);
      expect(players[0].ticketsCount).to.equal(ticketCount + 1); // +1 for bonus ticket
      expect(players[0].hasBonusTicket).to.be.true;
    });

    it("Should successfully buy tickets with ERC20 token", async function () {
      const ticketPrice = await raffle.getTicketPriceForToken(testTokenAddress);
      const ticketCount = 2;
      const totalCost = ticketPrice * BigInt(ticketCount);

      await testToken
        .connect(alice)
        .approve(await raffle.getAddress(), totalCost);

      await expect(
        raffle.connect(alice).buyTicket(testTokenAddress, ticketCount)
      ).to.emit(raffle, "TicketPurchased");

      // Check round data
      const [round, players] = await raffle.getRaffleRoundData(
        testTokenAddress,
        0
      );
      expect(round.status).to.equal(1); // Open
      expect(players.length).to.equal(1);
      expect(players[0].player).to.equal(alice.address);
      expect(players[0].ticketsCount).to.equal(ticketCount + 1); // +1 for bonus ticket
      expect(players[0].hasBonusTicket).to.be.true;
    });

    it("Should award bonus ticket to first buyer", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();

      await expect(
        raffle.connect(alice).buyTicket(ethAddress, 1, { value: ticketPrice })
      ).to.emit(raffle, "FirstTicketBonusAwarded");

      const [round, players] = await raffle.getRaffleRoundData(ethAddress, 0);
      expect(players[0].hasBonusTicket).to.be.true;
      expect(players[0].ticketsCount).to.equal(2); // 1 purchased + 1 bonus
    });

    it("Should not award bonus ticket to subsequent buyers", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();

      // First buyer gets bonus
      await raffle
        .connect(alice)
        .buyTicket(ethAddress, 1, { value: ticketPrice });

      // Second buyer doesn't get bonus
      await expect(
        raffle.connect(bob).buyTicket(ethAddress, 1, { value: ticketPrice })
      ).to.not.emit(raffle, "FirstTicketBonusAwarded");

      const [round, players] = await raffle.getRaffleRoundData(ethAddress, 0);
      expect(players.length).to.equal(2);
      expect(players[0].hasBonusTicket).to.be.true; // Alice
      expect(players[1].hasBonusTicket).to.be.false; // Bob
    });

    it("Should create new round when previous round is closed", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();

      // Buy ticket in first round
      await raffle
        .connect(alice)
        .buyTicket(ethAddress, 1, { value: ticketPrice });

      // Close the round by advancing time
      await time.increase(900); // Round duration

      // Buy ticket in new round
      await raffle
        .connect(bob)
        .buyTicket(ethAddress, 1, { value: ticketPrice });

      expect(await raffle.getRaffleRoundCount(ethAddress)).to.equal(2);
    });
  });

  describe("Round Management", function () {
    it("Should return correct round count", async function () {
      expect(await raffle.getRaffleRoundCount(ethAddress)).to.equal(0);

      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle
        .connect(alice)
        .buyTicket(ethAddress, 1, { value: ticketPrice });

      expect(await raffle.getRaffleRoundCount(ethAddress)).to.equal(1);
    });

    it("Should return current open round", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle
        .connect(alice)
        .buyTicket(ethAddress, 1, { value: ticketPrice });

      const [hasOpenRound, roundId] = await raffle.getCurrentRaffleRoundId(
        ethAddress
      );
      expect(hasOpenRound).to.be.true;
      expect(roundId).to.equal(0);
    });

    it("Should return no open round when round is closed", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle
        .connect(alice)
        .buyTicket(ethAddress, 1, { value: ticketPrice });

      // Close the round
      await time.increase(900);

      const [hasOpenRound, roundId] = await raffle.getCurrentRaffleRoundId(
        ethAddress
      );
      expect(hasOpenRound).to.be.false;
      expect(roundId).to.equal(0);
    });

    it("Should return last rounds for all tokens", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle
        .connect(alice)
        .buyTicket(ethAddress, 1, { value: ticketPrice });

      const lastRounds = await raffle.getLastRounds(0, 2);
      expect(lastRounds.length).to.equal(2); // ETH and test token

      // Check ETH round
      expect(lastRounds[0].token).to.equal(ethAddress);
      expect(lastRounds[0].status).to.equal(1); // Open
      expect(lastRounds[0].roundId).to.equal(0);

      // Check test token round (should be non-existent)
      expect(lastRounds[1].token).to.equal(testTokenAddress);
      expect(lastRounds[1].status).to.equal(0); // NonExistent
    });
  });

  describe("Automation Integration", function () {
    it("Should return false for checkUpkeep when no active raffle", async function () {
      const [upkeepNeeded] = await raffle.checkUpkeep("0x");
      expect(upkeepNeeded).to.be.false;
    });

    it("Should return true for checkUpkeep when raffle is active and time passed", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle
        .connect(alice)
        .buyTicket(ethAddress, 1, { value: ticketPrice });

      // Advance time past round end
      await time.increase(900);

      const [upkeepNeeded] = await raffle.checkUpkeep("0x");
      expect(upkeepNeeded).to.be.true;
    });

    it("Should revert performUpkeep when not needed", async function () {
      await expect(raffle.performUpkeep("0x")).to.be.revertedWith(
        "Upkeep not needed"
      );
    });

    it("Should successfully perform upkeep when needed", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle
        .connect(alice)
        .buyTicket(ethAddress, 1, { value: ticketPrice });

      // Advance time past round end
      await time.increase(900);

      // Mock VRF request - the requestRandomWords is called internally by performUpkeep
      await expect(raffle.performUpkeep("0x")).to.not.be.reverted;
    });
  });

  describe("VRF Integration", function () {
    it("Should handle VRF callback correctly", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle
        .connect(alice)
        .buyTicket(ethAddress, 1, { value: ticketPrice });
      await raffle
        .connect(bob)
        .buyTicket(ethAddress, 1, { value: ticketPrice });

      // Close round
      await time.increase(900);
      await raffle.performUpkeep("0x");

      // Mock VRF response - we need to manually call fulfillRandomWords
      const randomWord = 12345n;
      await vrfCoordinator.fulfillRandomWordsWithOverride(
        1,
        await raffle.getAddress(),
        [randomWord]
      );

      // Check that round is closed and winner is selected
      const [round] = await raffle.getRaffleRoundData(ethAddress, 0);
      expect(round.status).to.equal(2); // Closed
      expect(round.winnerAddress).to.not.equal(ethers.ZeroAddress);
    });
  });

  describe("Expired Raffle Check", function () {
    it("Should return false when no expired open raffles", async function () {
      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpired).to.be.false;
    });

    it("Should return true when there are expired open raffles", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle
        .connect(alice)
        .buyTicket(ethAddress, 1, { value: ticketPrice });

      // Advance time past round end
      await time.increase(900);

      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpired).to.be.true;
    });

    it("Should return false for closed rounds", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle
        .connect(alice)
        .buyTicket(ethAddress, 1, { value: ticketPrice });

      // Close the round
      await time.increase(900);
      await raffle.performUpkeep("0x");

      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpired).to.be.false;
    });
  });

  describe("Edge Cases", function () {
    it("Should handle multiple players in same round", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();

      await raffle
        .connect(alice)
        .buyTicket(ethAddress, 2, { value: ticketPrice * 2n });
      await raffle
        .connect(bob)
        .buyTicket(ethAddress, 1, { value: ticketPrice });
      await raffle
        .connect(charlie)
        .buyTicket(ethAddress, 3, { value: ticketPrice * 3n });

      const [round, players] = await raffle.getRaffleRoundData(ethAddress, 0);
      expect(players.length).to.equal(3);
      expect(round.tickets.length).to.equal(7); // 2+1+3+1 bonus
    });
  });
});
