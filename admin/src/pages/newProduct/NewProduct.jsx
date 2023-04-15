import React from "react";
import "./newProduct.css";
import { useState } from "react";
import storage from "../../firebase";
import { CircularProgress } from "@mui/material";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const NewProduct = () => {
  const [file, setFile] = useState();
  const [inputs, setInputs] = useState({});
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const dispatch = useDispatch();
  const [uploaded, setUploaded] = useState(false);
  const [progress, setProgress] = useState();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCategories = (e) => {
    setCategories(e.target.value.split(","));
  };
  const handleSizes = (e) => {
    setSize(e.target.value.split(","));
  };
  const handleColors = (e) => {
    setColor(e.target.value.split(","));
  };

  const upload = (item) => {
    const fileName = new Date().getTime() + item.label + item.file.name;
    const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setInputs((prev) => {
            return {
              ...prev,
              [item.label]: url,
              ["categories"]: categories,
              ["size"]: size,
              ["color"]: color,
            };
          });
          setUploaded(!uploaded);
        });
      }
    );
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload({ file: file, label: "img" });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addProduct(inputs, dispatch);
  };
  // console.log(inputs)
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input
            type="text"
            placeholder="man, woman, jeans, shirt"
            onChange={handleCategories}
          />
        </div>
        <div className="addProductItem">
          <label>Sizes</label>
          <input
            type="text"
            placeholder="m, l, xl, xxl"
            onChange={handleSizes}
          />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input
            type="text"
            placeholder="red, black, gray, white"
            onChange={handleColors}
          />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        {uploaded ? (
          <button
            className="addProductButton"
            style={{ "background-color": "green" }}
            onClick={handleClick}
          >
            Create
          </button>
        ) : (
          <button className="addProductButton" onClick={handleUpload}>
            Upload
          </button>
        )}
        {/* <CircularProgress variant="determinate" value={progress} /> */}
      </form>
    </div>
  );
};

export default NewProduct;
