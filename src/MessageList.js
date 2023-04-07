import React, { useState } from "react";
import Pusher from "pusher-js";
import { useAuth } from "./AuthProvider";

export default function MessageList() {
    const [messages, setMessages] = useState([]);
    const { token } = useAuth();

    const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
        cluster: process.env.REACT_APP_PUSHER_CLUSTER,
        authEndpoint: "https://candidate.yewubetsalone.com/api/pusher/auth",
        auth: {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    });

    const channel = pusher.subscribe("private-my-channel");

    channel.bind("client-my-event", function (data) {
        setMessages((messages) => [...messages, data.message]);
    });

    return (
        <ul>
            {messages.map((message, index) => (
                <li key={index}>{message}</li>
            ))}
        </ul>
    );
}