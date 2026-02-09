// // // import api from "../api";
// // // import { Send, Loader2, User as UserIcon, Bot } from "lucide-react";

// // // export default function Chat() {
// // //   const [chat, setChat] = useState({ messages: [] });
// // //   const [message, setMessage] = useState("");
// // //   const [isSending, setIsSending] = useState(false);
// // //   const messagesEndRef = useRef(null);

// // //   useEffect(() => {
// // //     const fetchChat = async () => {
// // //       try {
// // //         const res = await api.get("/chat");
// // //         setChat(res.data);
// // //       } catch (err) {
// // //         console.error(err);
// // //       }
// // //     };
// // //     fetchChat();
// // //   }, []);

// // //   useEffect(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   }, [chat.messages, isSending]);

// // //   const send = async () => {
// // //     if (!message.trim() || isSending) return;

// // //     const userMsg = message.trim();
// // //     setMessage("");
// // //     setIsSending(true);

// // //     setChat((prev) => ({
// // //       messages: [
// // //         ...prev.messages,
// // //         { _id: crypto.randomUUID(), role: "user", content: userMsg },
// // //       ],
// // //     }));

// // //     try {
// // //       const res = await api.post("/chat", { message: userMsg });
// // //       setChat((prev) => ({
// // //         messages: res.data.messages.map((m) => ({
// // //           ...m,
// // //           _id: crypto.randomUUID(),
// // //         })),
// // //       }));
// // //     } catch (err) {
// // //       setChat((prev) => ({
// // //         messages: [
// // //           ...prev.messages,
// // //           { _id: crypto.randomUUID(), role: "assistant", content: "AI error" },
// // //         ],
// // //       }));
// // //     } finally {
// // //       setIsSending(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="flex flex-col h-full p-6">
// // //       <div className="flex-1 overflow-y-auto space-y-4">
// // //         {chat.messages.map((m) => (
// // //           <div
// // //             key={m._id}
// // //             className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
// // //           >
// // //             <div
// // //               className={`px-4 py-3 rounded-2xl max-w-[75%] text-sm ${m.role === "user" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-800"}`}
// // //             >
// // //               {m.content}
// // //             </div>
// // //           </div>
// // //         ))}
// // //         {isSending && (
// // //           <div className="flex items-center gap-2 text-slate-400">
// // //             <Loader2 className="animate-spin" size={16} /> AI is thinking...
// // //           </div>
// // //         )}
// // //         <div ref={messagesEndRef} />
// // //       </div>

// // //       <div className="flex gap-3 mt-4">
// // //         <textarea
// // //           value={message}
// // //           onChange={(e) => setMessage(e.target.value)}
// // //           onKeyDown={(e) => {
// // //             if (e.key === "Enter" && !e.shiftKey) {
// // //               e.preventDefault();
// // //               send();
// // //             }
// // //           }}
// // //           rows={1}
// // //           placeholder="Ask something..."
// // //           className="flex-1 resize-none rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
// // //         />
// // //         <button
// // //           onClick={send}
// // //           disabled={isSending}
// // //           className="bg-indigo-600 text-white px-5 rounded-xl hover:bg-indigo-700"
// // //         >
// // //           <Send size={18} />
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useEffect, useRef } from "react";
// // import api from "../api";
// // import { Send, Loader2, User as UserIcon, Bot } from "lucide-react";
// // import { motion } from "framer-motion";

// // export default function Chat() {
// //   const [chat, setChat] = useState({ messages: [] }); // Messages state
// //   const [message, setMessage] = useState(""); // Input message
// //   const [isSending, setIsSending] = useState(false); // Sending state
// //   const messagesEndRef = useRef(null); // Scroll ref

// //   // Auto scroll to bottom on new messages
// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [chat.messages, isSending]);

// //   const send = async () => {
// //     if (!message.trim() || isSending) return;

// //     const userMsg = message.trim();
// //     setMessage("");
// //     setIsSending(true);

// //     // Add user message (optimistic UI)
// //     setChat((prev) => ({
// //       ...prev,
// //       messages: [
// //         ...(Array.isArray(prev.messages) ? prev.messages : []),
// //         { _id: crypto.randomUUID(), role: "user", content: userMsg },
// //       ],
// //     }));

// //     try {
// //       const res = await api.post("/chat", { message: userMsg });

