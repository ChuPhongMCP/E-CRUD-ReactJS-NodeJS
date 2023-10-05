import React, { memo, useCallback, useEffect, useState } from "react";
import { Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { actionMiniSearchProduct } from "store/products/miniSearchProduct/action";

import { LOCATIONS, MESSAGE_TYPE } from "constants/index";
import "./search.css";
import { fuzzySearch } from "helper";

function ToSearch(props) {
  const { keySearchs } = props;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const { Search } = Input;

  const [values, setValues] = useState();
  const [suggest, setSuggest] = useState([]);
  const [keySearch, setKeySearch] = useState([]);

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

  const onSearch = (value, _e, _info) => {
    if (value) {
      dispatch(actionMiniSearchProduct(value));

      navigate(LOCATIONS.RESULT_SEARCH_PRODUCT);
    } else {
      onShowMessage("Nhập vào gì đó để tìm kiếm!", MESSAGE_TYPE.SUCCESS);
    }
  };

  const onChange = (e) => {
    const value = e.target.value;
    setValues(value);
  };

  useEffect(() => {
    const getData = setTimeout(() => {
      if (values) {
        const keyWork = keySearchs.filter((item) => {
          const searchRegex = fuzzySearch(values); // Replace 'values' with the text you want to search for
          return searchRegex.test(item.keyWork);
        });

        setKeySearch(keyWork);
      } else {
        setKeySearch([]);
      }
    }, 100);

    return () => {
      clearTimeout(getData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    let suggest = [];

    if (keySearch.length > 0) {
      keySearch.forEach((item, index) => {
        suggest.push(
          <span key={index} className="suggest">
            <Link
              className="link_suggest"
              to={`${LOCATIONS.PRODUCTS}/suggestResult/${item.keyWork}`}
            >
              {item.keyWork}
            </Link>
          </span>
        );
      });
    } else {
      suggest.push(<div key={"x"}></div>);
    }

    setSuggest(suggest);
  }, [keySearch]);

  return (
    <>
      {contextHolder}

      <div className="cover_nimi_search">
        <Search
          placeholder="Nhập tên sản phẩm"
          enterButton
          size="large"
          onSearch={onSearch}
          onChange={onChange}
        />

        <div className="cover_suggest">{suggest}</div>
      </div>
    </>
  );
}
export default memo(ToSearch);
