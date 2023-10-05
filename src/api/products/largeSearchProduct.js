/* eslint-disable import/no-anonymous-default-export */
import { axiosAdmin } from "helper/axios";

const largeSearchProduct = async (value) => {
    localStorage.setItem('MINI_SEARCH_RESULT', JSON.stringify([]));
    
    const url = `/products/search`;

    const response = await axiosAdmin.post(url, value);


    localStorage.setItem('MINI_SEARCH_RESULT', JSON.stringify(response.data.payload));

    return {
        ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
    };
}

export default {
    largeSearchProduct,
};