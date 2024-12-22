import React, { useState } from "react";
import styled from "styled-components";

const Registration = ({ setUsername }: { setUsername: React.Dispatch<React.SetStateAction<string | null>> }) => {
	const [name, setName] = useState("");

	const handleRegister = () => {
		if (!name.trim()) return;

		setUsername(name.trim());
	};

	return (
		<FormContainer
			onSubmit={(e) => {
				e.preventDefault();
				handleRegister();
			}}
		>
			<h2>Enter your name to join the chat</h2>
			<div>
				<input
					type="text"
					placeholder="Your name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					onKeyDown={(event: React.KeyboardEvent) => {
						if (event.key === "Enter") handleRegister();
					}}
				/>
				<button type="submit" disabled={!name.trim()}>
					Join Chat
				</button>
			</div>
		</FormContainer>
	);
};

export default Registration;

const FormContainer = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	text-align: center;
	& input {
		margin: 10px;
		padding: 10px;
		font-size: 1rem;
		border: 1px solid #ccc;
		border-radius: 5px;
		width: 200px;
	}
	& button {
		padding: 10px 20px;
		font-size: 1rem;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;

		&:hover {
			background-color: #0056b3;
		}

		&:disabled {
			background-color: #ccc;
			cursor: not-allowed;
		}
	}
`;
