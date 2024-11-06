import PusherServer from "pusher";
import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: "1891838",
  key: "4abf74750a68f5b6b9d4",
  secret: "5334cd48f8c208166dee",
  cluster: "us2",
  useTLS: true,
});

export const pusherClient = new PusherClient("4abf74750a68f5b6b9d4", {
  channelAuthorization: {
    endpoint: "/api/pusher/auth",
    transport: "ajax",
  },
  cluster: "us2",
});
