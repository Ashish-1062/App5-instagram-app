import React from "react";
import "./Header.css";
import Stories from "./Stories";

function Header() {
	return (
		<div className="header">
			<img
				className="header-logo"
				src="https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png"
				alt=""
			></img>
			<Stories />
		</div>
	);
}

export default Header;
