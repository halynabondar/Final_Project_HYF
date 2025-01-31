import { auth } from '@/auth';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'db_user',
  host: 'localhost',
  database: 'db_name',
  password: 'db_password',
  port: 5432,
});

export async function DELETE() {
  // No need to pass `req`
  try {
    const session = await auth(); // Get session
    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
      });
    }

    const userId = session.user.id;

    const result = await pool.query('DELETE FROM users WHERE id = $1', [
      userId,
    ]);

    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: 'User deleted successfully' }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
