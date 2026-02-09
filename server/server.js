// // MUST be first
// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const rateLimit = require("express-rate-limit");

// const app = express();

// /* ───────────────── Middleware ───────────────── */
// app.use(cors({
//   origin: "*", // tighten later in prod
// }));
// app.use(express.json());

// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     standardHeaders: true,
//     legacyHeaders: false,
//     message: { error: "Too many requests, try again later." },
//   })
// );

// /* ───────────────── ENV Check ───────────────── */
// if (!process.env.OPENAI_API_KEY) {
//   console.error("❌ OPENAI_API_KEY missing");
//   process.exit(1);
// }
// console.log("OPENAI KEY LOADED ✅");

// /* ───────────────── MongoDB ───────────────── */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => {
//     console.error("MongoDB Connection Error:", err);
//     process.exit(1);
//   });

// /* ───────────────── Routes ───────────────── */
// app.use("/api/auth", require("./routes/auth.routes"));
// app.use("/api/chat", require("./routes/chat.routes"));

// /* ───────────────── Health Check ───────────────── */
// app.get("/api/dashboard", (req, res) => {
//   res.json({ status: "ok", message: "Server working!" });
// });

// /* ───────────────── Start Server ───────────────── */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// MUST be first
// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// // const rateLimit = require("express-rate-limit"); // No longer needed

// const app = express();

// /* ───────────────── Middleware ───────────────── */
// app.use(cors({
//   origin: "*",
// }));
// app.use(express.json());

// // RATE LIMIT REMOVED FROM HERE

// /* ───────────────── ENV Check ───────────────── */
// const path = require("path");
// // This forces Node to look in the exact folder where server.js lives
// require("dotenv").config({ path: path.resolve(__dirname, ".env") });

// console.log("Current Key Value:", process.env.OPENAI_API_KEY);

// if (!process.env.OPENAI_API_KEY) {
//   console.error("❌ OPENAI_API_KEY missing");
//   process.exit(1);
// }
// console.log("OPENAI KEY LOADED ✅");

// /* ───────────────── MongoDB ───────────────── */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => {
//     console.error("MongoDB Connection Error:", err);
//     process.exit(1);
//   });

// /* ───────────────── Routes ───────────────── */
// app.use("/api/auth", require("./routes/auth.routes"));
// app.use("/api/chat", require("./routes/chat.routes"));

// /* ───────────────── Health Check ───────────────── */
// app.get("/api/dashboard", (req, res) => {
//   res.json({ status: "ok", message: "Server working!" });
// });

// /* ───────────────── Start Server ───────────────── */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

// const path = require("path");
// // Force dotenv to find the file in the CURRENT directory
// require("dotenv").config({ path: path.join(__dirname, ".env") });

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// /* ───────────────── DEBUG BLOCK ───────────────── */
// console.log("------------------------------------");
// if (!process.env.OPENAI_API_KEY) {
//   console.log("❌ STATUS: Key is MISSING from process.env");
// } else if (process.env.OPENAI_API_KEY.includes("your_api")) {
//   console.log("❌ STATUS: Key is still the PLACEHOLDER (your_api*****here)");
// } else {
//   console.log("✅ STATUS: Real Key Loaded (Starts with: " + process.env.OPENAI_API_KEY.substring(0, 7) + "...)");
// }
// console.log("------------------------------------");

// const app = express();

// /* ───────────────── Middleware ───────────────── */
// app.use(cors({ origin: "*" }));
// app.use(express.json());

// /* ───────────────── ENV Check ───────────────── */
// if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes("your_api")) {
//   console.error("❌ FATAL: OpenAI API Key is not configured correctly. Stopping server.");
//   process.exit(1);
// }

// /* ───────────────── MongoDB ───────────────── */
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("📦 MongoDB Connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Error:", err);
//     process.exit(1);
//   });

// /* ───────────────── Routes ───────────────── */
// // Ensure these files exist in your 'routes' folder
// app.use("/api/auth", require("./routes/auth.routes"));
// app.use("/api/chat", require("./routes/chat.routes"));

// /* ───────────────── Health Check ───────────────── */
// app.get("/api/dashboard", (req, res) => {
//   res.json({ status: "ok", message: "Server working!" });
// });

// /* ───────────────── Start Server ───────────────── */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const path = require("path");

// // Dotenv ko load karne ka sabse pakka tareeka
// require("dotenv").config({ path: path.join(__dirname, ".env") });

// const app = express();

// /* ─── AGAR .ENV KAAM NA KARE TO YAHAN DIRECT KEY DALEN (Testing ke liye) ─── */
// // process.env.OPENAI_API_KEY = "sk-proj-XXXXX";

// console.log("------------------------------------");
// console.log(
//   "API KEY STATUS:",
//   process.env.OPENAI_API_KEY ? "✅ LOADED" : "❌ MISSING",
// );
// console.log("MONGO URI:", process.env.MONGO_URI ? "✅ LOADED" : "❌ MISSING");
// console.log("------------------------------------");

// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // Routes
// app.use("/api/auth", require("./routes/auth.routes"));

// app.use("/api/chat", require("./routes/chat.routes"));

// app.get("/api/dashboard", (req, res) => {
//   res.json({ status: "ok", message: "Server working!" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));




require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const chatRoutes = require("./routes/chat.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes

app.use("/api/auth", require("./routes/auth.routes"));


app.get("/api/dashboard", (req, res) => {
  res.json({ status: "ok", message: "Server working!" });
});
app.use("/api/chat", chatRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("OPENAI KEY:", process.env.OPENAI_API_KEY?.slice(0, 10));
});
