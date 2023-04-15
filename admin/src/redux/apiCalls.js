import { publicRequest, userRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
} from "./productRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

// get all products
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("products");
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};

// Add Product
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    console.log("inside api call");
    const res = await userRequest.post("products", product);
    console.log(res.data);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};

// Delete products
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // await userRequest.delete(`products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};
