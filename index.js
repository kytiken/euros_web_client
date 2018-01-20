import { Socket } from 'phoenix/assets/js/phoenix';
let socket = new Socket("ws://localhost:32781/socket", {params: {userToken: "123"}})
socket.connect()
let channel = socket.channel("desk:lobby", {token: "hoge"})
channel.on("crawl", msg => console.log("Got message", msg) )
setInterval(() => {
  channel.push("crawl", {url: "https://euros-test.blogspot.jp/"}, 10000)
    .receive("ok", (msg) => console.log("created message", msg) )
    .receive("error", (reasons) => console.log("create failed", reasons) )
    .receive("timeout", () => console.log("Networking issue...") )
}, 10000)

channel.join()
  .receive("ok", ({messages}) => console.log("catching up", messages) )
  .receive("error", ({reason}) => console.log("failed join", reason) )
  .receive("timeout", () => console.log("Networking issue. Still waiting..."))
