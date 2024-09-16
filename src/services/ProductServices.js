import axios from "axios";
import { axiosJWT } from "./UserServices";

export const getAllProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all`
  );
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/create`,
    data
  );
  return res.data;
};

export const getDetailsProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/details/${id}`
  );
  return res.data;
};

export const updateProduct = async (id, access_token, data) => {
  console.log("check", id, access_token, data);
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/product/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

// router.post('/create', productController.createProduct)
// router.put('/update/:id', productController.updateProduct)
// router.get('/details/:id', productController.getDetailsProduct)
// router.delete('/delete/:id', productController.deleteProduct)
// router.get('/get-all', productController.getAllProduct)
