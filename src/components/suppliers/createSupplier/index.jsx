import React, { memo, useCallback, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import {
  actionCreateSupplier,
  actionResetCreateSupplier,
} from "store/suppliers/createSupplier/action";
import "./createSupplier.css";
import { MESSAGE_TYPE } from "constants/index";

function CreateSupplier(props) {
  const dispatch = useDispatch();

  const [messageApi, contextHolder] = message.useMessage();

  const [createFrom] = Form.useForm();

  const resCreateSupplier = useSelector((state) => state.createSupplierReducer);

  const onFinish = useCallback(
    async (values) => {
      try {
        dispatch(actionCreateSupplier(values));
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
    if (resCreateSupplier.payload.message) {
      onShowMessage(resCreateSupplier.payload.message, MESSAGE_TYPE.SUCCESS);

      dispatch(actionResetCreateSupplier());
    }
  }, [onShowMessage, dispatch, resCreateSupplier]);

  const phoneNumberRegex =
    /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

  const validatePhoneNumber = (_rule, value) => {
    return new Promise((resolve, reject) => {
      if (value && !value.match(phoneNumberRegex)) {
        reject("Vui lòng nhập số điện thoại hợp lệ");
      } else {
        resolve();
      }
    });
  };

  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

  const validateEmail = (_rule, value) => {
    return new Promise((resolve, reject) => {
      if (value && !value.match(emailRegex)) {
        reject("Vui lòng nhập email hợp lệ");
      } else {
        resolve();
      }
    });
  };

  return (
    <>
      {contextHolder}

      {resCreateSupplier.isLoading && (
        <div className="loadingContainer">
          <div className="loadingIcon"></div>
        </div>
      )}

      <div className="add_product">THÊM NHÀ CUNG CẤP</div>

      <Form
        form={createFrom}
        className=""
        name="Create Supplier"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 10 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Tên Nhà Cung Cấp"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập tên nhà cung cấp" },
            { max: 100, message: "Tối đa 100 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { validator: validateEmail },
            { max: 50, message: "Tối đa 50 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Vui lòng nhập phoneNumber" },
            { validator: validatePhoneNumber },
            { max: 50, message: "Tối đa 50 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Địa Chỉ"
          name="address"
          rules={[
            { required: true, message: "Vui lòng nhập địa chỉ nhà cung cấp" },
            { max: 500, message: "Tối đa 500 ký tự" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button className="btn_add_product" type="primary" htmlType="submit">
            THÊM NHÀ CUNG CẤP
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default memo(CreateSupplier);
