import { LOCATIONS } from "constants/index";
import React, { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { actionGetMyProfile } from "store/profiles/profile/action";

import "./profile.css";
import { actionGetProfileImage } from "store/profiles/getProfileImage/action";
import Loading from "components/loading";
import { Modal } from "antd";
import UploadImageProfile from "./uploadImageProfile";

function Profile() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //   const isLoadingProfile = useSelector(
  //     (state) => state.profileReducer.isLoading
  //   );
  const [imageURL, setImageURL] = useState({});
  const [profileImage, setProfileImage] = useState({});
  const [profile, setProfile] = useState({});

  const [editModalUpdateVisible, setEditModalUpdateVisible] = useState(false);
  const resGetProfile = useSelector((state) => state.profileReducer.profile);

  const resGetProfileImage = useSelector(
    (state) => state.getProfileImageReducer
  );

  useEffect(() => {
    if (
      localStorage.getItem("TOKEN") !== null &&
      localStorage.getItem("REFRESH_TOKEN") !== null
    ) {
      //nếu tồn tại token trên localStorage
      dispatch(actionGetMyProfile()); //đẩy action actionGetMyProfile lên store
    } else {
      navigate(LOCATIONS.LOGIN);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    setProfile(resGetProfile);
  }, [resGetProfile]);

  const getProfileImage = useCallback(() => {
    if (profile.payload && profile.payload._id) {
      dispatch(actionGetProfileImage(profile.payload._id));
    }
  }, [dispatch, profile]);

  useEffect(() => {
    getProfileImage();
  }, [getProfileImage, profile]);

  useEffect(() => {
    setProfileImage(resGetProfileImage);
  }, [resGetProfileImage]);

  useEffect(() => {
    if (profileImage.profile && profileImage.profile.payload) {
      const imageUrl = profileImage.profile.payload.location.replace(
        /\\/g,
        "/"
      );

      setImageURL(imageUrl);
    }
  }, [profileImage]);

  const onFinish = useCallback(() => {
    dispatch(actionGetProfileImage(profile.payload._id));

    setEditModalUpdateVisible(false);
  }, [dispatch, profile]);

  const handelChangImage = useCallback(() => {
    setEditModalUpdateVisible(true);
  }, []);

  const renderProfileImage = useCallback(() => {
    let img = [];

    if (!resGetProfileImage.isLoading) {
      img.push(
        <img
          key={"x"}
          src={imageURL}
          alt="avatar"
          className="rounded-circle img-fluid"
          style={{ width: 150 }}
        />
      );
    } else {
      img.push(<Loading key={"y"} />);
    }
    return img;
  }, [imageURL, resGetProfileImage.isLoading]);

  return (
    <div style={{ backgroundColor: "#eee" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <nav
              aria-label="breadcrumb"
              className="bg-light rounded-3 p-3 mb-4"
            >
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link to={LOCATIONS.PRODUCTS}>Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  User Profile
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="card mb-4">
              <div className="card-body text-center">
                {renderProfileImage()}
                <h5 className="my-3">{profile.payload?.fullName}</h5>
                <div className="d-flex justify-content-center mb-2">
                  <button type="button" className="btn btn-danger btn_custom">
                    Follow
                  </button>
                  <button
                    onClick={handelChangImage}
                    type="button"
                    className="btn btn-danger ms-1 btn_custom"
                  >
                    Change Image
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Full Name</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {profile.payload?.fullName}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Email</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">{profile.payload?.email}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Phone</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {profile.payload?.phoneNumber}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-sm-3">
                    <p className="mb-0">Address</p>
                  </div>
                  <div className="col-sm-9">
                    <p className="text-muted mb-0">
                      {profile.payload?.address}
                    </p>
                  </div>
                </div>
              </div>
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
        <UploadImageProfile
          onFinish={onFinish}
          profileId={profile.payload?._id}
        />
      </Modal>
    </div>
  );
}

export default memo(Profile);
