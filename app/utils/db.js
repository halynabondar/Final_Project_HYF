import knex from '@/app/api/knex';

export const getUserFromDb = async (email) => {
  try {
    // Query the database for a user with the given email
    const user = await knex('users')
      .select('email', 'password')
      .where({ email })
      .first();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error.message);
    return null;
  }
};
