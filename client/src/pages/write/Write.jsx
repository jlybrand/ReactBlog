import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import './write.css'

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async(e) => {
    e.preventDefault();

    const newPost = {
      username: user.username,
      title,
      desc
    }

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace(`/posts/${res.data._id}`);
    } catch (err) {}
  };

  return (
    <div className="write">
    {file && (
      <img className="write-img" src={URL.createObjectURL(file)} alt=""/>
      )}
      
      <form className="write-form" onSubmit={handleSubmit}>
        <div className="write-form-row">
          <label htmlFor="file-input">
            <i className="write-icon fas fa-plus"></i>
          </label>
          <input 
            type="file" 
            id="file-input" 
            style={{ display: "none" }} 
            onChange={(e) => setFile(e.target.files[0])}  
            />
          <input
            className="write-input"
            type="text"
            placeholder="Title"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="write-form-row">
          <textarea
            className="write-input write-text"
            placeholder="Share your insight..."
            type="text"
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className="write-submit" type="submit">Publish</button>
      </form>
    </div>
  );
}


