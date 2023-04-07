import React from "react";
import { AuthProvider } from "./AuthProvider";
import MessageForm from "./MessageForm";
import MessageList from "./MessageList";

function App() {
  return (
    <AuthProvider>
      <MessageForm />
      <MessageList />
    </AuthProvider>
  );
}

export default App;