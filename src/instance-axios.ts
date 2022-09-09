import Axios from "axios";

const cancelToken = Axios.CancelToken.source();
const instance = Axios.create({
  baseURL: "http://localhost:3001/post",
  cancelToken: cancelToken.token,
});
const instance_user = Axios.create({ baseURL: "http://localhost:3001/user" });
export { cancelToken, instance, instance_user };
