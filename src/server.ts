import app from "./app";
import { connectDB } from "./config/connectDB";

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("DB connection failed ❌", error);
  }
}

startServer();
