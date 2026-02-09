// // // // // const express = require("express");
// // // // // const router = express.Router();
// // // // // const OpenAI = require("openai");

// // // // // // Log once to verify the key is actually loaded when the route is hit
// // // // // if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes("your_api")) {
// // // // //     console.error("⚠️ WARNING: OpenAI API Key is missing or using a placeholder!");
// // // // // }

// // // // // const openai = new OpenAI({
// // // // //   apiKey: process.env.OPENAI_API_KEY,
// // // // // });

// // // // // router.post("/", async (req, res) => {
// // // // //   try {
// // // // //     const { message } = req.body;

// // // // //     if (!message) {
// // // // //       return res.status(400).json({ error: "Message is required" });
// // // // //     }

// // // // //     const completion = await openai.chat.completions.create({
// // // // //       model: "gpt-4o-mini", // Fixed the version name here
// // // // //       messages: [
// // // // //         { role: "system", content: "You are a helpful assistant." },
// // // // //         { role: "user", content: message },
// // // // //       ],
// // // // //       temperature: 0.7,
// // // // //       max_tokens: 200,
// // // // //     });

// // // // //     const reply = completion.choices[0].message.content;
// // // // //     res.json({ reply });

// // // // //   } catch (error) {
// // // // //     // Check for specific authentication error
// // // // //     if (error.status === 401) {
// // // // //         console.error("❌ Invalid API Key. Check your .env file.");
// // // // //     }

// // // // //     console.error("❌ OpenAI Error:", error.message);
// // // // //     res.status(500).json({
// // // // //       error: "OpenAI request failed",
// // // // //       details: error.message,
// // // // //     });
// // // // //   }
// // // // // });

// // // // // module.exports = router;

// // // // const express = require("express");
// // // // const router = express.Router();
// // // // const OpenAI = require("openai");

// // // // // OpenAI client initialize karein
// // // // const openai = new OpenAI({
// // // //   apiKey: process.env.OPENAI_API_KEY,
// // // // });

// // // // router.post("/", async (req, res) => {
// // // //   try {
// // // //     const { message } = req.body;

// // // //     if (!message) {
// // // //       return res.status(400).json({ error: "Message is required" });
// // // //     }

// // // //     const completion = await openai.chat.completions.create({
// // // //       model: "gpt-4o-mini", // Sahi model name (gpt-4.1-mini nahi)
// // // //       messages: [
// // // //         { role: "system", content: "You are a helpful assistant." },
// // // //         { role: "user", content: message },
// // // //       ],
// // // //       temperature: 0.7,
// // // //     });

// // // //     res.json({ reply: completion.choices[0].message.content });
// // // //   } catch (error) {
// // // //     console.error("❌ OpenAI API Error:", error.message);
// // // //     res.status(500).json({
// // // //       error: "OpenAI request failed",
// // // //       details: error.message,
// // // //     });
// // // //   }
// // // // });

// // // // module.exports = router;

// // // const express = require("express");
// // // const router = express.Router();
// // // const OpenAI = require("openai");
// // // const Chat = require("../models/Chat");
// // // const verifyToken = require("../middleware/auth.middleware"); // JWT middleware

// // // const openai = new OpenAI({
// // //   apiKey: process.env.OPENAI_API_KEY,
// // // });

// // // // POST /api/chat → send message + store in DB
// // // router.post("/", verifyToken, async (req, res) => {
// // //   try {
// // //     const { message } = req.body;
// // //     const userId = req.user.id; // from JWT

// // //     if (!message) return res.status(400).json({ error: "Message is required" });

// // //     // 1️⃣ Find or create chat session
// // //     let chat = await Chat.findOne({ userId });
// // //     if (!chat) chat = await Chat.create({ userId, messages: [] });

// // //     // 2️⃣ Save user message
// // //     chat.messages.push({ role: "user", content: message });

