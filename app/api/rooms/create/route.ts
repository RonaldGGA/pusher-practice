"use server";

import prisma from "@/utils/prismadb";
import { pusherServer } from "@/utils/pusher";
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    const newRoom = await prisma.chatRoom.create({
      data: {},
    });

    return NextResponse.json(newRoom);
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 500 });
  }
};
