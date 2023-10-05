import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table, message, Modal, Button, Form, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import numeral from "numeral";
import "numeral/locales/vi";

import SupplierForm from "./supplierForm";
import {
  actionResetUpdateSupplier,
  actionUpdateSupplier,
} from "store/suppliers/updateSupplier/action";
import {
  actionDeleteSupplier,
  actionResetDeleteSupplier,
} from "store/suppliers/deleteSupplier/action";
import { MESSAGE_TYPE } from "constants/index";
import "./suppliers.css";
import { actionGetAllSupplier } from "store/suppliers/getAllSuppliers/action";

numeral.locale("vi");

function Suppliers() {
  const dispatch = useDispatch();

  const [updateForm] = Form.useForm();

  const [messageApi, contextHolder] = message.useMessage();

  const resUpdateSupplier = useSelector(
    (state) => state.updateSupplierReducer.payload
  );
  const resDeleteSupplier = useSelector(
    (state) => state.deleteSupplierReducer.payload
  );

  const resGetAllSuppliers = useSelector(
    (state) => state.supplierReducer.payload
  );

  const [suppliers, setSuppliers] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const onSelectSupplier = useCallback(
    (data) => () => {
      setEditModalVisible(true);

      setSelectedSupplier(data);

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

  const onDeleteSupplier = useCallback(
    (supplierId) => async () => {
      try {
        dispatch(actionDeleteSupplier(supplierId));
      } catch (error) {
        console.log("««««« error »»»»»", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (resDeleteSupplier.message) {
      onShowMessage(resDeleteSupplier.message, MESSAGE_TYPE.SUCCESS);

      dispatch(actionResetDeleteSupplier());
    }
  }, [resDeleteSupplier.message, onShowMessage, dispatch]);

  const onEditFinish = useCallback(
    async (values) => {
      try {
        dispatch(actionUpdateSupplier(selectedSupplier._id, values));

        updateForm.resetFields();

        setEditModalVisible(false);
      } catch (error) {
        console.log("««««« error »»»»»", error);
      }
    },
    [dispatch, selectedSupplier?._id, updateForm]
  );

  useEffect(() => {
    if (resUpdateSupplier.message) {
      onShowMessage(resUpdateSupplier.message, MESSAGE_TYPE.SUCCESS);

      dispatch(actionResetUpdateSupplier());
    }
  }, [resUpdateSupplier.message, onShowMessage, dispatch]);

  const getSuppliers = useCallback(() => {
    dispatch(actionGetAllSupplier());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, resUpdateSupplier, resDeleteSupplier]);

  useEffect(() => {
    getSuppliers();
  }, [getSuppliers]);

  useEffect(() => {
    setSuppliers(resGetAllSuppliers.payload);
  }, [resGetAllSuppliers]);

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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa Chỉ",
      dataIndex: "address",
      key: "address",
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
              onClick={onSelectSupplier(record)}
            />

            <Popconfirm
              title="Bạn chắc muốn xóa không"
              okText="Đồng ý"
              cancelText="Hủy"
              onConfirm={onDeleteSupplier(record._id)}
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
          <div className="col-12">DANH SÁCH NHÀ CUNG CẤP</div>
        </div>
      </div>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={suppliers}
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
        <SupplierForm
          form={updateForm}
          onFinish={onEditFinish}
          formName="update-Supplier"
          isHiddenSubmit
        />
      </Modal>
    </>
  );
}

export default memo(Suppliers);
