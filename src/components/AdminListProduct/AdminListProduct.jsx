import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import * as ProductServices from "../../services/ProductServices";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminListProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const user = useSelector((state) => state?.user);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    countInStock: "",
    rating: "",
    description: "",
  });
  const [stateProductDetail, setStateProductDetail] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    countInStock: "",
    rating: "",
    description: "",
  });
  const [form] = Form.useForm();

  const mutation = useMutationHooks((data) => {
    const { name, image, type, price, countInStock, rating, description } =
      data;
    const res = ProductServices.createProduct({
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
    });
    return res;
  });

  const mutationUpdate = useMutationHooks((data) => {
    console.log("data___", data);
    const { id, token, ...rests } = data;
    const res = ProductServices.updateProduct(id, token, { ...rests });
    return res;
  });

  const getAllProduct = async () => {
    const res = await ProductServices.getAllProduct();
    return res;
  };

  const { data, isPending, isSuccess, isError } = mutation;
  const {
    data: dataUpdated,
    isPending: isPendingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;

  console.log("dataUpdated", dataUpdated);

  const queryAllProduct = useQuery({
    queryKey: ["product"],
    queryFn: getAllProduct,
  });

  const { isPending: isLoadingProduct, data: listProduct } = queryAllProduct;

  const fetchGetDetailsProduct = async (rowSelected) => {
    // const res = await axios.get(
    //   `http://localhost:3002/api/product/details/${rowSelected}`
    // );
    const res = await ProductServices.getDetailsProduct(rowSelected);
    console.log("Product details fetched successfully:", res);
    if (res?.data) {
      setStateProductDetail({
        name: res.data.name,
        image: res.data.image,
        type: res.data.type,
        price: res.data.price,
        countInStock: res.data.countInStock,
        rating: res.data.rating,
        description: res.data.description,
      });
    }
  };

  useEffect(() => {
    if (rowSelected) {
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected]);

  useEffect(() => {
    // form.setFieldValue(stateProductDetail);
    form.setFieldsValue(stateProductDetail);
  }, [form, stateProductDetail]);

  console.log("firsthuy", stateProductDetail);

  const handleDetailsProduct = () => {
    if (rowSelected.length) {
      fetchGetDetailsProduct(rowSelected);
    }
    setIsOpenDrawer(true);
  };

  const renderAction = () => {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <EditOutlined
          style={{ color: "#32CD32", fontSize: "25px", marginRight: "30px" }}
          onClick={handleDetailsProduct}
        />
        <DeleteOutlined style={{ color: "#FF6347", fontSize: "25px" }} />
      </div>
    );
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "", // "Action"
      dataIndex: "action",
      render: renderAction,
    },
  ];

  const dataTable = listProduct?.data.map((product) => {
    return { ...product, key: product._id };
  });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessUpdated && dataUpdated?.status === "OK") {
      message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);

  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      image: "",
      type: "",
      price: "",
      countInStock: "",
      rating: "",
      description: "",
    });
    // form.resetFields();
  };

  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetail({
      name: "",
      image: "",
      type: "",
      price: "",
      countInStock: "",
      rating: "",
      description: "",
    });
    form.resetFields();
  };

  const onFinish = () => {
    mutation.mutate(stateProduct, {
      onSettled: () => {
        queryAllProduct.refetch();
      },
    });
  };

  const handleOnchange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnchangeDetail = (e) => {
    setStateProductDetail({
      ...stateProductDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    console.log("file.preview", file.preview);
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  const handleOnChangeAvatarDetail = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    console.log("file.preview", file.preview);
    setStateProductDetail({
      ...stateProductDetail,
      image: file.preview,
    });
  };

  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...stateProductDetail,
      },
      {
        onSettled: () => {
          queryAllProduct.refetch();
        },
      }
    );
  };

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "12px",
            borderStyle: "dotted",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined style={{ fontSize: "50px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "15px" }}>
        <TableComponent
          columns={columns}
          data={dataTable}
          isLoading={isLoadingProduct}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              }, // click row
              // onDoubleClick: (event) => {}, // double click row
              // onContextMenu: (event) => {}, // right button click row
              // onMouseEnter: (event) => {}, // mouse enter row
              // onMouseLeave: (event) => {}, // mouse leave row
            };
          }}
        />
      </div>
      <Modal
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Loading isPending={isPending}>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 20,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            autoComplete="on"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct?.name}
                onChange={handleOnchange}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input your type!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct?.type}
                onChange={handleOnchange}
                name="type"
              />
            </Form.Item>

            <Form.Item
              label="Count instock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Please input your count inStock!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct?.countInStock}
                onChange={handleOnchange}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct?.price}
                onChange={handleOnchange}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Please input your rating!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct?.rating}
                onChange={handleOnchange}
                name="rating"
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct?.description}
                onChange={handleOnchange}
                name="description"
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please input your image!",
                },
              ]}
            >
              <WrapperUploadFile onChange={handleOnChangeAvatar} maxCount={1}>
                <Button>Upload</Button>
                {stateProduct?.image && (
                  <img
                    src={stateProduct?.image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </Modal>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="80%"
      >
        <Loading isPending={isPending}>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onUpdateProduct}
            autoComplete="on"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetail.name}
                onChange={handleOnchangeDetail}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input your type!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetail.type}
                onChange={handleOnchangeDetail}
                name="type"
              />
            </Form.Item>

            <Form.Item
              label="Count instock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Please input your count inStock!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetail.countInStock}
                onChange={handleOnchangeDetail}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetail.price}
                onChange={handleOnchangeDetail}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Please input your rating!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetail.rating}
                onChange={handleOnchangeDetail}
                name="rating"
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetail.description}
                onChange={handleOnchangeDetail}
                name="description"
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please input your image!",
                },
              ]}
            >
              <WrapperUploadFile
                onChange={handleOnChangeAvatarDetail}
                maxCount={1}
              >
                <Button>Upload</Button>
                {stateProductDetail?.image && (
                  <img
                    src={stateProductDetail?.image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Apply
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
    </div>
  );
};

export default AdminListProduct;
