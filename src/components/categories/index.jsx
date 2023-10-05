import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table, message, Modal, Button, Form, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import numeral from "numeral";
import "numeral/locales/vi";

import CategoryForm from "./categoryForm";
import {
  actionResetUpdateCategory,
  actionUpdateCategory,
} from "store/categories/updateCategory/action";
import {
  actionDeleteCategory,
  actionResetDeleteCategory,
} from "store/categories/deleteCategory/action";
import { MESSAGE_TYPE } from "constants/index";
import "./categories.css";
import { actionGetAllCategory } from "store/categories/getAllCategory/action";

numeral.locale("vi");

function Categories() {
  const dispatch = useDispatch();

  const [updateForm] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const resUpdateCategory = useSelector(
    (state) => state.updateCategoryReducer.payload
  );
  const resDeleteCategory = useSelector(
    (state) => state.deleteCategoryReducer.payload
  );

  const resGetAllCategories = useSelector(
    (state) => state.categoriesReducer.payload
  );

  const [categories, setCategories] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const onSelectCategory = useCallback(
    (data) => () => {
      setEditModalVisible(true);

      setSelectedCategory(data);

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

  const onDeleteCategory = useCallback(
    (productId) => async () => {
      try {
        dispatch(actionDeleteCategory(productId));
      } catch (error) {
        console.log("««««« error »»»»»", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (resDeleteCategory.message) {
      onShowMessage(resDeleteCategory.message, MESSAGE_TYPE.SUCCESS);

      dispatch(actionResetDeleteCategory());
    }
  }, [resDeleteCategory.message, onShowMessage, dispatch]);

  const onEditFinish = useCallback(
    async (values) => {
      try {
        dispatch(actionUpdateCategory(selectedCategory._id, values));

        updateForm.resetFields();

        setEditModalVisible(false);
      } catch (error) {
        console.log("««««« error »»»»»", error);
      }
    },
    [dispatch, selectedCategory?._id, updateForm]
  );

  useEffect(() => {
    if (resUpdateCategory.message) {
      onShowMessage(resUpdateCategory.message, MESSAGE_TYPE.SUCCESS);

      dispatch(actionResetUpdateCategory());
    }
  }, [resUpdateCategory.message, onShowMessage, dispatch]);

  const getCategories = useCallback(() => {
    dispatch(actionGetAllCategory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, resUpdateCategory, resDeleteCategory]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  useEffect(() => {
    setCategories(resGetAllCategories.payload);
  }, [resGetAllCategories]);

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      key: "no",
      width: "1%",
      render: function (text, record, index) {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={onSelectCategory(record)}
            />

            <Popconfirm
              title="Bạn chắc muốn xóa không"
              okText="Đồng ý"
              cancelText="Hủy"
              onConfirm={onDeleteCategory(record._id)}
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
          <div className="col-12">DANH SÁCH DANH MỤC</div>
        </div>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={categories}
        pagination={true}
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
        <CategoryForm
          form={updateForm}
          onFinish={onEditFinish}
          formName="update-category"
          isHiddenSubmit
        />
      </Modal>
    </>
  );
}

export default memo(Categories);
