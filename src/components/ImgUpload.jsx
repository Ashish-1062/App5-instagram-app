import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { db, storage } from "../firebase";
import firebase from "firebase";
import "./ImgUpload.css";

function ImgUpload({ username }) {
	const [image, setImage] = useState(null);
	const [progress, setProgress] = useState(0);
	const [caption, setCaption] = useState("");

	const handleChange = (e) => {
		if (e.target.files[0]) {
			setImage(e.target.files[0]);
		}
	};

	const handleUpload = () => {
		const uploadTask = storage.ref(`image/${image.name}`).put(image);
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totelBytes) * 100
				);
				setProgress(progress);
			},
			(error) => {
				//error function
				console.log(error);
				alert(error.message);
			},
			() => {
				storage
					.ref("image")
					.child(image.name)
					.getDownloadURL()
					.then((url) => {
						db.collection("posts").add({
							timestamp: firebase.firestore.FieldValue.serverTimestamp(),
							caption: caption,
							imageUrl: url,
							username: username,
						});
						setProgress(0);
						setCaption("");
						setImage(null);
					});
			}
		);
	};

	return (
		<div className="img-upload">
			<progress className="imgupload-progress" value={progress} max="100" />
			<input
				className="file-input"
				type="text"
				placeholder="Enter a caption..."
				onChange={(event) => setCaption(event.target.value)}
			/>
			<input className="inp" type="file" onChange={handleChange} />
			<Button onClick={handleUpload}>Upload</Button>
		</div>
	);
}
export default ImgUpload;
