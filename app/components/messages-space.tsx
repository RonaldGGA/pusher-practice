"use client";
import { pusherClient } from "@/utils/pusher";
import React, { useEffect, useState } from "react";

interface MessagesSpace {
  roomId: string;
  initialItems: {
    id: string;
    text: string;
  }[];
}

const MessagesSpace: React.FC<MessagesSpace> = ({ roomId, initialItems }) => {
  const [newMessages, setNewMessages] = useState<string[]>([]);

  useEffect(() => {
    //Create a new chnannel called roomId
    pusherClient.subscribe(roomId);

    //Listen to a channel new update
    pusherClient.bind("new-message", (body: string) => {
      setNewMessages((prev) => [...prev, body]);
    });
    return () => {
      //Clean
      pusherClient.unsubscribe(roomId);
      pusherClient.unbind("new-message");
    };
  }, []);

  return (
    <div className="flex flex-col p-3 gap-2 border rounded text-sm text-gray-800 font-medium">
      {initialItems.map((message) => (
        <p key={message.id}>{message.text}</p>
      ))}
      {newMessages.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  );
};

export default MessagesSpace;
