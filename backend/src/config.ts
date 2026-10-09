import "dotenv/config";

export const config = {
  jwtSecret: process.env.JWT_SECRET,
  port: 4000,
};

// Падаем сразу при старте, если забыли секрет — лучше тут, чем посреди запроса логина.
if (!config.jwtSecret) {
  throw new Error("JWT_SECRET не задан в .env");
}
