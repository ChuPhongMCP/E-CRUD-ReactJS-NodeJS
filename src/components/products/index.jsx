import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Space,
  Table,
  message,
  Pagination,
  Modal,
  Button,
  Form,
  Popconfirm,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import numeral from "numeral";
import "numeral/locales/vi";

import { LOCATIONS } from "constants/index";
import ProductForm from "./productForm";
import ToSearch from "components/products/miniSearchProduct";
import { actionGetAllProducts } from "store/products/getAllProducts/action";
import { actionGetAllSupplier } from "store/suppliers/getAllSuppliers/action";
import {
  actionResetUpdateProduct,
  actionUpdateProduct,
} from "store/products/updateProduct/action";
import {
  actionDeleteProduct,
  actionResetDeleteProduct,
} from "store/products/deleteProduct/action";
import { MESSAGE_TYPE } from "constants/index";
import "./products.css";
import { actionGetAllCategory } from "store/categories/getAllCategory/action";
import { actionGetAllKeySearch } from "store/keySearchs/getAllKeySearchs/action";

numeral.locale("vi");

function Products() {
  const dispatch = useDispatch();

  const [updateForm] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const resGetAllProducts = useSelector(
    (state) => state.productsReducer.payload
  );
  const resUpdateProducts = useSelector(
    (state) => state.updateProductReducer.payload
  );
  const resDeleteProducts = useSelector(
    (state) => state.deleteProductReducer.payload
  );

  const resGetAllSuppliers = useSelector(
    (state) => state.supplierReducer.payload
  );

  const resGetAllCategories = useSelector(
    (state) => state.categoriesReducer.payload
  );

  const resGetAllKeySearch = useSelector(
    (state) => state.keySearchReducer.payload
  );

  const defaultPagination = {
    total: resGetAllProducts.total,
    page: resGetAllProducts.page,
    pageSize: resGetAllProducts.pageSize,
  };

  const [products, setProducts] = useState([]);
  const [keySearchs, setKeySearchs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pagination, setPagination] = useState(defaultPagination);
  const [paginationForIndex, setPaginationForIndex] =
    useState(defaultPagination);

  const onSelectProduct = useCallback(
    (data) => () => {
      setEditModalVisible(true);

      setSelectedProduct(data);

      updateForm.setFieldsValue(data);
    },
    [updateForm]
  );

  const onShowMessage = useCallback(
    (content, type) => {
      messageApi.open({
        className: "antdMessage",
        type: type,
        content: content,
        duration: 3,
      });
    },
    [messageApi]
  );

  const onDeleteProduct = useCallback(
    (productId) => async () => {
      try {
        dispatch(actionDeleteProduct(productId));
      } catch (error) {
        console.log("««««« error »»»»»", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (resDeleteProducts.message) {
      onShowMessage(resDeleteProducts.message, MESSAGE_TYPE.SUCCESS);

      dispatch(actionResetDeleteProduct());
    }
  }, [resDeleteProducts.message, onShowMessage, dispatch]);

  const onEditFinish = useCallback(
    async (values) => {
      try {
        dispatch(actionUpdateProduct(selectedProduct._id, values));

        updateForm.resetFields();

        setEditModalVisible(false);
      } catch (error) {
        console.log("««««« error »»»»»", error);
      }
    },
    [dispatch, selectedProduct?._id, updateForm]
  );

  useEffect(() => {
    if (resUpdateProducts.message) {
      onShowMessage(resUpdateProducts.message, MESSAGE_TYPE.SUCCESS);

      dispatch(actionResetUpdateProduct());
    }
  }, [resUpdateProducts.message, onShowMessage, dispatch]);

  const getProducts = useCallback(() => {
    dispatch(actionGetAllProducts(pagination));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pagination.page, resUpdateProducts, resDeleteProducts]);

  const onChangePage = useCallback((page, pageSize) => {
    setPagination((prev) => ({
      ...prev,
      page,
      pageSize,
    }));
  }, []);

  const getSuppliers = useCallback(() => {
    dispatch(actionGetAllSupplier());
  }, [dispatch]);

  const getCategories = useCallback(() => {
    dispatch(actionGetAllCategory());
  }, [dispatch]);

  const getKeySearchs = useCallback(() => {
    dispatch(actionGetAllKeySearch());
  }, [dispatch]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  useEffect(() => {
    getKeySearchs();
  }, [getKeySearchs]);

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    setSuppliers(resGetAllSuppliers.payload);
  }, [resGetAllSuppliers]);

  useEffect(() => {
    setCategories(resGetAllCategories.payload);
  }, [resGetAllCategories]);

  useEffect(() => {
    setProducts(resGetAllProducts.payload);

    setPagination((prev) => ({
      ...prev,
      total: resGetAllProducts.total,
      page: resGetAllProducts.page,
      pageSize: resGetAllProducts.pageSize,
    }));

    setPaginationForIndex((prev) => ({
      ...prev,
      page: resGetAllProducts.page,
      pageSize: resGetAllProducts.pageSize,
    }));

    // window.scrollTo(0, 0);
  }, [resGetAllProducts]);

  useEffect(() => {
    async function fetchData() {
      const result = await JSON.parse(
        localStorage.getItem("KEY_SEARCH")
      );
      setKeySearchs(result);
    }
    fetchData();
  }, [resGetAllKeySearch]);

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      key: "no",
      width: "1%",
      render: function (text, record, index) {
        return (
          <span>
            {index +
              1 +
              (paginationForIndex.pageSize * paginationForIndex.page -
                paginationForIndex.pageSize)}
          </span>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => (
        <Link to={`${LOCATIONS.PRODUCTS}/${record._id}`}>{text}</Link>
      ),
    },
    {
      title: "Giá gốc",
      dataIndex: "price",
      key: "price",
      render: (text, record) => <span>{numeral(text).format("0,0")} VNĐ</span>,
    },
    {
      title: "Chiết khấu",
      dataIndex: "discount",
      key: "discount",
      render: (text) => <span>{text || 0} %</span>,
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      width: "5%",
    },
    {
      title: "Giá bán",
      dataIndex: "discountedPrice",
      key: "discountedPrice",
      render: (text, r) => <span>{numeral(text).format("0,0")} VNĐ</span>,
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (text, record) => <span>{record.category.name}</span>,
    },
    {
      title: "Nhà cung cấp",
      dataIndex: "supplier",
      key: "supplier",
      render: (text, record) => <span>{record.supplier.name}</span>,
    },
    {
      title: "Hành động",
      key: "actions",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={onSelectProduct(record)}
            />

            <Popconfirm
              title="Bạn chắc muốn xóa không"
              okText="Đồng ý"
              cancelText="Hủy"
              onConfirm={onDeleteProduct(record._id)}
            >
              <Button danger type="dashed" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      {contextHolder}
      <div className="container product_list">
        <div className="row">
          <div className="col-12">DANH SÁCH SẢN PHẨM</div>
        </div>
        <div className="row">
          <div className="col-6"></div>
          <div className="col-6">
            <ToSearch keySearchs={keySearchs} />
          </div>
        </div>
      </div>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={products}
        pagination={false}
      />

      <Pagination
        defaultCurrent={1}
        total={pagination.total}
        pageSize={process.env.REACT_APP_DEFAULT_LIMIT}
        onChange={onChangePage}
        current={pagination.page}
      />

      <Modal
        open={editModalVisible}
        centered
        title="Cập nhật thông tin"
        onCancel={() => {
          setEditModalVisible(false);
        }}
        cancelText="Đóng"
        okText="Lưu"
        onOk={() => {
          updateForm.submit();
        }}
      >
        <ProductForm
          form={updateForm}
          suppliers={suppliers}
          categories={categories}
          onFinish={onEditFinish}
          formName="update-product"
          isHiddenSubmit
        />
      </Modal>
    </>
  );
}

export default memo(Products);
