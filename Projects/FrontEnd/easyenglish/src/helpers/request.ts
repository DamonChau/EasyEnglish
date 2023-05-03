/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { config } from "./contants";

const requests = (options: any) => {
  const token = "";
  const client = axios.create({
    baseURL: config.url.API_URL,
    timeout: 100,
    headers: { Authorization: `${token}` },
  });

  const onSuccess = (response: any) => {
    console.debug("Request Successful!", [response]);
    return response.data;
  };

  const onError = (error: any) => {
    console.error("Request Failed:", error.config);
    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      console.error("Error Message:", error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options).then(onSuccess).catch(onError);
};

export default requests;
