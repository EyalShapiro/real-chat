import { useState } from "react";
import Chat from "./components/Chat";
import Registration from "./components/Registration";
import styled from "styled-components";

function App() {
	const [username, setUsername] = useState<string | null>(null);
	const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

	const handleLogout = () => {
		setUsername(null);
	};

	if (!username) {
		return <Registration setUsername={setUsername} />;
	}

	return (
		<>
			<UsernameDisplayContainer>
				<span>{username}</span>
				<button className="logout" onClick={handleLogout}>
					Logout
				</button>
			</UsernameDisplayContainer>
			<Chat username={username} serverUrl={SERVER_URL} />
		</>
	);
}

export default App;

const UsernameDisplayContainer = styled.div`
	position: absolute;
	right: 40px;
	top: 40px;
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 10px;
	font-size: 16px;
	font-weight: bold;
	color: white;
	background-color: #333;
	border: 1px solid #ccc;
	border-radius: 5px;
	padding: 10px 20px;
	& span {
		color: white;
		&:hover {
			color: lightcyan;
		}
	}
	& button.logout {
		padding: 5px 10px;
		background-color: #f44336;
		color: white;
		border: none;
		border-radius: 5px;
		cursor: pointer;

		&:hover {
			background-color: #d32f2f;
		}
	}
`;
