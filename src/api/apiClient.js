import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

/**
 * Generic API request function
 *
 * @param {string} method - HTTP method (get, post, put, patch, delete)
 * @param {string} url - endpoint or full URL
 * @param {Object} [data] - request body (for POST, PUT)
 * @param {Object} [params] - query parameters
 * @returns {Promise<any>}
 */
export const apiRequest = async ({ method = "get", url, data = {}, params = {} }) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    console.error("❌ API Error:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || error.message);
    throw error.response?.data || { message: "Something went wrong" };
  }
};
