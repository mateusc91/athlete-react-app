import http from "../http-common";

class AthleteDataService {
  getAll() {
    return http.get("");
  }

  get(id) {
    return http.get(`/athlete/${id}`);
  }

  create(data) {
    return http.post("/save", data);
  }

  update(id, data) {
    return http.put(`/athlete/${id}`, data);
  }

  delete(id) {
    return http.delete(`/athlete/${id}`);
  }

  deleteAll() {
    return http.delete(`/delete-athletes`);
  }

  findByName(name) {
    return http.get(`/athlete?name=${name}`);
  }
}

export default new AthleteDataService();