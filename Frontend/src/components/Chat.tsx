import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { connectToServer } from "../api/connectToServer";
import { MessageType } from "../types/messageType";
import styled from "styled-components";

interface ChatProps {
	username: string;
	serverUrl: string;
}

export default function Chat({ username, serverUrl }: ChatProps) {
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [input, setInput] = useState("");

	const socket = io(serverUrl);

	useEffect(() => {
		const initializeChat = async () => {
			try {
				const response = await connectToServer(username);
				console.log("Server response:", response);

				socket.on("chat message", (msg: MessageType) => {
					setMessages((prevMessages) => [...prevMessages, msg]);
				});
			} catch (error) {
				console.error("Error connecting to server:", error);
			}
		};

		initializeChat();

		return () => {
			socket.off("chat message");
		};
	}, [serverUrl, username, socket]);

	const sendMessage = async () => {
		if (input.trim()) {
			socket.emit("chat message", { user: username, text: input });
			setMessages((prevMessages) => [...prevMessages, { user: username, text: input }]);
			setInput("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<ChatContainer>
			<MessagesContainer aria-live="polite">
				{messages.map((msg, index) => (
					<Message key={index} isUserMessage={msg.user === username}>
						<UserName isUserMessage={msg.user === username}>{msg.user}</UserName>
						{msg.text}
					</Message>
				))}
			</MessagesContainer>
			<InputContainer>
				<TextArea
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Type a message"
					aria-label="Type your message"
				/>
				<SendButton onClick={sendMessage}>Send</SendButton>
			</InputContainer>
		</ChatContainer>
	);
}

const ChatContainer = styled.div`
	min-width: 600px;
	margin: 0 auto;
	padding: 20px;
	background-color: darkslategray;
	border-radius: 10px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	position: relative;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	width: 60vw;
	height: 80vh;
`;

const MessagesContainer = styled.div`
	overflow-y: auto;
	flex-grow: 1;
	margin-bottom: 20px;
	padding-bottom: 60px; /* Ensure space for the input field */
`;

const Message = styled.div<{ isUserMessage: boolean }>`
	padding: 10px;
	margin: 5px 0;
	background-color: ${({ isUserMessage }) => (isUserMessage ? "#d4f8d4" : "#e3f2fd")};
	color: ${({ isUserMessage }) => (isUserMessage ? "green" : "blue")};
	border-radius: 5px;
	max-width: 70%;
	word-wrap: break-word;
`;

const UserName = styled.strong<{ isUserMessage: boolean }>`
	display: block;
	font-weight: bold;
	color: ${({ isUserMessage }) => (isUserMessage ? "green" : "blue")};
	margin-bottom: 5px;
`;

const InputContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	border-top: 1px solid #ccc;
	width: 100%;
`;

const TextArea = styled.textarea`
	width: 80%;
	padding: 10px;
	font-size: 1rem;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin-right: 10px;
	color: black;
	background: white;
	resize: none;
	min-height: 40px;
`;

const SendButton = styled.button`
	padding: 10px 20px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;

	&:hover {
		background-color: #0056b3;
	}
`;
