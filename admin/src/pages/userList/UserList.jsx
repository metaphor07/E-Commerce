import React, { useState } from "react";
import "./userList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { userRows } from "./UserList";
import { NavLink } from "react-router-dom";
export { userRows } from "../../DummyData";

const UserList = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(
      data.filter((e) => {
        return e.id !== id;
      })
    );
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img src={params.row.avatar} alt="" className="userListImg" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 300 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "transaction", headerName: "Transaction", width: 180 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </NavLink>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableRowSelectionOnClick
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default UserList;