// // //     // 3️⃣ Send full chat history to OpenAI
// // //     const completion = await openai.chat.completions.create({
// // //       model: "gpt-4o-mini",
// // //       messages: chat.messages.map((m) => ({
// // //         role: m.role,
// // //         content: m.content,
// // //       })),
// // //       temperature: 0.7,
// // //     });

// // //     const aiReply = completion.choices[0].message.content;

// // //     // 4️⃣ Save AI response
// // //     chat.messages.push({ role: "assistant", content: aiReply });

// // //     // 5️⃣ Save chat to DB
// // //     await chat.save();

// // //     res.json({ reply: aiReply, messages: chat.messages });
// // //   } catch (error) {
// // //     console.error("❌ OpenAI Error:", error);
// // //     res
// // //       .status(500)
// // //       .json({ error: "OpenAI request failed", details: error.message });
// // //   }
// // // });

// // // // GET /api/chat → get chat history
// // // router.get("/", verifyToken, async (req, res) => {
// // //   try {
// // //     const chat = await Chat.findOne({ userId: req.user.id });
// // //     res.json(chat || { messages: [] });
// // //   } catch (err) {
// // //     res.status(500).json({ error: "Failed to load chat" });
// // //   }
// // // });

// // // module.exports = router;

// // // routes/chat.js
// // // const express = require("express");
// // // const Chat = require("../models/Chat");
// // // const verifyToken = require("../middleware/auth.middleware"); // your JWT auth middleware
// // // const router = express.Router();

// // // router.get("/", verifyToken, async (req, res) => {
// // //   try {
// // //     const chat = await Chat.findOne({ userId: req.user._id });
// // //     res.json(chat || { messages: [] });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ error: "Server error" });
// // //   }
// // // });


// // const express = require("express");
// // const Chat = require("../models/Chat");
// // const verifyToken = require("../middleware/auth.middleware");
// // const { OpenAI } = require("openai");

// // const router = express.Router();

// // // Initialize OpenAI client
// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // // ---------------- GET chat messages ----------------
// // router.get("/", verifyToken, async (req, res) => {
// //   try {
// //     const chatSession = await Chat.findOne({ userId: req.user.id });
// //     if (!chatSession) return res.json({ messages: [] });
// //     res.json(chatSession);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });

// // // ---------------- POST a new message ----------------
// // router.post("/", verifyToken, async (req, res) => {
// //   const { message } = req.body;
// //   if (!message) return res.status(400).json({ message: "Message is required" });

// //   try {
// //     let chatSession = await Chat.findOne({ userId: req.user.id });
// //     if (!chatSession) chatSession = new Chat({ userId: req.user.id, messages: [] });

// //     // User message
// //     chatSession.messages.push({ role: "user", content: message });

// //     // OpenAI API
// //     const response = await openai.chat.completions.create({
// //       model: "gpt-3.5-turbo",
// //       messages: chatSession.messages.map((m) => ({
// //         role: m.role,
// //         content: m.content,
// //       })),
// //       temperature: 0.7,
// //     });

// //     const aiReply = response.choices[0].message.content;

// //     // AI response
// //     chatSession.messages.push({ role: "assistant", content: aiReply });

// //     await chatSession.save();

// //     res.json(chatSession);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: "AI server error" });
// //   }
// // });

// // module.exports = router;




// // chat.route.js
// // const express = require("express");
// // const Chat = require("../models/Chat"); // Mongoose model
// // const verifyToken = require("../middleware/auth.middleware"); // JWT middleware
// // const { OpenAI } = require("openai");
// // require("dotenv").config();

// // const router = express.Router();

// // // Initialize OpenAI client
// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // // ---------------- GET chat messages ----------------
// // router.get("/", verifyToken, async (req, res) => {
// //   try {
// //     const chatSession = await Chat.findOne({ userId: req.user.id });
// //     if (!chatSession) return res.json({ messages: [] });
// //     res.json(chatSession);
// //   } catch (err) {
// //     console.error("GET /chat Error:", err);
// //     res.status(500).json({ message: "Server error", error: err.message });
// //   }
// // });

