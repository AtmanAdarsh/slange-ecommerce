import { Pool, PoolClient } from 'pg';
import { logger } from '../../utils/logger';

let pool: Pool;

export const connectPostgreSQL = async (): Promise<void> => {
  try {
    const postgresURI = process.env.POSTGRES_URI || 'postgresql://slange:slange123@localhost:5432/slange';
    
    pool = new Pool({
      connectionString: postgresURI,
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
      connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
      maxUses: 7500, // Close (and replace) a connection after it has been used 7500 times
    });

    // Test the connection
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();

    logger.info('PostgreSQL connected successfully');

    // Handle pool errors
    pool.on('error', (err) => {
      logger.error('Unexpected error on idle client', err);
    });

  } catch (error) {
    logger.error('Failed to connect to PostgreSQL:', error);
    throw error;
  }
};

export const getPostgreSQLClient = (): PoolClient => {
  if (!pool) {
    throw new Error('PostgreSQL not connected. Call connectPostgreSQL() first.');
  }
  return pool.connect();
};

export const query = async (text: string, params?: any[]): Promise<any> => {
  if (!pool) {
    throw new Error('PostgreSQL not connected. Call connectPostgreSQL() first.');
  }
  
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    logger.debug('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    logger.error('Query error:', { text, params, error });
    throw error;
  }
};

export const disconnectPostgreSQL = async (): Promise<void> => {
  try {
    if (pool) {
      await pool.end();
      logger.info('PostgreSQL disconnected successfully');
    }
  } catch (error) {
    logger.error('Error disconnecting from PostgreSQL:', error);
    throw error;
  }
}; 