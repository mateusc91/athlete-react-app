import http from "../http-common";

class AthleteDataService {
  getAll() {
    return http.get("/athletes");
  }

  get(id) {
    return http.get(`athletes/athlete/${id}`);
  }

  create(data) {
    return http.post("athletes/save", data);
  }

  update(id, data) {
    return http.put(`athletes/athlete/${id}`, data);
  }

  delete(id) {
    return http.delete(`athletes/athlete/${id}`);
  }

  deleteAll() {
    return http.delete(`athletes/delete-athletes`);
  }

  findByClubId(clubId) {
    return http.get(`athletes/club?id=${clubId}`);
  }
}

export default new AthleteDataService();