// // // ---------------- POST a new message ----------------
// // router.post("/", verifyToken, async (req, res) => {
// //   const { message } = req.body;

// //   if (!message) {
// //     return res.status(400).json({ message: "Message is required" });
// //   }

// //   try {
// //     // Find or create chat session for this user
// //     let chatSession = await Chat.findOne({ userId: req.user.id });
// //     if (!chatSession) {
// //       chatSession = new Chat({ userId: req.user.id, messages: [] });
// //     }

// //     // 1️⃣ Add user's message to session
// //     chatSession.messages.push({ role: "user", content: message });

// //     // 2️⃣ Call OpenAI API
// //     const response = await openai.chat.completions.create({
// //       model: "gpt-3.5-turbo",
// //       messages: chatSession.messages.map((m) => ({
// //         role: m.role,
// //         content: m.content,
// //       })),
// //       temperature: 0.7,
// //     });

// //     // 3️⃣ Get AI reply safely
// //     const aiReply = response?.choices?.[0]?.message?.content;
// //     if (!aiReply) {
// //       throw new Error("AI did not return a reply");
// //     }

// //     // 4️⃣ Add AI reply to session
// //     chatSession.messages.push({ role: "assistant", content: aiReply });

// //     // 5️⃣ Save chat session
// //     await chatSession.save();

// //     // 6️⃣ Return updated session
// //     res.json(chatSession);
// //   } catch (err) {
// //     console.error("POST /chat Error:", err);
// //     res.status(500).json({ message: "AI server error", error: err.message });
// //   }
// // });

// // module.exports = router;



// // const express = require("express");
// // const Chat = require("../models/Chat");
// // const verifyToken = require("../middleware/auth.middleware");
// // const OpenAI = require("openai");
// // require("dotenv").config();

// // const router = express.Router();

// // // ✅ Initialize OpenAI client
// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // // ---------------- GET chat messages ----------------
// // router.get("/", verifyToken, async (req, res) => {
// //   try {
// //     const chatSession = await Chat.findOne({ userId: req.user.id });
// //     if (!chatSession) return res.json({ messages: [] });
// //     res.json(chatSession);
// //   } catch (err) {
// //     console.error("GET /chat Error:", err);
// //     res.status(500).json({ message: "Server error", error: err.message });
// //   }
// // });

// // // ---------------- POST a new message ----------------
// // router.post("/", verifyToken, async (req, res) => {
// //   const { message } = req.body;

// //   if (!message) {
// //     return res.status(400).json({ message: "Message is required" });
// //   }

// //   try {
// //     let chatSession = await Chat.findOne({ userId: req.user.id });
// //     if (!chatSession) {
// //       chatSession = new Chat({ userId: req.user.id, messages: [] });
// //     }

// //     // 1️⃣ Save user message
// //     chatSession.messages.push({ role: "user", content: message });

// //     // 2️⃣ Call OpenAI (NEW API)
// //     const response = await openai.responses.create({
// //       model: "gpt-4.1-mini",
// //       input: chatSession.messages.map(m => ({
// //         role: m.role,
// //         content: [{ type: "text", text: m.content }]
// //       })),
// //     });

// //     // 3️⃣ Extract AI reply
// //     const aiReply = response.output_text;

// //     if (!aiReply) {
// //       throw new Error("No AI reply received");
// //     }

// //     // 4️⃣ Save AI reply
// //     chatSession.messages.push({ role: "assistant", content: aiReply });

// //     // 5️⃣ Save to DB
// //     await chatSession.save();

// //     res.json(chatSession);

// //   } catch (err) {
// //     console.error("POST /chat Error:", err);
// //     res.status(500).json({ message: "AI server error", error: err.message });
// //   }
// // });

// // module.exports = router;



