import React from "react";
import "./product.css";
import { NavLink, useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import { productData } from "../../DummyData";
import { Publish } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useMemo } from "react";
import { userRequest } from "../../requestMethods";
import { useEffect } from "react";

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get(`orders/income?pid=${productId}`);
        res.data.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);
  console.log(pStats);
  const product = useSelector((state) =>
    state.product.products.find((p) => p._id === productId)
  );

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <NavLink to="/newproduct">
          <button className="productAddButton">Create</button>
        </NavLink>
      </div>

      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>

        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product?.img} alt="" className="productInfoImg" />
            <span className="productName">{product?.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span
                className="productInfoKey"
                style={{ "margin-right": "20px" }}
              >
                id:
              </span>
              <span className="productInfoValue">{product?._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Price:</span>
              <span className="productInfoValue">{product?.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">true</span>
            </div>
          </div>
        </div>
      </div>

      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" placeholder={product?.title} />
            <label>Description</label>
            <input type="text" placeholder={product?.desc} />
            <label>Price</label>
            <input type="text" placeholder={product?.price} />
            <label>In Stock</label>
            <select name="inStock" id="inStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <label>Active</label>
            <select name="active" id="active">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product?.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish style={{ cursor: "pointer" }} />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
