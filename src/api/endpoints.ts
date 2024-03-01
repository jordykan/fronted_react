import axios from "axios";
import { InterfaceBlogs } from "../interface/blog.interface";

export default {
  async agregarNuevoPosta(datos: InterfaceBlogs) {
    return await axios.post("http://localhost:3000/api/blogs/", datos);
  },
  async obtenerBlogs(filtro?: string, pagina = 1) {
    return await axios.get(
      `http://localhost:3000/api/blogs/?filtro=${filtro}&pagina=${pagina}`
    );
  },
  async obtenerInformacionBlog(id: number) {
    return await axios.get("http://localhost:3000/api/blogs/" + id);
  },
};
