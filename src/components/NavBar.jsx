import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav style={navStyle}>
            <ul style={ulStyle}>
                <NavItem to="/movie/showAll/1" emoji="🎬" label="영화" />
                <NavItem to="/theater/showAll/1" emoji="🎭" label="극장" />
                <NavItem to="/screening/showAll/1" emoji="🎥" label="상영관" />
                <NavItem to="/profile" emoji="👤" label="프로필" />
            </ul>
        </nav>
    );
};

const NavItem = ({ to, emoji, label }) => (
    <li style={liStyle}>
        <NavLink
            to={to}
            style={({ isActive }) => isActive ? activeLinkStyle : linkStyle}
        >
            <span style={emojiStyle}>{emoji}</span>
            <span style={textStyle}>{label}</span>
        </NavLink>
    </li>
);

// 스타일 정의
const navStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    backgroundColor: "#fff",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    padding: "10px 0",
    zIndex: 1000,
};

const ulStyle = {
    display: "flex",
    justifyContent: "space-around",
    listStyle: "none",
    padding: 0,
    margin: 0,
};

const liStyle = {
    textAlign: "center",
};

const linkStyle = {
    textDecoration: "none",
    color: "#555",
    fontSize: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
};

const activeLinkStyle = {
    ...linkStyle,
    color: "#007bff",
    fontWeight: "bold",
};

const emojiStyle = {
    fontSize: "20px",
};

const textStyle = {
    marginTop: "2px",
};

export default NavBar;
