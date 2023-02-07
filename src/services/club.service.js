import http from "../http-common";

class ClubDataService {
  getAll() {
    return http.get("/clubs");
  }

  get(id) {
    return http.get(`clubs/club/${id}`);
  }

  create(data) {
    return http.post("clubs/save", data);
  }

  update(id, data) {
    return http.put(`clubs/club/${id}`, data);
  }

  delete(id) {
    return http.delete(`clubs/club/${id}`);
  }

  deleteAll() {
    return http.delete(`/delete-clubs`);
  }

  findByName(name) {
    return http.get(`/club?name=${name}`);
  }
}

export default new ClubDataService();