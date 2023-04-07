import axios from "axios";

const api = axios.create({
    baseURL: "https://candidate.yewubetsalone.com/api",
});

export default api;