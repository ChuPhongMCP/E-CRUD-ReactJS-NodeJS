import React, { memo, useCallback, useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { actionGetAllSupplier } from "store/suppliers/getAllSuppliers/action";
import { convertOptionSelect } from "helper";
import {
  actionCreateProduct,
  actionResetCreateProduct,
} from "store/products/createProduct/action";
import "./createProduct.css";
import { MESSAGE_TYPE } from "constants/index";
import { actionGetAllCategory } from "store/categories/getAllCategory/action";

function CreateProduct(props) {
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const [createFrom] = Form.useForm();

  const resGetAllSuppliers = useSelector(
    (state) => state.supplierReducer.payload
  );
  const resGetAllCategories = useSelector(
    (state) => state.categoriesReducer.payload
  );
  const resCreateProduct = useSelector((state) => state.createProductReducer);

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const getSuppliers = useCallback(() => {
    dispatch(actionGetAllSupplier());
  }, [dispatch]);

  const getCategories = useCallback(() => {
    dispatch(actionGetAllCategory());
  }, [dispatch]);

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

  const onFinish = useCallback(
    async (values) => {
      try {
        dispatch(actionCreateProduct(values));
      } catch (error) {
        console.log("««««« error »»»»»", error);
      }
    },
    [dispatch]
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

  useEffect(() => {
    if (resCreateProduct.payload.message) {
      onShowMessage(
        resCreateProduct.payload.message,
        MESSAGE_TYPE.SUCCESS
      );

      dispatch(actionResetCreateProduct());
    }
  }, [onShowMessage, dispatch, resCreateProduct]);

  return (
    <>
      {contextHolder}

      {resCreateProduct.isLoading && (
        <div className="loadingContainer">
          <div className="loadingIcon"></div>
        </div>
      )}

      <div className="add_product">THÊM SẢN PHẨM</div>

      <Form
        form={createFrom}
        className=""
        name="Create Product"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Nhà cung cấp"
          name="supplierId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn nhà cung cấp",
            },
          ]}
        >
          <Select options={convertOptionSelect(suppliers)} />
        </Form.Item>

        <Form.Item
          label="Danh mục sản phẩm"
          name="categoryId"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn danh mục",
            },
          ]}
        >
          <Select options={convertOptionSelect(categories)} />
        </Form.Item>

        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên sản phẩm" },
            { max: 50, message: "Tối đa 50 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá gốc"
          name="price"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Vui lòng nhập giá gốc từ 0 trở lên",
            },
            { required: true, message: "Vui lòng nhập giá gốc" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Chiết khấu (%)"
          name="discount"
          rules={[
            {
              type: "number",
              min: 0,
              max: 75,
              message: "Vui lòng nhập giảm giá từ 0 đến 75",
            },
            { required: true, message: "Vui lòng nhập giảm giá" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Tồn kho"
          name="stock"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Vui lòng nhập tồn kho lớn hơn hoặc bằng 0",
            },
            { required: true, message: "Vui lòng nhập tồn kho" },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            { required: true, message: "Vui lòng nhập mô tả" },
            { max: 500, message: "Tối đa 500 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button className="btn_add_product" type="primary" htmlType="submit">
            THÊM SẢN PHẨM
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default memo(CreateProduct);
