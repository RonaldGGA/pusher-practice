import MessageInput from "@/app/components/message-input";
import MessagesSpace from "@/app/components/messages-space";
import prisma from "@/utils/prismadb";
import React from "react";

interface PageProps {
  params: {
    roomId: string;
  };
}

const roomIdPage = async ({ params }: PageProps) => {
  const { roomId } = params;
  const existingMessages = await prisma.message.findMany({
    where: {
      chatRoomId: roomId,
    },
  });
  const serializedMessages = existingMessages.map((message) => ({
    id: message.id,
    text: message.body,
  }));

  return (
    <div className="flex flex-col gap-5 max-w-[700px] mx-auto mt-5 w-[90%]">
      {roomId}
      <br />
      <MessagesSpace roomId={roomId} initialItems={serializedMessages} />
      <MessageInput roomId={roomId} />
    </div>
  );
};

export default roomIdPage;
