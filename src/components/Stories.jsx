import React from "react";
import "./Stories.css";
import Avatar from "@material-ui/core/Avatar";

function Stories() {
	return (
		<div className="story-avatar">
			<Avatar
				className="post-avatar"
				alt="Super-car"
				src="/static/images/avatar/1.jpg"
				style={{ backgroundColor: "steelblue" }}
			/>
			<Avatar
				className="post-avatar"
				alt="BUGGATI"
				src="/static/images/avatar/1.jpg"
				style={{ backgroundColor: "black" }}
			/>
			<Avatar
				className="post-avatar"
				alt="AUDI"
				src="/static/images/avatar/1.jpg"
				style={{ backgroundColor: "Red" }}
			/>
			<Avatar
				className="post-avatar"
				alt="BMW"
				src="/static/images/avatar/1.jpg"
				style={{ backgroundColor: "black" }}
			/>
		</div>
	);
}

export default Stories;
