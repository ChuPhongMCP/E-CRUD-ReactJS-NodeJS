import React, { memo, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import numeral from "numeral";
import "numeral/locales/vi";

import "./productDetail.css";
import { LOCATIONS } from "constants/index";
import { actionGetProductDetail } from "store/products/getProductDetail/action";
import { actionGetProductImage } from "store/products/getProductImage/action";
import { actionGetProductSmallImage } from "store/products/getProductSmallImage/action";
import Loading from "components/loading";
import UploadImageProduct from "../uploadImageProduct";
import { Modal } from "antd";

numeral.locale("vi");

function ProductDetail() {
  window.scrollTo(0, 0);
  const params = useParams();
  const dispatch = useDispatch();

  const resGetProductDetail = useSelector(
    (state) => state.getProductDetailReducer
  );

  const resGetProductImage = useSelector(
    (state) => state.getProductImageReducer
  );

  const resGetProductSmallImage = useSelector(
    (state) => state.getProductSmallImageReducer
  );

  const [product, setProduct] = useState({});
  const [imageURL, setImageURL] = useState({});
  const [smallImageURL, setSmallImageURL] = useState([]);
  const [editModalUpdateVisible, setEditModalUpdateVisible] = useState(false);

  const getProductDetail = useCallback(() => {
    dispatch(actionGetProductDetail(params.id));
  }, [dispatch, params.id]);

  const getProductImage = useCallback(() => {
    dispatch(actionGetProductImage(params.id));
  }, [dispatch, params.id]);

  const getProductSmallImage = useCallback(() => {
    dispatch(actionGetProductSmallImage(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    getProductDetail();
  }, [getProductDetail]);

  useEffect(() => {
    getProductImage();
  }, [getProductImage]);

  useEffect(() => {
    getProductSmallImage();
  }, [getProductSmallImage]);

  useEffect(() => {
    setProduct(resGetProductDetail.payload.payload);
  }, [resGetProductDetail]);

  useEffect(() => {
    if (
      resGetProductImage.payload.payload &&
      resGetProductImage.payload.payload.location
    ) {
      const imageUrl = resGetProductImage.payload.payload.location.replace(
        /\\/g,
        "/"
      );

      setImageURL(imageUrl);
    }
  }, [resGetProductImage]);

  useEffect(() => {
    let imageSmallUrls = [];
    if (
      resGetProductSmallImage.payload.payload &&
      resGetProductSmallImage.payload.payload.length > 0
    ) {
      imageSmallUrls = resGetProductSmallImage.payload.payload.map((item) => {
        return item.location.replace(/\\/g, "/");
      });
      setSmallImageURL(imageSmallUrls);
    }
  }, [resGetProductSmallImage]);

  const onFinish = useCallback(() => {
    dispatch(actionGetProductImage(params.id));
    dispatch(actionGetProductSmallImage(params.id));

    setEditModalUpdateVisible(false);
  }, [dispatch, params.id]);

  const handleClickBtnUpdate = useCallback(() => {
    setEditModalUpdateVisible(true);
  }, []);

  const renderSmallImage = useCallback(() => {
    const arrImg = [];

    if (!resGetProductSmallImage.isLoading) {
      smallImageURL.forEach((item, index) => {
        arrImg.push(
          <div key={index} className="mini_img">
            <div className="mini_img_in">
              <img src={item} className="product_thumbail" alt="..." />
            </div>
          </div>
        );
      });
    } else {
      for (let i = 0; i < 4; i++) {
        arrImg.push(
          <div key={i} className="mini_img">
            <div className="mini_img_in">
              <Loading />
            </div>
          </div>
        );
      }
    }

    return arrImg;
  }, [resGetProductSmallImage, smallImageURL]);

  const renderStar = useCallback(() => {
    const arrStar = [];
    for (let i = 0; i < 4; i++) {
      arrStar.push(
        <div key={i} className="star">
          <img
            src={require("assets/img/star.jpg")}
            className="d-block w-100"
            alt="..."
          />
        </div>
      );
    }

    arrStar.push(
      <div key={4} className="star">
        <img
          src={require("assets/img/grayStar.jpg")}
          className="d-block w-100"
          alt="..."
        />
      </div>
    );
    return arrStar;
  }, []);

  return (
    <div className="container">
      <div className="cover_title_link">
        <Link className="link" to={LOCATIONS.PRODUCTS}>
          Products
        </Link>
        / {resGetProductDetail.isLoading ? <Loading /> : product?.name}
      </div>

      <div className="cover_content_product_detail">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-2 col-xl-2 custom_col custom_mini_img">
            <div className="cover_mini_img">{renderSmallImage()}</div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-5 col-xl-5 custom_col">
            <div className="cover_large_img">
              {resGetProductDetail.isLoading ? (
                <div className="cover_discount_none"></div>
              ) : (
                <div className="cover_discount">
                  <div className="discount">-{product?.discount}%</div>
                </div>
              )}

              {resGetProductImage.isLoading ? (
                <Loading />
              ) : (
                <img src={imageURL} className="large_img" alt="..." />
              )}
            </div>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-5 col-xl-5 custom_col">
            <div className="product_name">
              {resGetProductDetail.isLoading ? <Loading /> : product?.name}
            </div>

            <div className="cover_evaluate_stock">
              <div className="cover_evaluate">
                <div className="cover_star">{renderStar()}</div>

                <div className="cover_num_evaluate">
                  {resGetProductDetail.isLoading ? (
                    <Loading />
                  ) : (
                    "(150 Reviews)"
                  )}
                </div>
              </div>

              <div className="cover_stock">
                <div className="space">|</div>

                <div className="stock">
                  {resGetProductDetail.isLoading ? (
                    <Loading />
                  ) : (
                    `Stock: ${product?.stock}`
                  )}
                </div>
              </div>
            </div>

            <div className="cover_price">
              <div className="discounted_price">
                {resGetProductDetail.isLoading ? (
                  <Loading />
                ) : (
                  `${numeral(product?.discountedPrice).format("0,0")}`
                )}
              </div>

              <div className="price">
                {resGetProductDetail.isLoading ? (
                  <Loading />
                ) : (
                  numeral(product?.price).format("0,0")
                )}
              </div>
            </div>

            <div className="description">
              {resGetProductDetail.isLoading ? (
                <Loading />
              ) : (
                product?.description
              )}
            </div>

            <hr className="decoration" />

            <div className="cover_btn_upload">
              <button
                type="button"
                onClick={handleClickBtnUpdate}
                className={`btn btn-danger ${
                  resGetProductDetail.isLoading
                    ? "btn_upload_none"
                    : "btn_upload"
                } `}
              >
                UPDATE HÌNH ẢNH
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={editModalUpdateVisible}
        centered
        title="Update Hình Ảnh"
        onCancel={() => {
          setEditModalUpdateVisible(false);
        }}
        footer={null}
      >
        <UploadImageProduct onFinish={onFinish} productId={params.id} />
      </Modal>
    </div>
  );
}

export default memo(ProductDetail);
