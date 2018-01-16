import { Socket } from 'phoenix/assets/js/phoenix';
let socket = new Socket("ws://localhost:32776/socket", {params: {userToken: "123"}})
socket.connect()
let channel = socket.channel("desk:lobby", {token: "hoge"})
channel.on("new_msg", msg => console.log("Got message", msg) )

channel.join()
  .receive("ok", ({messages}) => console.log("catching up", messages) )
  .receive("error", ({reason}) => console.log("failed join", reason) )
  .receive("timeout", () => console.log("Networking issue. Still waiting..."))
