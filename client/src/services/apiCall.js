import axios from "axios";

export const commonRequest = async (method, url, body, headers) => {
  let config = {
    method: method,
    url: url,
    headers: headers || {
      "Content-Type": "application/json",
    },
    data: body || {},
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Something went wrong");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error("Error setting up request");
    }
  }
};