// //       // Add AI response
// //       setChat((prev) => ({
// //         ...prev,
// //         messages: [
// //           ...(Array.isArray(prev.messages) ? prev.messages : []),
// //           {
// //             _id: crypto.randomUUID(),
// //             role: "assistant",
// //             content: res.data.reply,
// //           },
// //         ],
// //       }));
// //     } catch (err) {
// //       console.error("API Error:", err);
// //       setChat((prev) => ({
// //         ...prev,
// //         messages: [
// //           ...(Array.isArray(prev.messages) ? prev.messages : []),
// //           {
// //             _id: crypto.randomUUID(),
// //             role: "assistant",
// //             content:
// //               "Error: AI server is not responding. Please check your API key.",
// //           },
// //         ],
// //       }));
// //     } finally {
// //       setIsSending(false);
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col h-full bg-slate-50/30">
// //       {/* Messages */}
// //       <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
// //         {Array.isArray(chat.messages) &&
// //           chat.messages.map((m) => (
// //             <div
// //               key={m._id || Math.random()}
// //               className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
// //             >
// //               <div
// //                 className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
// //               >
// //                 {/* Avatar */}
// //                 <div
// //                   className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 ${
// //                     m.role === "user"
// //                       ? "bg-indigo-600 text-white"
// //                       : "bg-white text-indigo-600 border border-slate-200"
// //                   }`}
// //                 >
// //                   {m.role === "user" ? (
// //                     <UserIcon size={14} />
// //                   ) : (
// //                     <Bot size={14} />
// //                   )}
// //                 </div>

// //                 {/* Message Bubble */}
// //                 <div
// //                   className={`px-4 py-3 rounded-2xl shadow-sm text-sm lg:text-[15px] whitespace-pre-wrap ${
// //                     m.role === "user"
// //                       ? "bg-indigo-600 text-white rounded-br-none"
// //                       : "bg-white text-slate-700 border border-slate-100 rounded-bl-none"
// //                   }`}
// //                 >
// //                   {m.content}
// //                 </div>
// //               </div>
// //             </div>
// //           ))}

// //         {/* Thinking Indicator */}
// //         {isSending && (
// //           <div className="flex items-center gap-2 text-slate-400 text-xs font-medium animate-pulse">
// //             <Loader2 className="animate-spin" size={14} /> Techwagera AI is
// //             thinking...
// //           </div>
// //         )}

// //         <div ref={messagesEndRef} />
// //       </div>

// //       {/* Input */}
// //       <div className="p-4 lg:p-8 bg-white border-t border-slate-100">
// //         <div className="max-w-4xl mx-auto relative group">
// //           <textarea
// //             rows={1}
// //             value={message}
// //             onChange={(e) => setMessage(e.target.value)}
// //             onKeyDown={(e) => {
// //               if (e.key === "Enter" && !e.shiftKey) {
// //                 e.preventDefault();
// //                 send();
// //               }
// //             }}
// //             placeholder="Ask anything..."
// //             className="w-full bg-slate-100/50 border-2 border-transparent rounded-2xl py-4 pl-6 pr-16 outline-none focus:bg-white focus:border-indigo-500/10 transition-all resize-none overflow-hidden"
// //           />
// //           <button
// //             onClick={send}
// //             disabled={isSending || !message.trim()}
// //             className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-indigo-600 text-white disabled:bg-slate-200 transition-colors shadow-md active:scale-95"
// //           >
// //             {isSending ? (
// //               <Loader2 className="animate-spin" size={20} />
// //             ) : (
// //               <Send size={20} />
// //             )}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useState, useEffect, useRef } from "react";
// import api from "../api";
// import { Send, Loader2, User as UserIcon, Bot } from "lucide-react";

// export default function Chat() {
//   const [chat, setChat] = useState({ messages: [] });
//   const [message, setMessage] = useState("");
//   const [isSending, setIsSending] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Fetch previous chat on load
//   useEffect(() => {
//     const fetchChat = async () => {
//       try {
//         const res = await api.get("/chat");
//         setChat(res.data);
//       } catch (err) {
//         console.error("Fetch chat error:", err);
//       }
//     };

//     fetchChat();
//   }, []);

//   // Auto scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat.messages, isSending]);

//   const send = async () => {
//     if (!message.trim() || isSending) return;

//     const userMsg = message.trim();
//     setMessage("");
//     setIsSending(true);

//     // Optimistic user message
//     setChat((prev) => ({
//       ...prev,
//       messages: [
//         ...(Array.isArray(prev.messages) ? prev.messages : []),
//         { _id: crypto.randomUUID(), role: "user", content: userMsg },
//       ],
//     }));

//     try {
//       const res = await api.post("/chat", { message: userMsg });

//       const messages = res.data.messages;
//       const lastAI = messages[messages.length - 1];

