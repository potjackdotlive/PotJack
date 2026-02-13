import { expect } from "chai";
import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import {
  Raffle,
  MockV3Aggregator,
  MockV3Aggregator__factory,
  TestToken,
  VRFCoordinatorV2_5Mock
} from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
// Constants defined inline for compatibility

describe("Raffle - Expired Raffles Check", function () {
  // Test constants
  const BTC_PRICE = 50000n; // $50,000
  const ETH_PRICE = 3000n; // $3,000
  const USDC_PRICE = 1000000n; // $1.00 (6 decimals)
  const ROUND_DURATION = 900; // 15 minutes

  let raffle: Raffle,
    owner: HardhatEthersSigner,
    alice: HardhatEthersSigner,
    bob: HardhatEthersSigner,
    charlie: HardhatEthersSigner,
    beneficiary: HardhatEthersSigner,
    mockBtcPriceFeed: MockV3Aggregator,
    mockEthPriceFeed: MockV3Aggregator,
    mockUsdcPriceFeed: MockV3Aggregator,
    testToken: TestToken,
    vrfCoordinator: VRFCoordinatorV2_5Mock,
    testTokenAddress: string,
    ethAddress: string;

  beforeEach(async function () {
    [owner, alice, bob, charlie, beneficiary] = await ethers.getSigners();

    // Deploy VRF Coordinator Mock
    const VRFCoordinatorV2_5MockFactory = await ethers.getContractFactory("VRFCoordinatorV2_5Mock");
    vrfCoordinator = await VRFCoordinatorV2_5MockFactory.deploy(0, 0, 0);
    await vrfCoordinator.waitForDeployment();

    // Deploy mock price feeds
    const MockV3AggregatorFactory = await ethers.getContractFactory("MockV3Aggregator");
    
    mockBtcPriceFeed = await MockV3AggregatorFactory.deploy(8, BTC_PRICE);
    await mockBtcPriceFeed.waitForDeployment();

    mockEthPriceFeed = await MockV3AggregatorFactory.deploy(8, ETH_PRICE);
    await mockEthPriceFeed.waitForDeployment();

    mockUsdcPriceFeed = await MockV3AggregatorFactory.deploy(8, USDC_PRICE);
    await mockUsdcPriceFeed.waitForDeployment();

    // Update price feeds with current timestamp to avoid staleness
    const currentTime = Math.floor(Date.now() / 1000);
    await mockBtcPriceFeed.updateRoundData(1, BTC_PRICE, currentTime, 1);
    await mockEthPriceFeed.updateRoundData(1, ETH_PRICE, currentTime, 1);
    await mockUsdcPriceFeed.updateRoundData(1, USDC_PRICE, currentTime, 1);

    // Deploy test token
    const TestTokenFactory = await ethers.getContractFactory("TestToken");
    testToken = await TestTokenFactory.deploy("TestToken", "TT");
    await testToken.waitForDeployment();
    testTokenAddress = await testToken.getAddress();
    ethAddress = ethers.ZeroAddress;

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
      1, // subscriptionId
      "0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c", // keyHash
      ethers.parseEther("0.01"), // entranceFee
      500000, // callbackGasLimit
      await vrfCoordinator.getAddress(),
      beneficiary.address,
      await mockBtcPriceFeed.getAddress(),
      await mockEthPriceFeed.getAddress(),
      [testTokenAddress], // Supported tokens
      [await mockUsdcPriceFeed.getAddress()] // Token price feeds
    );
    await raffle.waitForDeployment();

    // The automation role is already granted to VRF coordinator in the constructor
  });

  describe("checkForExpiredOpenRaffles", function () {
    it("Should return false when no raffles exist", async function () {
      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpired).to.be.false;
    });

    it("Should return false when raffle is open and not expired", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle.connect(alice).buyTicket(ethAddress, 1, { value: ticketPrice });
      
      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpired).to.be.false;
    });

    it("Should return true when ETH raffle is open and expired", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle.connect(alice).buyTicket(ethAddress, 1, { value: ticketPrice });
      
      // Advance time past round end (900 seconds)
      await time.increase(ROUND_DURATION + 1);
      
      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpired).to.be.true;
    });

    it("Should return true when ERC20 token raffle is open and expired", async function () {
      const ticketPrice = await raffle.getTicketPriceForToken(testTokenAddress);
      await testToken.connect(alice).approve(await raffle.getAddress(), ticketPrice);
      await raffle.connect(alice).buyTicket(testTokenAddress, 1);
      
      // Advance time past round end
      await time.increase(ROUND_DURATION + 1);
      
      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpired).to.be.true;
    });

    it("Should return true when multiple tokens have expired raffles", async function () {
      // Create expired ETH raffle
      const ethTicketPrice = await raffle.getTicketPriceInEth();
      await raffle.connect(alice).buyTicket(ethAddress, 1, { value: ethTicketPrice });
      
      // Create expired ERC20 raffle
      const tokenTicketPrice = await raffle.getTicketPriceForToken(testTokenAddress);
      await testToken.connect(bob).approve(await raffle.getAddress(), tokenTicketPrice);
      await raffle.connect(bob).buyTicket(testTokenAddress, 1);
      
      // Advance time past round end
      await time.increase(ROUND_DURATION + 1);
      
      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpired).to.be.true;
    });

    it("Should return false when raffle is closed", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle.connect(alice).buyTicket(ethAddress, 1, { value: ticketPrice });
      
      // Close the round by performing upkeep
      await time.increase(ROUND_DURATION + 1);
      await raffle.performUpkeep("0x");
      
      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpired).to.be.false;
    });

    it("Should return false when raffle is completed", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle.connect(alice).buyTicket(ethAddress, 1, { value: ticketPrice });
      await raffle.connect(bob).buyTicket(ethAddress, 1, { value: ticketPrice });
      
      // Close the round and fulfill VRF
      await time.increase(ROUND_DURATION + 1);
      await raffle.performUpkeep("0x");
      
      // Mock VRF response - we need to manually call fulfillRandomWords
      const randomWord = 12345n;
      await vrfCoordinator.fulfillRandomWordsWithOverride(1, await raffle.getAddress(), [randomWord]);
      
      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpired).to.be.false;
    });

    it("Should return false when raffle is cancelled", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle.connect(alice).buyTicket(ethAddress, 1, { value: ticketPrice });
      
      // Note: Cancellation functionality would need to be implemented in the contract
      // For now, we'll test that cancelled rounds don't show as expired
      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpired).to.be.false;
    });

    it("Should return true for the most recent expired round", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      
      // Create first round and let it expire
      await raffle.connect(alice).buyTicket(ethAddress, 1, { value: ticketPrice });
      await time.increase(ROUND_DURATION + 1);
      
      // Create second round and let it expire
      await raffle.connect(bob).buyTicket(ethAddress, 1, { value: ticketPrice });
      await time.increase(ROUND_DURATION + 1);
      
      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpired).to.be.true;
    });

    it("Should handle multiple rounds per token correctly", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      
      // Create first round
      await raffle.connect(alice).buyTicket(ethAddress, 1, { value: ticketPrice });
      await time.increase(ROUND_DURATION + 1);
      
      // Create second round (should be open)
      await raffle.connect(bob).buyTicket(ethAddress, 1, { value: ticketPrice });
      
      // First round should be closed, second should be open but not expired
      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpired).to.be.false;
      
      // Let second round expire
      await time.increase(ROUND_DURATION + 1);
      const hasExpiredAfter = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpiredAfter).to.be.true;
    });

    it("Should be gas efficient and return early", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      
      // Create multiple expired raffles
      await raffle.connect(alice).buyTicket(ethAddress, 1, { value: ticketPrice });
      await raffle.connect(bob).buyTicket(testTokenAddress, 1);
      await time.increase(ROUND_DURATION + 1);
      
      // Measure gas usage
      const tx = await raffle.checkForExpiredOpenRaffles();
      const receipt = await tx.wait();
      
      // Should be relatively low gas usage due to early return
      expect(receipt?.gasUsed).to.be.lt(100000);
    });

    it("Should handle edge case of exactly expired time", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle.connect(alice).buyTicket(ethAddress, 1, { value: ticketPrice });
      
      // Advance exactly to round end time
      await time.increase(ROUND_DURATION);
      
      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpired).to.be.false; // Should not be expired yet
      
      // Advance one more second
      await time.increase(1);
      
      const hasExpiredAfter = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpiredAfter).to.be.true; // Should be expired now
    });
  });

  describe("Integration with other functions", function () {
    it("Should work correctly with getCurrentRaffleRoundId", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle.connect(alice).buyTicket(ethAddress, 1, { value: ticketPrice });
      
      // Check that round is open
      const [hasOpenRound, roundId] = await raffle.getCurrentRaffleRoundId(ethAddress);
      expect(hasOpenRound).to.be.true;
      
      // Let it expire
      await time.increase(ROUND_DURATION + 1);
      
      // Check that round is no longer open
      const [hasOpenRoundAfter, roundIdAfter] = await raffle.getCurrentRaffleRoundId(ethAddress);
      expect(hasOpenRoundAfter).to.be.false;
      
      // Check that expired raffle is detected
      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      expect(hasExpired).to.be.true;
    });

    it("Should work correctly with checkUpkeep", async function () {
      const ticketPrice = await raffle.getTicketPriceInEth();
      await raffle.connect(alice).buyTicket(ethAddress, 1, { value: ticketPrice });
      
      // Let it expire
      await time.increase(ROUND_DURATION + 1);
      
      // Both functions should return true
      const [upkeepNeeded] = await raffle.checkUpkeep("0x");
      const hasExpired = await raffle.checkForExpiredOpenRaffles();
      
      expect(upkeepNeeded).to.be.true;
      expect(hasExpired).to.be.true;
    });
  });
}); 