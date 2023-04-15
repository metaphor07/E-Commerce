import React, { useState } from "react";
import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { useSelector } from "react-redux";

const ProductList = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    getProducts(dispatch);
  }, []);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 230 },
    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img src={params.row.img} alt="" className="productListImg" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 100 },
    { field: "price", headerName: "Price", width: 180 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </NavLink>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableRowSelectionOnClick
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default ProductList;
