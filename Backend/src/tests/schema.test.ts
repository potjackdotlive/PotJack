import { ApolloServer } from 'apollo-server-express';
import { resolvers } from '../resolvers';
import { readFileSync } from 'node:fs';

// Mock the database repositories
jest.mock('../config/database', () => ({
  AppDataSource: {
    getRepository: jest.fn().mockImplementation(() => ({
      findOne: jest.fn().mockImplementation(({ where }) => {
        if (where.address === 'valid-address') {
          return Promise.resolve({
            id: '1',
            address: 'valid-address',
            totalWins: 5,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
        return Promise.resolve(null);
      }),
      createQueryBuilder: jest.fn().mockImplementation(() => ({
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        innerJoin: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([
          {
            id: '1',
            token: '0xtoken',
            roundId: 1,
            chainId: 1,
            amount: '1000000000000000000',
            players: Array(10).fill(0).map((_, i) => ({
              id: `player-${i}`,
              address: `player-address-${i}`,
              totalWins: i,
            })),
            blockTimestamp: new Date(),
            transactionHash: '0xtx',
            user: {
              id: '1',
              address: 'valid-address',
              totalWins: 5,
            },
          },
        ]),
        getCount: jest.fn().mockResolvedValue(5),
      })),
    })),
  },
}));

describe('GraphQL Schema', () => {
  let server: ApolloServer;
  const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' });

  beforeAll(() => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });
  });

  it('should return a user when queried with a valid address', async () => {
    const result = await server.executeOperation({
      query: `
        query GetUser($address: String!) {
          user(address: $address) {
            address
            totalWins
          }
        }
      `,
      variables: { address: 'valid-address' },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.user).toBeDefined();
    expect(result.data?.user.address).toBe('valid-address');
  });

  it('should return null for a user with an invalid address', async () => {
    const result = await server.executeOperation({
      query: `
        query GetUser($address: String!) {
          user(address: $address) {
            address
            totalWins
          }
        }
      `,
      variables: { address: 'invalid-address' },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.user).toBeNull();
  });

  it('should return win events for a valid user', async () => {
    const result = await server.executeOperation({
      query: `
        query GetWinEvents($address: String!) {
          winEvents(address: $address) {
            token
            roundId
            chainId
            amount
            players {
              id
              address
            }
            user {
              address
            }
          }
        }
      `,
      variables: { address: 'valid-address' },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.winEvents).toBeDefined();
    expect(result.data?.winEvents.length).toBeGreaterThan(0);
    expect(result.data?.winEvents[0].token).toBe('0xtoken');
    expect(result.data?.winEvents[0].user.address).toBe('valid-address');
    expect(result.data?.winEvents[0].players).toHaveLength(10);
    expect(result.data?.winEvents[0].players[0].address).toBe('player-address-0');
  });

  it('should return win stats for a valid user', async () => {
    const result = await server.executeOperation({
      query: `
        query GetWinStats($address: String) {
          winStats(address: $address) {
            totalWins
            user {
              address
            }
          }
        }
      `,
      variables: { address: 'valid-address' },
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.winStats).toBeDefined();
    expect(result.data?.winStats.user.address).toBe('valid-address');
  });
});
