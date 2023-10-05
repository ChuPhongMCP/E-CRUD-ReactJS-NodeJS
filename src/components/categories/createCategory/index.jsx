import React, { memo, useCallback, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  actionCreateCategory,
  actionResetCreateCategory,
} from "store/categories/createCategory/action";
import "./createCategory.css";
import { MESSAGE_TYPE } from "constants/index";

function CreateCategory(props) {
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const [createFrom] = Form.useForm();

  const resCreateCategory = useSelector((state) => state.createCategoryReducer);

  const onFinish = useCallback(
    async (values) => {
      try {
        dispatch(actionCreateCategory(values));
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
    if (resCreateCategory.payload.message) {
      onShowMessage(resCreateCategory.payload.message, MESSAGE_TYPE.SUCCESS);

      dispatch(actionResetCreateCategory());
    }
  }, [onShowMessage, dispatch, resCreateCategory]);

  return (
    <>
      {contextHolder}

      {resCreateCategory.isLoading && (
        <div className="loadingContainer">
          <div className="loadingIcon"></div>
        </div>
      )}

      <div className="add_product">THÊM DANH MỤC</div>

      <Form
        form={createFrom}
        className=""
        name="Create Category"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên danh mục" },
            { max: 100, message: "Tối đa 100 ký tự" },
          ]}
        >
          <Input />
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
            THÊM DANH MỤC
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default memo(CreateCategory);
