import React, { memo } from "react";
import { Form, Input, Button } from "antd";

function SupplierForm(props) {
  const { isHiddenSubmit, formName, form, optionStyle, onFinish } = props;

  const phoneNumberRegex =
    /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

  const validatePhoneNumber = (_rule, value) => {
    return new Promise((resolve, reject) => {
      if (!value.match(phoneNumberRegex)) {
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
      if (!value.match(emailRegex)) {
        reject("Vui lòng nhập email hợp lệ");
      } else {
        resolve();
      }
    });
  };

  return (
    <Form
      form={form}
      className=""
      name={formName}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={optionStyle}
      onFinish={onFinish}
    >
      <Form.Item
        label="Tên Nhà Cung Cấp"
        name="name"
        rules={[
          { required: true, message: "Vui lòng nhập tên nhà cung cấp" },
          { max: 50, message: "Tối đa 50 ký tự" },
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

      {!isHiddenSubmit && (
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            THÊM NHÀ CUNG CẤP
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}

export default memo(SupplierForm);
