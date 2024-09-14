import axios from "axios";

export const getAllProduct = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/product/get-all`
  );
  return res.data;
};

export const createProduct = async (data) => {
  console.log("datahhh", data);
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/product/create`,
    data
  );
  return res.data;
};

// router.post('/create', productController.createProduct)
// router.put('/update/:id', productController.updateProduct)
// router.get('/details/:id', productController.getDetailsProduct)
// router.delete('/delete/:id', productController.deleteProduct)
// router.get('/get-all', productController.getAllProduct)
