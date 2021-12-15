import axios from "axios";
export default {
  async getNodes() {
    let res = await axios.get("api/nodes");
    return res.data;
  },
  async createNode(payload) {
    let res = await axios.post("api/nodes", payload);
    return res.data;
  },
  async deleteNode(payload) {
    let res = await axios.delete("api/nodes", {data: {name: payload.name}});
    return res.data;
  }
}