import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Post from "./components/Post";
import { db, auth } from "./firebase";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import ImgUpload from "./components/ImgUpload";

// import Stories from "./components/Stories";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			position: "absolute",
			width: 400,
			backgroundColor: theme.palette.background.paper,
			border: "2px solid #000",
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	})
);

function App() {
	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);
	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				console.log(authUser);
				setUser(authUser);
			} else {
				setUser(null);
			}
		});
		return () => {
			unsubscribe();
		};
	}, [user, username]);

	//useEffect-> Runs a piece of code based on a specific condition

	useEffect(() => {
		//this is where the code runs
		db.collection("posts").onSnapshot((snapshot) => {
			//every time a new post is added , this code fires...
			setPosts(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					post: doc.data(),
				}))
			);
		});
	}, []);

	const signUp = (event) => {
		event.preventDefault();

		auth
			.createUserWithEmailAndPassword(email, password)
			.then((authUser) => {
				return authUser.user.updateProfile({
					displayName: username,
				});
			})
			.catch((error) => alert(error.message));

		setOpen(false);
	};

	const signIn = (event) => {
		event.preventDefault();

		auth
			.signInWithEmailAndPassword(email, password)
			.catch((error) => alert(error.message));

		setOpenSignIn(false);
	};

	return (
		<div className="app">
			<Header />
			<div className="applog-btn">
				{user ? (
					<Button onClick={() => auth.signOut()}>Logout</Button>
				) : (
					<div className="appsign-btns">
						<Button className="sin-btn" onClick={() => setOpenSignIn(true)}>
							Sign In
						</Button>
						<Button className="sout-btn" onClick={() => setOpen(true)}>
							Sign Up
						</Button>
					</div>
				)}
			</div>

			{user?.displayName ? (
				<ImgUpload username={user.displayName} />
			) : (
				<h3>Sorry you need to login to upload</h3>
			)}

			<Modal open={open} onClose={() => setOpen(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form className="app-signup">
						<center>
							<img
								className="header-logo"
								src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
								alt=""
							/>
						</center>

						<Input
							placeholder="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Input
							placeholder="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Button onClick={signUp}>Sign Up</Button>
					</form>
				</div>
			</Modal>

			<Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form className="app-signup">
						<center>
							<img
								className="header-logo"
								src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
								alt=""
							/>
						</center>

						<Input
							placeholder="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Button onClick={signIn}>Sign In</Button>
					</form>
				</div>
			</Modal>

			{posts.map(({ id, post }) => (
				<Post
					key={id}
					postId={id}
					user={user}
					username={post.username}
					caption={post.caption}
					imageUrl={post.imageUrl}
				/>
			))}

			<Footer />
		</div>
	);
}

export default App;
