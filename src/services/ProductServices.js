import axios from "axios";
import { axiosJWT } from "./UserServices";

export const getAllProduct = async (search) => {
  console.log("search", search);
  let res = {};
  if (search.length) {
    res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?filter=name&filter=${search}`
    );
  } else {
    console.log("1111");
    res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all`);
  }

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

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/product/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllTypeProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all-type`
  );
  return res.data;
};

export const getProductType = async (type) => {
  if (type) {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/product/get-all?filter=type&filter=${type}`
    );
    return res.data;
  }
};

// router.post('/create', productController.createProduct)
// router.put('/update/:id', productController.updateProduct)
// router.get('/details/:id', productController.getDetailsProduct)
// router.delete('/delete/:id', productController.deleteProduct)
// router.get('/get-all', productController.getAllProduct)
// router.get("/get-all-type", productController.getAllType);
