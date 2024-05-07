import 'dotenv/config';

const AppConfig = {
  app: {
    PORT: parseInt(<string>process.env.PORT, 10) || 3030,
    FRONT_URL: process.env.FRONT_URL || '',
    JWT_SECRET: process.env.JWT_SECRET || 'KEY',
    MAX_RATING: 5,
  },
  db: {},
};

export default Object.freeze(AppConfig);
