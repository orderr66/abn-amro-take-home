import axios from "axios";
export default {
  async getNodes() {
    let res = await axios.get("http://localhost:4000/nodes");
    return res.data;
  },
  async createNode(payload) {
    let res = await axios.post("http://localhost:4000/nodes", payload);
    return res.data;
  },
  async deleteNode(payload) {
    let res = await axios.delete("http://localhost:4000/nodes", {data: {name: payload.name}});
    return res.data;
  }
}