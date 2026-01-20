import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("POSTGRES CONNECTED");  // <- This confirms DB connection
  } catch (err) {
    console.error("Error connecting to POSTGRES:", err);
    process.exit(1); // Stop server if DB fails
  }
};
