import { Table } from "antd";
import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import numeral from "numeral";
import "numeral/locales/vi";

import { LOCATIONS } from "constants/index";
import { useSelector } from "react-redux";

numeral.locale("vi");

function ResultSearchProduct() {
  const resMiniSearchProducts = useSelector(
    (state) => state.miniSearchProductReducer.payload
  );
  const resLargeSearchProducts = useSelector(
    (state) => state.largeSearchProductReducer.payload
  );

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await JSON.parse(
        localStorage.getItem("MINI_SEARCH_RESULT")
      );
      setProducts(result);
    }
    fetchData();
  }, [resMiniSearchProducts, resLargeSearchProducts]);

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
  ];

  return (
    <>
      <div className="container product_list">
        <div className="row">
          <div className="col-12">KẾT QUẢ TÌM KIẾM</div>
        </div>
      </div>
      <Table
        rowKey="_id"
        columns={columns}
        dataSource={products}
        pagination={true}
      />
    </>
  );
}

export default memo(ResultSearchProduct);
