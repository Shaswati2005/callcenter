const WebSocket = require("ws");
const express = require("express");
const { WaveFile } = require("wavefile");
const app = express();
const wavefile = require("wavefile").WaveFile;
const server = require("http").createServer(app);

const wss = new WebSocket.Server({ server });

let assembly;
let chunks = [];
const SAMPLE_RATE = 6000;

wss.on("connection", function connection(ws) {
  console.log("New Websocket Initiated");

  ws.on("message", function incoming(message) {
    if (!assembly) {
      return console.error("AssemblyAI websocket must be initialized");
    }
    const msg = JSON.parse(message);
    switch (msg.event) {
      case "connected":
        console.log("A new call has connected.");
        assembly.onerror = console.error;
        const texts = {};
        assembly.onmessage = (assemblyMsg) => {
          const res = JSON.parse(assemblyMsg.data);
          text[res.audio_start] = res.text;
          const keys = Object.keys(texts);
          keys.sort((a, b) => a - b);
          let msg = "";
          for (const key of keys) {
            if (texts[key]) {
              msg += `${texts[key]}`;
            }
          }
          console.log(msg);
        };
        break;
      case "start":
        console.log(`Starting Media Stream ${msg.streamSid}`);
        break;
      case "media":
        console.log("Recieving Audio");
        const twiliodata = msg.media.payload;
        let wav = new WaveFile();

        wav.fromScratch(1, 6000, "8m", Buffer.from(twiliodata, "base64"));

        wav.fromMuLaw();

        const twilio64encoded = wav.toDataURI().split("base64,")[1];

        const twilioAudioBuffer = Buffer.from(twilio64encoded, "base64");
        chunks.push(twilioAudioBuffer.slice(44));

        if (chunks.length >= 5) {
          const audioBuffer = Buffer.concat(chunks);
          const encodedAudio = audioBuffer.toString("base64");
          assembly.send(JSON.stringify({ audio_data: encodedAudio }));
          chunks = [];
        }
        break;
      case "stop":
        console.log("Call has ended");
        assembly.send(JSON.stringify({ terminate_session: true }));
        break;
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", async (req, res) => {
  assembly = new WebSocket(
    `wss://api.assemblyai.com/v2/realtime/ws?sample_rate=${SAMPLE_RATE}`,
    {
      headers: {
        authorization: "e8139f7e88ed450284ccfc1abec8c01e",
      },
    }
  );
  res.set("Content-Type", "text/xml");
  res.send(`
            <Response>
                <Start>
                    <Stream url='wss://${req.headers.host}'/>
                </Start>
                <Say>
                 Start speaking to see your transcribed in the console
                </Say>
                <Pause length='30'/>
            </Response>
        `);
});

console.log("Listening at port 8080");
server.listen(8080);
