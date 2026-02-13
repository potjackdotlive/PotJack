# WebSocket Connection Monitoring

## Overview

The WebSocket connection monitoring system provides automatic health checking of blockchain connections and automatic reconnection when connections are lost.

## Functionality

### 1. Automatic Connection Health Checking
- **Check interval**: 30 seconds (configurable)
- **Check method**: Getting the latest block number
- **Logging**: All events are logged

### 2. Automatic Reconnection
- **Maximum reconnection attempts**: 5 (configurable)
- **Delay between attempts**: Exponential (5 seconds * attempt number)
- **Resource cleanup**: Automatic removal of old connections and listeners

### 3. WebSocket Event Handling
- **Connection opening**: Logging and resetting attempt counter
- **Connection closing**: Logging with code and reason
- **Connection errors**: Logging and marking as inactive

## GraphQL API

### Connection Status Query

```graphql
query {
  blockchainConnectionStatus {
    connections {
      blockchainName
      isConnected
      reconnectAttempts
    }
    totalConnections
    healthyConnections
  }
}
```

**Response:**
```json
{
  "data": {
    "blockchainConnectionStatus": {
      "connections": [
        {
          "blockchainName": "ethereum",
          "isConnected": true,
          "reconnectAttempts": 0
        },
        {
          "blockchainName": "arbitrum",
          "isConnected": false,
          "reconnectAttempts": 2
        }
      ],
      "totalConnections": 2,
      "healthyConnections": 1
    }
  }
}
```

### Force Reconnection

```graphql
mutation {
  forceReconnectBlockchain(blockchainName: "ethereum")
}
```

**Response:**
```json
{
  "data": {
    "forceReconnectBlockchain": true
  }
}
```

## Configuration

### Environment Variables

- `DISABLE_BLOCKCHAIN_SYNC=true` - disable blockchain synchronization
- `BLOCKCHAIN_CONFIG_PATH` - path to blockchain configuration file

### Code Settings

```typescript
// In BlockchainService
private maxReconnectAttempts = 5;        // Maximum number of attempts
private reconnectDelay = 5000;           // Base delay (ms)
private healthCheckInterval = 30000;     // Health check interval (ms)
```

## Logging

### Log Levels

- **INFO**: Successful connections, reconnections
- **WARN**: Connection closures, reconnection attempts
- **ERROR**: Connection errors, failed reconnection attempts
- **DEBUG**: Health check details (block number)

### Log Examples

```
[INFO] WebSocket connection opened for ethereum
[WARN] Connection unhealthy for arbitrum, attempting reconnection...
[INFO] Reconnection attempt 1/5 for arbitrum
[ERROR] Health check failed for ethereum: Error: Connection timeout
[INFO] Successfully reconnected to arbitrum
```

## Production Monitoring

### Recommendations

1. **Set up alerts** for reconnection errors
2. **Monitor metrics** of healthy connections count
3. **Check logs** for frequent reconnections
4. **Use GraphQL queries** for status checking in dashboards

### Monitoring Metrics

- `healthyConnections / totalConnections` - percentage of healthy connections
- Number of reconnection attempts per hour
- Connection recovery time
- Health check error frequency

## Troubleshooting

### Common Issues

1. **Connection not recovering**
   - Check RPC URL availability
   - Verify configuration correctness
   - Check API provider limits

2. **Frequent reconnections**
   - Possible network issues
   - Check RPC provider stability
   - Consider increasing check interval

3. **Log errors**
   - Check blockchain configuration format
   - Ensure ABI events are correct
   - Check database access permissions

### Diagnostic Commands

```bash
# Check status via GraphQL
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ blockchainConnectionStatus { connections { blockchainName isConnected reconnectAttempts } } }"}'

# Force reconnection
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "mutation { forceReconnectBlockchain(blockchainName: \"ethereum\") }"}'
```
