import axios from "axios";

export const API_NOTES =
  "https://6389dc504eccb986e89ca5b4.mockapi.io/api/notes/";
export const API_TAGS = "https://6389dc504eccb986e89ca5b4.mockapi.io/api/tags/";
export default class ApiService {
  static async getAllNotes() {
    const response = await axios.get(`${API_NOTES}`);
    return response;
  }
  static async getAllTags() {
    const response = await axios.get(`${API_TAGS}`);
    return response;
  }
}