//       setChat((prev) => ({
//         ...prev,
//         messages: [
//           ...(Array.isArray(prev.messages) ? prev.messages : []),
//           {
//             _id: crypto.randomUUID(),
//             role: "assistant",
//             content: lastAI.content,
//           },
//         ],
//       }));

//     } catch (err) {
//       console.error("API Error:", err.response?.data || err.message);

//       setChat((prev) => ({
//         ...prev,
//         messages: [
//           ...(Array.isArray(prev.messages) ? prev.messages : []),
//           {
//             _id: crypto.randomUUID(),
//             role: "assistant",
//             content: "AI error. Please try again.",
//           },
//         ],
//       }));
//     } finally {
//       setIsSending(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-full bg-slate-50/30">
//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {Array.isArray(chat.messages) &&
//           chat.messages.map((m) => (
//             <div
//               key={m._id}
//               className={`flex ${
//                 m.role === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div className="flex gap-2 max-w-[75%]">
//                 {/* Avatar */}
//                 <div
//                   className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                     m.role === "user"
//                       ? "bg-indigo-600 text-white"
//                       : "bg-white text-indigo-600 border"
//                   }`}
//                 >
//                   {m.role === "user" ? (
//                     <UserIcon size={14} />
//                   ) : (
//                     <Bot size={14} />
//                   )}
//                 </div>

//                 {/* Bubble */}
//                 <div
//                   className={`px-4 py-2 rounded-xl text-sm whitespace-pre-wrap ${
//                     m.role === "user"
//                       ? "bg-indigo-600 text-white"
//                       : "bg-white text-slate-700 border"
//                   }`}
//                 >
//                   {m.content}
//                 </div>
//               </div>
//             </div>
//           ))}

//         {isSending && (
//           <div className="flex items-center gap-2 text-slate-400 text-sm">
//             <Loader2 className="animate-spin" size={16} /> AI is thinking...
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <div className="p-4 bg-white border-t">
//         <div className="flex gap-2">
//           <textarea
//             rows={1}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={(e) => {
//               if (e.key === "Enter" && !e.shiftKey) {
//                 e.preventDefault();
//                 send();
//               }
//             }}
//             placeholder="Ask something..."
//             className="flex-1 resize-none rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//           />
//           <button
//             onClick={send}
//             disabled={isSending || !message.trim()}
//             className="bg-indigo-600 text-white px-4 rounded-xl disabled:bg-slate-300"
//           >
//             {isSending ? (
//               <Loader2 className="animate-spin" size={18} />
//             ) : (
//               <Send size={18} />
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect, useRef } from "react";
import api from "../api";
import { Send, Loader2, User, Bot } from "lucide-react";

export default function Chat() {
  const [chat, setChat] = useState({ messages: [] });
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await api.get("/chat");
        setChat(res.data);
      } catch (err) {
        console.error("Fetch chat error:", err);
      }
    };
    fetchChat();
  }, []);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages, isSending]);

  const send = async () => {
    if (!message.trim() || isSending) return;

    const userMsg = message.trim();
    setMessage("");
    setIsSending(true);

    // optimistic user msg
    setChat(prev => ({
      ...prev,
      messages: [
        ...(prev.messages || []),
        { _id: crypto.randomUUID(), role: "user", content: userMsg }
      ]
    }));

    try {
      const res = await api.post("/chat", { message: userMsg });

      const messages = res.data.messages;
      const lastAI = messages[messages.length - 1];

      setChat(prev => ({
        ...prev,
        messages: [
          ...(prev.messages || []),
          { _id: crypto.randomUUID(), role: "assistant", content: lastAI.content }
        ]
      }));

    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      setChat(prev => ({
        ...prev,
        messages: [
          ...(prev.messages || []),
          {
            _id: crypto.randomUUID(),
            role: "assistant",
            content: "AI error. Please try again."
          }
        ]
      }));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages?.map(m => (
          <div key={m._id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className="flex gap-2 max-w-[70%]">
              <div className="w-8 h-8 flex items-center justify-center border rounded-full">
                {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`px-3 py-2 rounded-lg ${m.role === "user" ? "bg-indigo-600 text-white" : "bg-white border"}`}>
                {m.content}
              </div>
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex gap-2 text-gray-400">
            <Loader2 className="animate-spin" size={16} /> AI thinking...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-3 border-t flex gap-2">
        <textarea
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          className="flex-1 border rounded-lg p-2"
          placeholder="Ask something..."
        />
        <button onClick={send} disabled={isSending} className="bg-indigo-600 text-white px-4 rounded-lg">
          {isSending ? <Loader2 className="animate-spin" /> : <Send />}
        </button>
      </div>
    </div>
  );
}
