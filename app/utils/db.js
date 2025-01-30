import knex from 'knex';

export const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
  },
  pool: { min: 2, max: 10 },
});

export const getUserFromDb = async (email) => {
  try {
    // Query the database for a user with the given email
    return await db('users')
      .select('id', 'email', 'password_hash')
      .where({ email })
      .first();
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }
};
