import axios from "axios";

 const axiosInstance = axios.create({
    // baseURL: "http://127.0.0.1:5001/clone-70221/us-central1/api",
    baseURL: "https://amazon-api-deploy-2025-crdg.onrender.com",
});
    export default axiosInstance;