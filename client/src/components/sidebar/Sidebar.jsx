import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import './sidebar.css';

export default function Sidebar() {
  const { user } = useContext(Context);
  const [categories, setCategories] = useState([]);
  const publicFolder = "http://localhost:5000/images/";

  // router.get("/:id", async (req, res) => {
  //   try {
  //     const user = await User.findById(req.params.id);
  //     const {password, ...credentials} = user._doc;
  //     res.status(200).json(credentials);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // })

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    };

    // const getAuthor = async () => {
    //   const res = await axios.get("/users");
    //   setAuthor(res.data);
    // };

    getCategories();
  }, [])
  return (
    <div className="sidebar">
      {user && <div className="sidebar-item">
        <span className="sidebar-title">ABOUT ME</span>
        <img
        // should be authors profilePic ??? 
          src={`${publicFolder}${user.profilePic}`}
          alt=""
        />
        {/* should be author specific info below */}
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>}
      <div className="sidebar-item">
        <span className="sidebar-title">CATEGORIES</span>
        {categories.map((cat, i) => (
          <ul key={i} className="sidebar-list">{cat.name}</ul>
        ))}


      </div>
      <div className="sidebar-item">
        <span className="sidebar-title">FOLLOW US</span>
        <div className="sidebar-social">
          <i className="sidebar-icon fab fa-facebook-square"></i>
          <i className="sidebar-icon fab fa-instagram-square"></i>
          <i className="sidebar-icon fab fa-pinterest-square"></i>
          <i className="sidebar-icon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  )

}