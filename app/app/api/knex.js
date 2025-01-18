import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    connectionString:
      'postgres://neondb_owner:TWGZ6lqn9ruN@ep-purple-king-a216ui33-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require',
  },
});

export default connection;
