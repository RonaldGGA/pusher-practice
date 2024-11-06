"use server";

import prisma from "@/utils/prismadb";
import { pusherServer } from "@/utils/pusher";
import { NextResponse } from "next/server";

interface IParams {
  roomId: string;
}
//Needed the request even if you are not using it
export const GET = async (
  request: Request,
  { params }: { params: IParams }
) => {
  const { roomId } = params;

  try {
    const res = await prisma.message.findMany({
      where: {
        chatRoomId: roomId,
      },
    });
    return NextResponse.json(res, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 500 });
  }
};

export const POST = async (
  request: Request,
  { params }: { params: IParams }
) => {
  const { roomId } = params;

  try {
    const requestBody = await request.json();
    const { message } = requestBody;
    if (!message) {
      return NextResponse.json({}, { status: 404 });
    }
    //We send the message to the roomId channel even before saving it in the db
    pusherServer.trigger(roomId, "new-message", message);

    const res = await prisma.message.create({
      data: {
        body: message,
        chatRoomId: roomId,
      },
    });

    return NextResponse.json(res, { status: 201 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, { status: 500 });
  }
};
