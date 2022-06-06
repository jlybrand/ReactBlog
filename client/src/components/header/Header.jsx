import React from "react";
import "./header.css"

export default function Header() {
  const publicFolder = "http://localhost:5000/images/";
  return (
    <div className="header">
      <div className="header-titles">
        <span className="header-lg">Musion</span>
      </div>
      <img
        className="headerImg"
        src={`${publicFolder}/purple-rock.jpeg`}
        alt=""
      />
    </div>
  )
}
