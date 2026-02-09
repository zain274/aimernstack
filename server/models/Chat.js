// const mongoose = require("mongoose");

// const messageSchema = new mongoose.Schema(
//   {
//     role: {
//       type: String,
//       enum: ["user", "assistant"],
//       required: true,
//     },
//     content: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true },
// );

// const chatSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true,
//     },
//     messages: [messageSchema],
//   },
//   { timestamps: true },
// );

// module.exports = mongoose.model("Chat", chatSchema);



// const mongoose = require("mongoose");

// const chatSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   messages: [
//     {
//       role: { type: String, enum: ["user", "assistant"], required: true },
//       content: { type: String, required: true },
//       createdAt: { type: Date, default: Date.now }
//     }
//   ]
// });





// module.exports = mongoose.model("Chat", chatSchema);




const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  messages: [
    {
      role: { type: String, enum: ["system", "user", "assistant"] },
      content: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

module.exports = mongoose.model("Chat", chatSchema);


