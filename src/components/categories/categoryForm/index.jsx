import React, { memo } from "react";
import { Form, Input, Button } from "antd";

function CategoryForm(props) {
  const {
    isHiddenSubmit,
    formName,
    form,
    optionStyle,
    onFinish,
  } = props;

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
        label="Tên danh mục"
        name="name"
        rules={[
          { required: true, message: "Vui lòng nhập tên danh mục" },
          { max: 50, message: "Tối đa 50 ký tự" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Mô tả" name="description">
        <Input />
      </Form.Item>

      {!isHiddenSubmit && (
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            THÊM DANH MỤC
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}

export default memo(CategoryForm);
