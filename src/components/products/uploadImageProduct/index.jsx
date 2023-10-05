import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import { LOCATIONS, MESSAGE_TYPE } from "constants/index";

import "./upload.css";
import { axiosAdminUpFile } from "helper/axios";

function UploadImageProduct(props) {
  const navigate = useNavigate();

  const token = localStorage.getItem("TOKEN");

  useEffect(() => {
    if (token) {
      //nếu tồn tại token trên localStorage
      axiosAdminUpFile.defaults.headers.Authorization = `Bearer ${token}`; //gán trạng thái đã xác nhận login lên header theo quy phạm từ BE
    } else {
      //nếu không tồn tại token trên localStorage
      navigate(LOCATIONS.LOGIN); //chuyển hướng về trang login
    }
  }, [navigate, token]);

  const { onFinish, productId } = props;

  const [messageApi, contextHolder] = message.useMessage();

  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [currentItem, setCurrentItem] = useState(1);

  const fileInputRef = useRef(null);

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

  const handleUpload = useCallback(async () => {
    if (files.length === 0) {
      onShowMessage("Không có ảnh nào được chọn", MESSAGE_TYPE.WARNING);
      return;
    }

    if (files.length > 4) {
      onShowMessage("Chỉ có thể chọn tối đa 4 hình ảnh", MESSAGE_TYPE.WARNING);
      return;
    }

    if (currentItem === 1) {
      const fd = new FormData();
      for (let i = 0; i < files.length; i++) {
        fd.append("image", files[i]);
      }
      const url = `/mediaS3/upload-single/${productId}`;
      try {
        const res = await axiosAdminUpFile.post(url, fd);

        onShowMessage(res.data.message, MESSAGE_TYPE.SUCCESS);
      } catch (err) {
        console.log("««««« err »»»»»", err);
      }
    } else if (currentItem === 2) {
      const fd = new FormData();
      for (let i = 0; i < files.length; i++) {
        fd.append("images", files[i]);
      }

      const url = `/mediaS3/upload-multiple/${productId}`;

      await axiosAdminUpFile
        .post(url, fd)
        .then((response) => {
          console.log(response.data);
          onShowMessage(response.data.message, MESSAGE_TYPE.SUCCESS);
        })
        .catch((err) => {
          console.log("««««« err »»»»»", err.response);
          onShowMessage("Upload Ảnh Thất Bại", MESSAGE_TYPE.ERROR);
        });
    } else {
      onShowMessage("Upload Ảnh Thất Bại", MESSAGE_TYPE.ERROR);
    }

    onFinish();
  }, [currentItem, files, onFinish, onShowMessage, productId]);

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    if (selectedFilesArray.length === 0) {
      setImagePreviews([]);
      setFiles([]);
      return;
    }

    setFiles(selectedFilesArray);

    // Generate image previews
    const previews = [];

    for (let i = 0; i < selectedFilesArray.length; i++) {
      const file = selectedFilesArray[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        previews.push(e.target.result);
        if (previews.length === selectedFilesArray.length) {
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onSelectItem = useCallback((event) => {
    setCurrentItem(parseInt(event.target.value));
  }, []);

  useEffect(() => {
    setImagePreviews([]);
    setFiles([]);
    fileInputRef.current.value = "";
  }, [currentItem]);

  return (
    <>
      {contextHolder}
      <div className="container">
        <div className="row">
          <div className="col-12 cover_upload">
            <div className="cover_menu_bar">
              <button
                value={1}
                onClick={onSelectItem}
                type="button"
                className={`btn btn-danger ${
                  currentItem === 1 ? "tag_bar" : "tag_bar_none"
                }`}
              >
                Up Ảnh Lớn
              </button>
              <button
                value={2}
                onClick={onSelectItem}
                type="button"
                className={`btn btn-danger ${
                  currentItem === 2 ? "tag_bar" : "tag_bar_none"
                }`}
              >
                Up Các Ảnh Nhỏ
              </button>
            </div>

            {currentItem === 1 ? (
              <>
                <div className="info_upload">Chọn 1 hình ảnh</div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="form-control input_file"
                  ref={fileInputRef}
                />
              </>
            ) : (
              <>
                <div className="info_upload">Chọn tối đa 4 hình ảnh</div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                  className="form-control input_file"
                  ref={fileInputRef}
                />
              </>
            )}

            <div className="cover_image_previews">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="cover_image_preview">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="d-block w-100 image_preview"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="btn btn-danger btn_confirm_upload"
              onClick={handleUpload}
            >
              XÁC NHẬN
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(UploadImageProduct);
