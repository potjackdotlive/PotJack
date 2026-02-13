// contracts/Raffle.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/interfaces/AutomationCompatibleInterface.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

/**
 * @title A sample Raffle Contract
 * @notice This contract is for creating a sample raffle contract
 * @dev This implements the Chainlink VRF Version 2 with proper access control
 */
contract Raffle is
    ReentrancyGuard,
    VRFConsumerBaseV2Plus,
    AutomationCompatibleInterface,
    AccessControl
{
    using SafeERC20 for ERC20;

    uint8 private constant USD_DECIMALS = 6;
    uint8 private constant BTC_DECIMALS = 8;

    // Price feed security constants
    uint256 private constant PRICE_FEED_TIMEOUT = 3600; // 1 hour in seconds

    /* Errors */
    error Raffle__TokenNotSupported();
    error Raffle__InvalidPayment();
    error Raffle__InvalidTicketCount();
    error Raffle__InvalidTicketPrice();
    error Raffle__TransferFailed();
    error Raffle__OnlyVRFCoordinator();
    error Raffle__InvalidCaller();
    error Raffle__InvalidPriceData(address feed, int256 price);
    error Raffle__PriceFeedNotSet(address token);
    error Raffle__InsufficientBalance(
        address token,
        uint256 required,
        uint256 available
    );

    enum Status {
        NonExistent, // 0 - Round doesn't exist yet (no tickets bought)
        Open, // 1 - Round is open for tickets buying
        Closed, // 2 - Round closed, waiting for winner ticket generation
        Completed // 3 - Payout completed
    }

    struct TokenRaffle {
        Round[] rounds;
        mapping(uint256 => mapping(address => RoundPlayerData)) roundPlayers;
        mapping(uint256 => RoundPlayers) roundPlayersList;
    }

    struct RoundPlayers {
        address[] players;
        uint256 size;
    }

    struct RoundPlayerData {
        uint40 ticketsCount;
        bool hasBonusTicket;
    }

    struct RoundPlayerDataWithAddress {
        address player;
        uint40 ticketsCount;
        bool hasBonusTicket;
    }

    struct Round {
        Status status;
        uint64 startTime;
        uint64 endTime;
        uint256 poolBalance;
        uint256 commissionBalance;
        Ticket[] tickets;
        address winnerAddress;
        uint256 winnerTicket;
    }

    struct ActiveRound {
        address token;
        uint32 roundId;
        uint64 vrfRequestTime;
    }

    struct VRFContext {
        address token;
        uint32 roundId;
    }

    struct LastRound {
        uint256 poolBalance;
        uint64 endTime;
        uint32 roundId;
        address token;
        Status status;
    }

    struct Ticket {
        uint256 price;
        address payable owner;
        uint64 timestamp;
        bool isBonus;
    }

    // Price validation struct
    struct PriceData {
        uint256 price;
        uint64 timestamp;
        uint80 roundId;
    }

    /* State variables */
    // Day variables
    uint256 constant SECONDS_IN_DAY = 86400;
    uint256 constant NY_OFFSET = 4 * 3600; // UTC−4

    // Chainlink VRF Variables
    uint256 private immutable i_subscriptionId;
    bytes32 private immutable i_gasLane;
    uint32 private immutable i_callbackGasLimit;
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint256 private constant VRF_RETRY_DELAY = 24 hours;

    // Raffle Variables
    uint256 private immutable i_ticketBtcPrice = 0.00005 * (10 ** 8); // 0.00005 BTC (8 decimals)
    uint256 private immutable i_entranceFee;
    address private immutable i_beneficiaryAddress;

    // Token management
    mapping(address => bool) public isSupportedTokenMapping;
    address[] public supportedTokens;
    uint256 public supportedTokenCount;

    ActiveRound[] public activeRounds;
    mapping(uint256 => VRFContext) public vrfRequestToRoundContext;

    // Price feed mappings
    AggregatorV3Interface private _btcToNativePriceFeed;
    AggregatorV3Interface private _nativeToUsdPriceFeed;
    AggregatorV3Interface private _btcToUsdPriceFeed;
    AggregatorV3Interface private _ethToUsdPriceFeed;
    mapping(address => AggregatorV3Interface) private _priceFeeds;
    //address private constant BTC_IDENTIFIER = address(0xDEADBEEF);
    address private constant NATIVE_IDENTIFIER = address(0);

    mapping(address => TokenRaffle) private _raffles; // token => it's raffle

    /* Events */
    event TicketPurchased(
        address indexed token,
        uint32 indexed roundId,
        address indexed buyer,
        uint40 count,
        uint256 totalAmount,
        uint256 timestamp
    );
    event FirstTicketBonusAwarded(
        address indexed token,
        uint32 indexed roundId,
        address indexed buyer,
        uint256 timestamp,
        uint256 roundStartTime,
        uint256 roundEndTime
    );
    event WinnerPicked(
        address indexed token,
        uint32 indexed roundId,
        uint256 timestamp
    );
    event StatusChanged(
        address indexed token,
        uint32 indexed roundId,
        Status oldStatus,
        Status newStatus,
        address indexed caller,
        uint256 timestamp
    );

    /* Functions */
    constructor(
        uint256 subscriptionId,
        bytes32 gasLane, // keyHash
        uint256 entranceFee,
        uint32 callbackGasLimit,
        address vrfCoordinatorV2,
        address beneficiaryAddress,
        address btcToUsdPriceFeed,
        address nativeToUsdPriceFeed,
        address btcToNativePriceFeed,
        address[] memory tokenAddresses,
        address[] memory tokenPriceFeeds
    ) VRFConsumerBaseV2Plus(vrfCoordinatorV2) {
        require(
            tokenAddresses.length == tokenPriceFeeds.length,
            "Arrays length mismatch"
        );

        i_gasLane = gasLane;
        i_subscriptionId = subscriptionId;
        i_entranceFee = entranceFee;
        i_callbackGasLimit = callbackGasLimit;
        i_beneficiaryAddress = beneficiaryAddress;

        // Set BTC/USD price feed if provided
        if (btcToUsdPriceFeed != NATIVE_IDENTIFIER) {
            _btcToUsdPriceFeed = AggregatorV3Interface(btcToUsdPriceFeed);
        }

        // Set native/USD price feed if provided (native could be ETH, AVAX, BNB, ...)
        if (nativeToUsdPriceFeed != NATIVE_IDENTIFIER) {
            _nativeToUsdPriceFeed = AggregatorV3Interface(nativeToUsdPriceFeed);
            _addSupportedToken(NATIVE_IDENTIFIER);
        }

        // Set BTC/native price feed if provided (native could be ETH, AVAX, BNB, ...)
        if (btcToNativePriceFeed != NATIVE_IDENTIFIER) {
            _btcToNativePriceFeed = AggregatorV3Interface(btcToNativePriceFeed);
            _addSupportedToken(NATIVE_IDENTIFIER);
        }

        // Set ERC20 token price feeds
        for (uint256 i = 0; i < tokenAddresses.length; ) {
            address tokenAddr = tokenAddresses[i];
            address feedAddr = tokenPriceFeeds[i];

            require(tokenAddr != NATIVE_IDENTIFIER, "Invalid token address");
            require(feedAddr != NATIVE_IDENTIFIER, "Invalid price feed");

            _priceFeeds[tokenAddr] = AggregatorV3Interface(feedAddr);
            _addSupportedToken(tokenAddr);

            unchecked {
                ++i;
            }
        }
    }

    /**
     * @notice Add a token to supported tokens list
     * @dev Internal function to maintain both mapping and array
     * @param token The token address to add
     */
    function _addSupportedToken(address token) private {
        if (!isSupportedTokenMapping[token]) {
            isSupportedTokenMapping[token] = true;
            supportedTokens.push(token);
            supportedTokenCount++;
        }
    }

    /**
     * @notice Get validated price data from Chainlink feed with staleness and deviation checks
     * @dev Implements comprehensive price validation including staleness and circuit breakers
     * @param feed The Chainlink price feed to query
     * @return priceData Validated price data struct
     * Documentation: https://docs.chain.link/data-feeds/price-feeds/api-reference
     */
    function _getValidatedPriceData(
        AggregatorV3Interface feed
    ) private view returns (PriceData memory priceData) {
        require(address(feed) != address(0), "Price feed not set");

        try feed.latestRoundData() returns (
            uint80 roundId,
            int256 answer,
            uint256 /** startedAt */,
            uint256 updatedAt,
            uint80 answeredInRound
        ) {
            // Validate price data
            if (answer <= 0) {
                revert Raffle__InvalidPriceData(address(feed), answer);
            }

            // Check round data consistency
            require(
                roundId > 0 && answeredInRound >= roundId,
                "Invalid round data"
            );

            uint256 currentPrice = uint256(answer);

            return
                PriceData({
                    price: currentPrice,
                    timestamp: uint64(updatedAt),
                    roundId: roundId
                });
        } catch Error(string memory reason) {
            revert(string(abi.encodePacked("Price feed error: ", reason)));
        } catch {
            revert("Price feed call failed");
        }
    }

    /**
     * @notice Modifier to prevent contract calls
     * @dev Prevents contract calls to the raffle contract
     */
    modifier nonContract() {
        if (isContract(msg.sender)) {
            revert Raffle__InvalidCaller();
        }
        _;
    }

    /**
     * @notice Check if an address is a contract
     * @param addr The address to check
     * @return Boolean indicating if the address is a contract
     */
    function isContract(address addr) private view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(addr)
        }
        return size > 0;
    }

    /**
     * @notice Allows users to purchase tickets with ERC20 tokens
     * @dev Enhanced with price feed validation and security checks
     * @param token The address of the ERC20 token to pay with
     * @param count The number of tickets to purchase
     * @custom:thows Raffle__InvalidTicketPrice if ticket price equils 0
     */
    function buyTicket(
        address token,
        uint40 count,
        uint256 maxCost
    ) external payable nonReentrant nonContract {
        if (!isSupportedTokenMapping[token]) {
            revert Raffle__TokenNotSupported();
        }

        if (token == NATIVE_IDENTIFIER && msg.value == 0) {
            revert Raffle__InvalidPayment();
        }

        if (count == 0) {
            revert Raffle__InvalidTicketCount();
        }

        uint256 costPerTicket = token == NATIVE_IDENTIFIER
            ? getTicketPriceInNative()
            : getTicketPriceForToken(token);

        if (costPerTicket == 0) {
            revert Raffle__InvalidTicketPrice();
        }

        uint256 cost;
        unchecked {
            cost = costPerTicket * count; // Safe: count is limited and costPerTicket is validated
        }

        require(cost <= maxCost, "Insufficient slippage");

        if (token == NATIVE_IDENTIFIER) {
            require(msg.value >= cost, "Insufficient funds");
            cost = msg.value;
        } else {
            ERC20 _token = ERC20(token);

            require(
                _token.allowance(msg.sender, address(this)) >= cost,
                "Insufficient allowance"
            );
            require(
                _token.balanceOf(msg.sender) >= cost,
                "Insufficient funds"
            );
        }

        (bool hasOpenRound, uint32 roundId) = getCurrentRaffleRoundId(token);
        TokenRaffle storage _tokenRaffle = _raffles[token];
        Round storage round;

        if (!hasOpenRound) {
            _tokenRaffle.rounds.push();
            roundId = uint32(_raffles[token].rounds.length - 1);

            round = _tokenRaffle.rounds[roundId];
            round.startTime = uint64(block.timestamp);
            round.endTime = getTemporaryCloseTime();

            changeRoundStatus(token, roundId, round, Status.Open);
            activeRounds.push(ActiveRound(token, roundId, 0));
        } else {
            round = _tokenRaffle.rounds[roundId];
            
            // Ensure round is still open and not expired
            require(round.status == Status.Open, "Round is not open");
            require(round.endTime > block.timestamp, "Round has expired");
        }

        RoundPlayerData storage playerData = _tokenRaffle.roundPlayers[roundId][
            msg.sender
        ];

        if (playerData.ticketsCount == 0) {
            RoundPlayers storage roundPlayers = _tokenRaffle.roundPlayersList[roundId];
            roundPlayers.players.push(msg.sender);
            roundPlayers.size += 1;
        }

        uint256 commission;
        unchecked {
            commission = (cost * i_entranceFee) / 100;
        }

        round.commissionBalance += commission;
        unchecked {
            round.poolBalance += (cost - commission);
        }

        bool isFirstBuyer = round.tickets.length == 0;

        for (uint32 i = 0; i < count; ) {
            round.tickets.push(
                Ticket({
                    owner: payable(msg.sender),
                    price: costPerTicket,
                    timestamp: uint64(block.timestamp),
                    isBonus: false
                })
            );
            unchecked {
                ++i;
            }
        }

        playerData.ticketsCount += count;

        if (token != NATIVE_IDENTIFIER) {
            ERC20(token).safeTransferFrom(msg.sender, address(this), cost);
        }

        if (isFirstBuyer) {
            round.tickets.push(
                Ticket({
                    owner: payable(msg.sender),
                    price: 0,
                    timestamp: uint64(block.timestamp),
                    isBonus: true
                })
            );

            playerData.hasBonusTicket = true;
            playerData.ticketsCount++;

            emit FirstTicketBonusAwarded(
                token,
                roundId,
                msg.sender,
                block.timestamp,
                round.startTime,
                round.endTime
            );
        }

        emit TicketPurchased(
            token,
            roundId,
            msg.sender,
            count,
            cost,
            block.timestamp
        );
    }

    /**
     * @notice Change the status of a round
     * @param token The token address
     * @param roundId The round ID to change status for
     * @param newStatus The new status to set
     */
    function changeRoundStatus(
        address token,
        uint32 roundId,
        Round storage round,
        Status newStatus
    ) private {
        require(isSupportedToken(token), "Token not supported");
        Status oldStatus = round.status;

        // Validate status transition
        require(
            newStatus != Status.NonExistent,
            "Cannot set status to NonExistent"
        );

        // Additional validation for status transitions
        if (oldStatus == Status.Completed) {
            revert("Cannot change status of completed round");
        }

        // Update the status
        round.status = newStatus;

        // Emit the status change event
        emit StatusChanged(
            token,
            roundId,
            oldStatus,
            newStatus,
            msg.sender,
            block.timestamp
        );
    }

    /**
     * @notice Chainlink Automation upkeep check
     * @dev Can be called by anyone but performUpkeep is protected
     */
    function checkUpkeep(
        bytes memory /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        uint256 length = activeRounds.length;
        for (uint256 i = 0; i < length; ) {
            ActiveRound storage activeRound = activeRounds[i];
            TokenRaffle storage tokenRaffle = _raffles[activeRound.token];
            Round storage round = tokenRaffle.rounds[activeRound.roundId];

            // CASE A: round is Open and expired -> Close + VRF Request
            if (round.status == Status.Open && round.endTime < block.timestamp) {
                // action = 0 => CloseAndRequest
                performData = abi.encode(uint8(0), i);
                return (true, performData);
            }

            // CASE B: round is Closed and timeout passed -> Retry VRF request
            if (round.status == Status.Closed && block.timestamp >= activeRound.vrfRequestTime + VRF_RETRY_DELAY) {
                // action = 1 => RetryRequest
                performData = abi.encode(uint8(1), i);
                return (true, performData);
            }
            unchecked {
                ++i;
            }
        }
        return (false, "");
    }

    /**
     * @notice Chainlink Automation upkeep execution
     * Documentation: https://docs.chain.link/chainlink-automation
     */
    function performUpkeep(
        bytes calldata performData
    ) external override nonReentrant {
        (uint8 action, uint256 idx) = abi.decode(performData, (uint8, uint256));

        ActiveRound storage activeRound = activeRounds[idx];
        uint32 roundId = activeRound.roundId;
        address token = activeRound.token;

        TokenRaffle storage tokenRaffle = _raffles[token];
        Round storage round = tokenRaffle.rounds[roundId];

        if (action == 0) {
            require(round.status == Status.Open && round.endTime < block.timestamp, "Not expired");
            changeRoundStatus(token, roundId, round, Status.Closed);
        } else {
            require(round.status == Status.Closed, "Not closed");
            require(block.timestamp >= activeRound.vrfRequestTime + VRF_RETRY_DELAY, "Too soon to retry");
        }

        // Will revert if subscription is not set and funded.
        uint256 requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: i_gasLane,
                subId: i_subscriptionId,
                requestConfirmations: REQUEST_CONFIRMATIONS,
                callbackGasLimit: i_callbackGasLimit,
                numWords: 1,
                extraArgs: VRFV2PlusClient._argsToBytes(
                    // Set nativePayment to true to pay for requests with ETH instead of LINK
                    VRFV2PlusClient.ExtraArgsV1({nativePayment: false})
                )
            })
        );

        activeRound.vrfRequestTime = uint64(block.timestamp);

        vrfRequestToRoundContext[requestId] = VRFContext(token, roundId);
    }

    /**
     * @notice VRF callback function - called by Chainlink VRF
     * @dev This function has built-in access control via VRFConsumerBaseV2Plus
     * @param randomWords Array of random words from Chainlink VRF
     * Documentation: https://docs.chain.link/vrf
     */
    function fulfillRandomWords(
        uint256 requestId,
        uint256[] calldata randomWords
    ) internal override {
        VRFContext storage context = vrfRequestToRoundContext[requestId];
        address token = context.token;
        uint32 roundId = context.roundId;

        TokenRaffle storage tokenRaffle = _raffles[token];
        Round storage round = tokenRaffle.rounds[roundId];

        closeRound(token, roundId, round, randomWords[0]);

        delete vrfRequestToRoundContext[requestId];

        uint256 length = activeRounds.length;
        for (uint256 i = 0; i < length;) {
            if (activeRounds[i].token == token && activeRounds[i].roundId == roundId) {
                uint256 last = length - 1;
                if (i != last) {
                    activeRounds[i] = activeRounds[last];
                }
                activeRounds.pop();
                break;
            }
            unchecked {
                ++i;
            }
        }
    }

    /**
     * @notice Close a round and distribute winnings
     * @dev Enhanced with proper CEI pattern and comprehensive error handling
     * @param token The token address
     * @param randomWord The random word from Chainlink VRF
     * Documentation: https://docs.openzeppelin.com/contracts/4.x/api/security#ReentrancyGuard
     */
    function closeRound(address token, uint32 roundId, Round storage round, uint256 randomWord) internal {
        uint256 ticketsLength = round.tickets.length;
        if (ticketsLength == 0) return;

        //GAS OPTIMIZATION: Use unchecked for safe math operations
        uint256 indexOfWinner;
        unchecked {
            indexOfWinner = randomWord % ticketsLength; // Safe: ticketsLength > 0
        }

        // GAS OPTIMIZATION: Cache winner data to avoid multiple storage reads
        address payable recentWinner = round.tickets[indexOfWinner].owner;
        
        // GAS OPTIMIZATION: Cache amounts
        uint256 prizeAmount = round.poolBalance;
        uint256 commissionAmount = round.commissionBalance;
        uint256 totalRequired;

        //GAS OPTIMIZATION: Use unchecked for safe math operations
        unchecked {
            totalRequired = prizeAmount + commissionAmount; // Safe: both are positive
        }

        round.winnerTicket = indexOfWinner;
        round.winnerAddress = recentWinner;

        emit WinnerPicked(
            token,
            roundId,
            block.timestamp
        );

        if (token == NATIVE_IDENTIFIER) {
            _safeTransferETH(recentWinner, prizeAmount);
            _safeTransferETH(payable(i_beneficiaryAddress), commissionAmount);
        } else {
            ERC20 _token = ERC20(token);
            uint256 contractBalance = _token.balanceOf(address(this));
            
            if (contractBalance < totalRequired) {
                revert Raffle__InsufficientBalance(
                    token,
                    totalRequired,
                    contractBalance
                );
            }

            _token.safeTransfer(recentWinner, prizeAmount);
            _token.safeTransfer(i_beneficiaryAddress, commissionAmount);
        }
        
        changeRoundStatus(token, roundId, round, Status.Completed);
    }

    /**
     * @notice Safe ETH transfer with proper error handling
     * @dev Uses call instead of transfer to avoid gas limit issues
     * @param to The recipient address
     * @param amount The amount to transfer
     * Documentation: https://consensys.net/diligence/mainnet/2019/09/stop-using-soliditys-transfer-now/
     */
    function _safeTransferETH(address payable to, uint256 amount) private {
        if (amount == 0) return;

        require(address(this).balance >= amount, "Insufficient ETH balance");
        require(to != address(0), "Cannot transfer to zero address");

        (bool success, ) = to.call{value: amount}("");
        if (!success) {
            revert Raffle__TransferFailed();
        }
    }

    /**
     * Getter Functions
     */

    /**
     * @notice Gets the total number of rounds for a specific token
     * @dev Returns 0 if no rounds exist for the token
     * @param token The address of the token to check
     * @return The total number of rounds that have been created for the token
     */
    function getRaffleRoundCount(address token) public view returns (uint256) {
        require(isSupportedToken(token), "Token not supported");
        return _raffles[token].rounds.length;
    }

    /**
     * @notice Gets the current open round ID for a specific token
     * @dev Returns (false, 0) if there is no open round for the token
     * @param token The address of the token to check
     * @return hasOpenRound Boolean indicating if there is an open round
     * @return roundId The current round ID if there is an open round
     */
    function getCurrentRaffleRoundId(
        address token
    ) public view returns (bool hasOpenRound, uint32 roundId) {
        require(isSupportedToken(token), "Token not supported");
        
        TokenRaffle storage tl = _raffles[token];
        uint32 len = uint32(tl.rounds.length);
        if (len == 0) {
            return (false, 0);
        }
        Round storage r = tl.rounds[len - 1];
        
        // Check if round is open and not expired
        if (r.status != Status.Open || r.endTime < block.timestamp) {
            return (false, 0);
        }
        
        return (true, len - 1);
    }

    /**
     * @notice Gets the data for a specific round of a given token
     * @dev Returns default values if the round does not exist
     * @param token The address of the token for the round
     * @param roundId The ID of the roun d to retrieve data for
     * @return round Current round data
     * @return players Array of player data for the round, including address, tickets count, and bonus ticket status
     * @custom:throws "Round does not exist" if the roundId is invalid
     */
    function getRaffleRoundData(
        address token,
        uint32 roundId
    )
        external
        view
        returns (
            Round memory round,
            RoundPlayerDataWithAddress[] memory players
        )
    {
        require(isSupportedToken(token), "Token not supported");
        
        TokenRaffle storage tl = _raffles[token];
        require(roundId < tl.rounds.length, "Round does not exist");

        round = tl.rounds[roundId];
        players = new RoundPlayerDataWithAddress[](
            tl.roundPlayersList[roundId].size
        );

        for (uint256 i = 0; i < tl.roundPlayersList[roundId].size; i++) {
            address playerAddress = tl.roundPlayersList[roundId].players[i];
            RoundPlayerData memory playerData = tl.roundPlayers[roundId][
                playerAddress
            ];
            players[i] = RoundPlayerDataWithAddress({
                player: playerAddress,
                ticketsCount: playerData.ticketsCount,
                hasBonusTicket: playerData.hasBonusTicket
            });
        }

        return (round, players);
    }

    /**
     * @notice Gets the last rounds for all supported tokens
     * @dev Returns an array of ActiveRound structs containing the status, end time, pool balance, round ID, and token address
     * @param offset The starting index for the rounds to retrieve
     * @param limit The number of rounds to retrieve
     * @return An array of ActiveRound structs for the last rounds of each supported token
     */
    function getLastRounds(
        uint offset,
        uint limit
    ) external view returns (LastRound[] memory) {
        require(offset + limit <= supportedTokenCount, "Index out of bounds");

        LastRound[] memory lastRounds = new LastRound[](limit);

        for (uint256 i = 0; i < limit; ) {
            uint256 tokenIndex = offset + i;
            address token = supportedTokens[tokenIndex];
            TokenRaffle storage tl = _raffles[token];

            if (tl.rounds.length == 0) {
                lastRounds[i] = LastRound({
                    status: Status.NonExistent,
                    endTime: 0,
                    poolBalance: 0,
                    roundId: 0,
                    token: token
                });
            } else {
                uint32 lastRoundIndex;
                unchecked {
                    lastRoundIndex = uint32(tl.rounds.length - 1); // Safe: length > 0
                }

                Round storage lastRound = tl.rounds[lastRoundIndex];
                lastRounds[i] = LastRound({
                    status: lastRound.status,
                    endTime: lastRound.endTime,
                    poolBalance: lastRound.poolBalance,
                    roundId: lastRoundIndex,
                    token: token
                });
            }

            unchecked {
                ++i;
            }
        }
        return lastRounds;
    }

    /**
     * @notice Get the next NY anchor time
     * @dev Returns the next NY anchor time
     * @return nextNYAnchorTime The next NY anchor time
     */
    function getNextNYAnchorTime() internal view returns (uint256) {
        uint256 currentTimestamp = block.timestamp;

        uint256 nyTime = currentTimestamp - NY_OFFSET;
        uint256 nySecondsInDay = uint256(nyTime % SECONDS_IN_DAY);
        uint256 nyTodayAnchorTime = uint256(nyTime - nySecondsInDay);

        // Add 12 hours to get to noon
        nyTodayAnchorTime += 12 * 3600;

        // If we're past noon, add another 12 hours to get to midnight
        if (nyTime >= nyTodayAnchorTime) {
            nyTodayAnchorTime += 12 * 3600;
        }

        return nyTodayAnchorTime + NY_OFFSET;
    }

    /**
     * @notice Get the temporary close time
     * @dev Returns the temporary close time (15 minutes from now)
     * @return temporaryCloseTime The temporary close time
     */
    function getTemporaryCloseTime() internal view returns (uint64) {
        uint64 currentTimestamp = uint64(block.timestamp);
        uint64 roundActiveTime = currentTimestamp % 900; // 900 seconds = 15 minutes
        return currentTimestamp - roundActiveTime + 900;
    }

    /**
     * Price Functions
     */

    /**
     * @notice Get ticket price in BTC
     * @dev Returns the ticket price in BTC
     * @return price The ticket price in BTC
     */
    function getTicketPriceInBtc() public pure returns (uint256 price) {
        return (i_ticketBtcPrice);
    }

    /**
     * @notice Get ticket price in USD with validation
     * @return price Validated ticket price in USD
     */
    function getTicketPriceInUsd() public view returns (uint256 price) {
        // Use a special identifier for BTC/USD price feed since it's not a token
        PriceData memory btcPrice = _getValidatedPriceData(_btcToUsdPriceFeed);
        uint8 btcDecimals = _btcToUsdPriceFeed.decimals();

        return ((i_ticketBtcPrice * btcPrice.price) /
            10 ** (BTC_DECIMALS - USD_DECIMALS + btcDecimals));
    }

    /**
     * @notice Get ticket price in the network native token (e.g. ETH, AVAX, BNB)
     * @dev Two strategies:
     *   1) If native/USD feed is available: price_native = price_usd / native_usd
     *   2) Else if direct BTC->native feed is available: price_native = i_ticketBtcPrice * btcToNativePrice
     * Returns value scaled to native token decimals (assumed 18 for native EVM tokens)
     */
    function getTicketPriceInNative() public view returns (uint256 price) {
        uint8 nativeDecimals = 18;

        // 1) If native/USD feed exists
        if (address(_nativeToUsdPriceFeed) != address(0)) {
            uint256 priceInUsd = getTicketPriceInUsd(); // scaled by 10**USD_DECIMALS
            
            PriceData memory priceData = _getValidatedPriceData(_nativeToUsdPriceFeed);
            uint8 feedDecimals = _nativeToUsdPriceFeed.decimals();

            return
                (priceInUsd *
                    (10 ** (uint256(nativeDecimals) + uint256(feedDecimals) - USD_DECIMALS))) /
                priceData.price;
        }

        // 2) If BTC/native feed exists
        if (address(_btcToNativePriceFeed) != address(0)) {
            PriceData memory priceData = _getValidatedPriceData(_btcToNativePriceFeed);
            uint8 feedDecimals = _btcToNativePriceFeed.decimals();

            uint256 rawPrice = (i_ticketBtcPrice * priceData.price) / (10 ** BTC_DECIMALS);

            // Adjust to nativeDecimals (18): if feedDecimals < nativeDecimals -> multiply; else divide
            if (feedDecimals < nativeDecimals) {
                return rawPrice * (10 ** (uint256(nativeDecimals) - uint256(feedDecimals)));
            } else if (feedDecimals > nativeDecimals) {
                return rawPrice / (10 ** (uint256(feedDecimals) - uint256(nativeDecimals)));
            } else {
                return rawPrice; // same decimals
            }
        }

        revert("native/USD or BTC/native price feeds not set");
    }

    /**
     * @notice Get ticket price for a specific token with validation
     * @param token The token address to get price for
     * @return price Validated ticket price in token units
     */
    function getTicketPriceForToken(
        address token
    ) public view returns (uint256 price) {
        require(
            address(token) != NATIVE_IDENTIFIER,
            "Use getTicketPriceInNative for native token"
        );

        if (address(_priceFeeds[token]) == address(0)) {
            revert Raffle__PriceFeedNotSet(token);
        }

        PriceData memory tokenPrice = _getValidatedPriceData(
            _priceFeeds[token]
        );

        ERC20 _token = ERC20(token);

        uint8 feedDecimals = _priceFeeds[token].decimals();
        uint8 tokenDecimals = _token.decimals();
        uint256 priceInUsd = getTicketPriceInUsd();

        return (
            ((priceInUsd *
                (10 ** (tokenDecimals + feedDecimals - USD_DECIMALS))) /
                tokenPrice.price)
        );
    }

    function getRoundResult(
        address token,
        uint32 roundId
    ) external view returns (
        address winnerAddress,
        uint256 winnerTicket,
        address[] memory roundPlayers,
        uint256 prizeAmount
    )
    {
        Round storage round = _raffles[token].rounds[roundId];
        return (
            round.winnerAddress,
            round.winnerTicket,
            _raffles[token].roundPlayersList[roundId].players,
            round.poolBalance
        );
    }

    /**
     * @notice Get all supported tokens
     * @return Array of supported token addresses
     */
    function getSupportedTokens() public view returns (address[] memory) {
        return supportedTokens;
    }

    /**
     * @notice Check if a token is supported
     * @param token The token address to check
     * @return Boolean indicating if the token is supported
     */
    function isSupportedToken(address token) public view returns (bool) {
        return isSupportedTokenMapping[token];
    }
}