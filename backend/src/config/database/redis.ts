import { createClient, RedisClientType } from 'redis';
import { logger } from '../../utils/logger';

let redisClient: RedisClientType;

export const connectRedis = async (): Promise<void> => {
  try {
    const redisURI = process.env.REDIS_URI || 'redis://localhost:6379';
    
    redisClient = createClient({
      url: redisURI,
      socket: {
        connectTimeout: 10000,
        lazyConnect: true,
      },
      retry_strategy: (options) => {
        if (options.error && options.error.code === 'ECONNREFUSED') {
          // End the reconnecting on a specific error and flush all commands with a individual error
          return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          // End reconnecting after a specific timeout and flush all commands with a individual error
          return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
          // End reconnecting with built in error
          return undefined;
        }
        // Reconnect after
        return Math.min(options.attempt * 100, 3000);
      },
    });

    // Event handlers
    redisClient.on('connect', () => {
      logger.info('Redis connected successfully');
    });

    redisClient.on('ready', () => {
      logger.info('Redis ready to accept commands');
    });

    redisClient.on('error', (err) => {
      logger.error('Redis error:', err);
    });

    redisClient.on('end', () => {
      logger.warn('Redis connection ended');
    });

    redisClient.on('reconnecting', () => {
      logger.info('Redis reconnecting...');
    });

    // Connect to Redis
    await redisClient.connect();

  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    throw error;
  }
};

export const getRedisClient = (): RedisClientType => {
  if (!redisClient) {
    throw new Error('Redis not connected. Call connectRedis() first.');
  }
  return redisClient;
};

export const setKey = async (key: string, value: string, expireSeconds?: number): Promise<void> => {
  try {
    if (expireSeconds) {
      await redisClient.setEx(key, expireSeconds, value);
    } else {
      await redisClient.set(key, value);
    }
  } catch (error) {
    logger.error('Redis SET error:', { key, error });
    throw error;
  }
};

export const getKey = async (key: string): Promise<string | null> => {
  try {
    return await redisClient.get(key);
  } catch (error) {
    logger.error('Redis GET error:', { key, error });
    throw error;
  }
};

export const deleteKey = async (key: string): Promise<number> => {
  try {
    return await redisClient.del(key);
  } catch (error) {
    logger.error('Redis DEL error:', { key, error });
    throw error;
  }
};

export const setHash = async (key: string, field: string, value: string): Promise<number> => {
  try {
    return await redisClient.hSet(key, field, value);
  } catch (error) {
    logger.error('Redis HSET error:', { key, field, error });
    throw error;
  }
};

export const getHash = async (key: string, field: string): Promise<string | null> => {
  try {
    return await redisClient.hGet(key, field);
  } catch (error) {
    logger.error('Redis HGET error:', { key, field, error });
    throw error;
  }
};

export const getAllHash = async (key: string): Promise<Record<string, string>> => {
  try {
    return await redisClient.hGetAll(key);
  } catch (error) {
    logger.error('Redis HGETALL error:', { key, error });
    throw error;
  }
};

export const disconnectRedis = async (): Promise<void> => {
  try {
    if (redisClient) {
      await redisClient.quit();
      logger.info('Redis disconnected successfully');
    }
  } catch (error) {
    logger.error('Error disconnecting from Redis:', error);
    throw error;
  }
}; 