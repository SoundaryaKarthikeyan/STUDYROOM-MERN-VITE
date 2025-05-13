import { useEffect, useState } from "react";
import io from "socket.io-client";
import { auth } from "../Firebase/Firebase"; // Firebase auth import

const socket = io("http://localhost:3001");

const Chat = () => {
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const [toUser, setToUser] = useState(""); // Receiver UID

    const currentUser = auth.currentUser;

    useEffect(() => {
        if (currentUser) {
            socket.emit("join", {
                uid: currentUser.uid,
                username: currentUser.email, // or displayName
            });
        }

        socket.on("receive_message", (data) => {
            setChat((prev) => [...prev, data]);
        });

        return () => socket.disconnect();
    }, [currentUser]);

    const sendMessage = () => {
        const newMsg = {
            from: currentUser.uid,
            to: toUser,
            message,
            timestamp: Date.now(),
        };
        socket.emit("send_message", newMsg);
        setChat((prev) => [...prev, newMsg]);
        setMessage("");
    };

    return (
        <div className="chat-box">
            <h2>Chat</h2>
            <input
                type="text"
                placeholder="Recipient UID"
                value={toUser}
                onChange={(e) => setToUser(e.target.value)}
            />
            <div className="chat-messages">
                {chat.map((msg, idx) => (
                    <p key={idx}>
                        <strong>{msg.from === currentUser.uid ? "You" : "Them"}:</strong> {msg.message}
                    </p>
                ))}
            </div>
            <input
                type="text"
                placeholder="Type message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