// // const express = require("express");
// // const Chat = require("../models/Chat");
// // const verifyToken = require("../middleware/auth.middleware");
// // const OpenAI = require("openai");

// // const router = express.Router();

// // // ✅ Correct OpenAI init
// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// //   timeout: 20000,
// // });

// // // ---------------- GET chat messages ----------------
// // router.get("/", verifyToken, async (req, res) => {
// //   try {
// //     const chatSession = await Chat.findOne({ userId: req.user.id });
// //     if (!chatSession) return res.json({ messages: [] });
// //     res.json(chatSession);
// //   } catch (err) {
// //     console.error("GET /chat Error:", err);
// //     res.status(500).json({ message: "Server error", error: err.message });
// //   }
// // });

// // // ---------------- POST message ----------------
// // router.post("/", verifyToken, async (req, res) => {
// //   const { message } = req.body;

// //   if (!message) return res.status(400).json({ message: "Message is required" });

// //   try {
// //     let chatSession = await Chat.findOne({ userId: req.user.id });

// //     if (!chatSession) {
// //       chatSession = new Chat({ userId: req.user.id, messages: [] });
// //     }

// //     // Save user message
// //     chatSession.messages.push({ role: "user", content: message });

// //     // Call OpenAI
// //     const response = await openai.responses.create({
// //       model: "gpt-4.1-mini",
// //       input: chatSession.messages.map(m => ({
// //         role: m.role,
// //         content: [{ type: "text", text: m.content }]
// //       })),
// //     });

// //     const aiReply = response.output_text;

// //     if (!aiReply) throw new Error("No AI response");

// //     // Save AI reply
// //     chatSession.messages.push({ role: "assistant", content: aiReply });

// //     await chatSession.save();

// //     res.json(chatSession);

// //   } catch (err) {
// //     console.error("FULL AI ERROR:", err);

// //     if (err.response) {
// //       console.error("OpenAI response:", err.response.data);
// //     }

// //     res.status(500).json({
// //       message: "AI server error",
// //       error: err.message
// //     });
// //   }
// // });

// // module.exports = router;




// const express = require("express");
// const Chat = require("../models/Chat");
// const verifyToken = require("../middleware/auth.middleware");
// const OpenAI = require("openai");

// const router = express.Router();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   timeout: 20000,
// });

// // GET chat history
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const chat = await Chat.findOne({ userId: req.user.id });
//     if (!chat) return res.json({ messages: [] });
//     res.json(chat);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // POST message
// router.post("/", verifyToken, async (req, res) => {
//   const { message } = req.body;
//   if (!message) return res.status(400).json({ message: "Message required" });

//   try {
//     let chat = await Chat.findOne({ userId: req.user.id });
//     if (!chat) chat = new Chat({ userId: req.user.id, messages: [] });

//     // Save user msg
//     chat.messages.push({ role: "user", content: message });

//     // Call OpenAI
//     const response = await openai.responses.create({
//       model: "gpt-4.1-mini",
//       input: chat.messages.map(m => ({
//         role: m.role,
//         content: [{ type: "text", text: m.content }]
//       }))
//     });

//     const aiReply = response.output_text;
//     if (!aiReply) throw new Error("No AI reply");

//     // Save AI msg
//     chat.messages.push({ role: "assistant", content: aiReply });

//     await chat.save();

//     res.json(chat);

//   } catch (err) {
//     console.error("AI ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;




// const express = require("express");
// const Chat = require("../models/Chat");
// const verifyToken = require("../middleware/auth.middleware");
// const OpenAI = require("openai");

// const router = express.Router();

// // IMPORTANT: correct import (NO { OpenAI })
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // GET chat history
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const chat = await Chat.findOne({ userId: req.user.id });
//     if (!chat) return res.json({ messages: [] });
//     res.json(chat);
//   } catch (err) {
//     console.error("GET ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // POST message
// router.post("/", verifyToken, async (req, res) => {
//   const { message } = req.body;
//   if (!message) return res.status(400).json({ message: "Message required" });

