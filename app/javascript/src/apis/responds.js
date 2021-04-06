import axios from "axios";
import { RESPONDS_URL } from "./utils";

const create = (payload) => axios.post(RESPONDS_URL, payload);

const respondsApi = {
  create,
};

export default respondsApi;
