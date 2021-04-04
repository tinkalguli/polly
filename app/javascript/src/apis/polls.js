import axios from "axios";
import { POLLS_URL } from "./utils";

const list = () => axios.get(POLLS_URL);

const create = payload => axios.post(POLLS_URL, payload);

const show = id => axios.get(POLLS_URL + id);

const update = ({ id, payload }) => axios.put(POLLS_URL + id, payload);

const destroy = id => axios.delete(POLLS_URL + id);

const pollsApi = {
  list,
  create,
  show,
  update,
  destroy,
};

export default pollsApi;