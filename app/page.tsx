"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [theRoomId, setRoomId] = useState<string>("");

  const createChatRoom = async () => {
    axios
      .post("/api/rooms/create", {
        data: {},
      })
      .then((res) => {
        const roomId: string = res.data.id;
        // console.log(res);
        // console.log({ RESDATA: res.data });
        router.push(`/rooms/${roomId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleJoinRoom = () => {
    router.push(`/rooms/${theRoomId}`);
    setRoomId("");
  };
  return (
    <div>
      <div className="flex w-full justify-around p-5 items-center">
        <button
          onClick={createChatRoom}
          className="p-3 bg-neutral-300 rounded hover:bg-gray-400 transition"
        >
          Create Chat Room
        </button>
        <div>
          <label htmlFor="input">Join Chat Room</label>
          <input
            id="input"
            className="w-full max-w-[500px] border rounded p-2 focus:outline-gray-500"
            onChange={({ target }) => setRoomId(target.value)}
          />
          <button
            onClick={handleJoinRoom}
            className="p-2 bg-gray-300 hover:bg-gray-400 transition px-5 rounded-md mt-2"
          >
            Join
          </button>
        </div>
      </div>
      );
    </div>
  );
}