//   try {
//     let chat = await Chat.findOne({ userId: req.user.id });
//     if (!chat) chat = new Chat({ userId: req.user.id, messages: [] });

//     // save user message
//     chat.messages.push({ role: "user", content: message });

//     // CALL OPENAI (simple test input first)
//     const response = await openai.responses.create({
//       model: "gpt-4.1-mini",
//       input: message,
//     });

//     const aiReply = response.output_text;
//     if (!aiReply) throw new Error("No AI reply");

//     chat.messages.push({ role: "assistant", content: aiReply });

//     await chat.save();

//     return res.json(chat);

//   } catch (err) {
//     console.error("FULL AI ERROR:", err);
//     res.status(500).json({
//       message: "AI server error",
//       error: err.message,
//     });
//   }
// });

// module.exports = router;



// const express = require("express");
// const Chat = require("../models/Chat");
// const verifyToken = require("../middleware/auth.middleware");
// const OpenAI = require("openai");

// const router = express.Router();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// /* ─────────────────────────────
//    GET CHAT HISTORY
// ───────────────────────────── */
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const chat = await Chat.findOne({ userId: req.user.id });
//     if (!chat) {
//       return res.json({ messages: [] });
//     }
//     res.json(chat);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* ─────────────────────────────
//    SEND MESSAGE (MEMORY ENABLED)
// ───────────────────────────── */
// router.post("/", verifyToken, async (req, res) => {
//   const { message } = req.body;
//   if (!message) {
//     return res.status(400).json({ message: "Message required" });
//   }

//   try {
//     let chat = await Chat.findOne({ userId: req.user.id });

//     if (!chat) {
//       chat = new Chat({
//         userId: req.user.id,
//         messages: [],
//       });
//     }

//     // Save user message
//     chat.messages.push({
//       role: "user",
//       content: message,
//     });

//     // SYSTEM PROMPT (important)
//     const systemPrompt = {
//       role: "system",
//       content:
//         "You are a personal AI assistant. Remember user details like name when mentioned and use them later.",
//     };

//     // Send last 20 messages for memory
//     const conversation = [
//       systemPrompt,
//       ...chat.messages.slice(-20),
//     ];

//     // Call OpenAI
//     const response = await openai.chat.completions.create({
//       model: "gpt-4.1-mini",
//       messages: conversation,
//     });

//     const aiReply = response.choices[0].message.content;

//     // Save AI reply
//     chat.messages.push({
//       role: "assistant",
//       content: aiReply,
//     });

//     await chat.save();

//     res.json({
//       reply: aiReply,
//       chat,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "AI server error",
//       error: err.message,
//     });
//   }
// });

// module.exports = router;




const express = require("express");
const Chat = require("../models/Chat");
const verifyToken = require("../middleware/auth.middleware");
const OpenAI = require("openai");

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// GET chat history
router.get("/", verifyToken, async (req, res) => {
  try {
    const chat = await Chat.findOne({ userId: req.user.id });
    if (!chat) return res.json({ messages: [] });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST message
router.post("/", verifyToken, async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: "Message required" });

  try {
    let chat = await Chat.findOne({ userId: req.user.id });
    if (!chat) chat = new Chat({ userId: req.user.id, messages: [] });

    // 1. Add user message to local history
    chat.messages.push({ role: "user", content: message });

    // 2. Call OpenAI using the Chat Completions API
    // We pass the entire history so the AI "remembers" the name
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Corrected model name
      messages: chat.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
    });

    const aiReply = completion.choices[0].message.content;

    // 3. Save AI reply to database
    chat.messages.push({ role: "assistant", content: aiReply });
    await chat.save();

    return res.json(chat);

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({
      message: "AI server error",
      error: err.message,
    });
  }
});

module.exports = router;