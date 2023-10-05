/* eslint-disable import/no-anonymous-default-export */
import { axiosAdmin } from "helper/axios";

const miniSearchProduct = async (value) => {
    localStorage.setItem('MINI_SEARCH_RESULT', JSON.stringify([]));
    
    const url = `/products/search?name=${value}`;

    const response = await axiosAdmin.get(url);


    localStorage.setItem('MINI_SEARCH_RESULT', JSON.stringify(response.data.payload));

    return {
        ...response.data, //tạo ra một đối tượng mới bao gồm dữ liệu từ phản hồi (response.data)
    };
}

export default {
    miniSearchProduct,
};