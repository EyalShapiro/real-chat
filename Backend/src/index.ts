import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { MessageType } from "./types/messageType";

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const io = new Server(httpServer, {
	cors: {
		origin: FRONTEND_URL,
		methods: ["GET", "POST"],
	},
});

app.use(express.json());

app.post("/connect", (req, res) => {
	const { message } = req.body;
	console.log("Message from frontend:", message);
	res.status(200).send({ message: "Hello from server!" });
});

io.on("connection", (socket) => {
	console.log("A user connected");

	socket.on("chat message", (msg: MessageType) => {
		console.log(`${msg.user}: ${msg.text}`);
		io.emit("chat message", msg);
	});

	socket.on("disconnect", () => {
		console.log("A user disconnected");
	});
});

httpServer.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
