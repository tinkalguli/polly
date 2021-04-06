import axios from "axios";
import { RESPONSES_URL } from "./utils";

const create = (payload) => axios.post(RESPONSES_URL, payload);

const responsesApi = {
  create,
};

export default responsesApi;
