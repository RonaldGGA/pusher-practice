"use client";

import axios from "axios";
import React, { useState } from "react";

interface MessageInput {
  roomId: string;
}

const MessageInput: React.FC<MessageInput> = ({ roomId }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    axios
      .post(`/api/rooms/${roomId}`, {
        message,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err))
      .finally(() => setMessage(""));
  };
  return (
    <div>
      <input
        type="text"
        onChange={({ target }) => setMessage(target.value)}
        className="border"
        value={message}
      />
      <button onClick={handleSubmit} type="submit">
        Send
      </button>
    </div>
  );
};

export default MessageInput;
