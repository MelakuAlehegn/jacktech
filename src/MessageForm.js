import React, { useState } from "react";
import { useMutation } from "react-query";
import { useAuth } from "./AuthProvider";
import api from "./api";

export default function MessageForm() {
    const [message, setMessage] = useState("");
    const { token, login } = useAuth();

    const messageMutation = useMutation(
        (data) => api.post("/send-message", data, { headers: { Authorization: `Bearer ${token}` } }),
        {
            onSuccess: () => {
                setMessage("");
            },
        }
    );

    const authMutation = useMutation(
        () => api.post("/auth/signin", { phone: 251922494913, password: "123456" }),
        {
            onSuccess: (response) => {
                login(response.data);
            },
        }
    );

    function handleSubmit(event) {
        event.preventDefault();
        messageMutation.mutate({ message });
    }

    if (authMutation.isLoading) {
        return <div>Loading...</div>;
    }

    if (authMutation.isError) {
        return <div>Error: {authMutation.error.message}</div>;
    }

    if (!token) {
        return (
            <form onSubmit={(event) => { event.preventDefault(); authMutation.mutate(); }}>
                <label>
                    Phone:
                    <input type="text" name="phone" />
                </label>
                <label>
                    Password:
                    <input type="password" name="password" />
                </label>
                <button type="submit">Log in</button>
            </form>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type="submit">Send</button>
        </form>
    );
}