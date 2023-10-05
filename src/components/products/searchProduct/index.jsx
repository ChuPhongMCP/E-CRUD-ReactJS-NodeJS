import React, { memo, useCallback, useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { actionGetAllSupplier } from "store/suppliers/getAllSuppliers/action";
import { convertOptionSelect } from "helper";
import "./searchProduct.css";
import { MESSAGE_TYPE } from "constants/index";
import { actionLargeSearchProduct } from "store/products/largeSearchProduct/action";
import { useNavigate } from "react-router-dom";
import { LOCATIONS } from "constants";
import { actionGetAllCategory } from "store/categories/getAllCategory/action";

function SearchProduct(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  const onFinish = useCallback(
    async (values) => {
      if (
        !values.name &&
        !values.supplierId &&
        !values.categoryId &&
        !values.priceStart &&
        !values.priceEnd
      ) {
        onShowMessage("Vui lòng nhập gì đó để tìm kiếm", MESSAGE_TYPE.WARNING);
      } else {
        try {
          dispatch(actionLargeSearchProduct(values));

          navigate(LOCATIONS.RESULT_SEARCH_PRODUCT);
        } catch (error) {
          console.log("««««« error »»»»»", error);
        }
      }
    },
    [dispatch, navigate, onShowMessage]
  );

  return (
    <>
      {contextHolder}

      {resCreateProduct.isLoading && (
        <div className="loadingContainer">
          <div className="loadingIcon"></div>
        </div>
      )}

      <div className="add_product">TÌM KIẾM SẢN PHẨM</div>

      <Form
        form={createFrom}
        className=""
        name="Search Product"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        onFinish={onFinish}
      >
        <Form.Item label="Nhà cung cấp" name="supplierId">
          <Select options={convertOptionSelect(suppliers)} />
        </Form.Item>

        <Form.Item label="Danh mục sản phẩm" name="categoryId">
          <Select options={convertOptionSelect(categories)} />
        </Form.Item>

        <Form.Item
          label="Tên sản phẩm"
          name="name"
          rules={[{ max: 50, message: "Tối đa 50 ký tự" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá bắt đầu"
          name="priceStart"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Vui lòng nhập giá bắt đầu từ 0 trở lên",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const priceEnd = getFieldValue("priceEnd");
                if (priceEnd === undefined || priceEnd >= value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    new Error("Giá bắt đầu phải nhỏ hơn hoặc bằng giá kết thúc")
                  );
                }
              },
            }),
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Giá kết thúc"
          name="priceEnd"
          rules={[
            {
              type: "number",
              min: 0,
              message: "Vui lòng nhập giá kết thúc từ 0 trở lên",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const priceStart = getFieldValue("priceStart");
                if (priceStart === undefined || priceStart <= value) {
                  return Promise.resolve();
                } else {
                  return Promise.reject(
                    new Error("Giá kết thúc phải lớn hơn hoặc bằng giá bắt đầu")
                  );
                }
              },
            }),
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button className="btn_add_product" type="primary" htmlType="submit">
            TÌM KIẾM
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default memo(SearchProduct);
