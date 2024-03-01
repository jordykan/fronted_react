import Navbar from "./components/Navbar";
import { useRef, useState, useEffect } from "react";
import endpoints from "./api/endpoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { InterfaceBlogs } from "./interface/blog.interface";
import Blog from "./components/Blog";
import Pagination from "./components/Pagination";
import moment from "moment";

function App() {
  const modal = useRef<HTMLDialogElement>(null);
  const modal_informacion = useRef<HTMLDialogElement>(null);
  const [titulo, setTitle] = useState("");
  const [autor, setAutor] = useState("");
  const [contenido, setContenido] = useState("");
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<InterfaceBlogs[]>([]);
  const [blog, setBlog] = useState<InterfaceBlogs>();
  const [filtro, setFiltro] = useState("");
  const [paginas, setPaginas] = useState(0);
  const [paginaActual, setPaginaActual] = useState(1);
  const [insertado, setInsertado] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!titulo || !autor || !contenido) {
      toast.error("Error, verifica los campos ingresados");
      return;
    }
    setLoading(true);
    const datos = {
      titulo,
      autor,
      contenido,
    };
    endpoints
      .agregarNuevoPosta(datos)
      .then(() => {
        limpiarInputs();
        actualizarPagina(paginaActual);
        toast("Blog guardado correctamente!");
        modal.current?.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const limpiarInputs = () => {
    setTitle("");
    setAutor("");
    setContenido("");
  };

  const mostrarMasInformacion = (id: number) => {
    modal_informacion.current?.showModal();
    endpoints.obtenerInformacionBlog(id).then((e) => {
      setBlog(e.data[0]);
    });
  };
  useEffect(() => {
    const getBlogs = () => {
      endpoints.obtenerBlogs(filtro, paginaActual).then((e) => {
        setBlogs(e.data.data);
        setPaginas(e.data.total_paginas);
      });
    };
    getBlogs();
  }, [filtro, paginaActual, insertado]);

  const actualizarPagina = (pagina: number) => {
    setInsertado((prev) => !prev);
    setPaginaActual(pagina);
  };

  return (
    <>
      <Navbar abrirModal={() => modal.current?.showModal()} />
      <ToastContainer />

      <dialog ref={modal} className="modal">
        <div className="modal-box">
          <div className="border-b">
            <h3 className="font-bold text-lg">Nuevo blog</h3>
          </div>
          <div className="py-4 space-y-3">
            <p className="text-sm px-1  text-gray-700 font-semibold">Titulo</p>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={titulo}
              className="bg-gray-100 w-full rounded-lg px-4 py-3 text-gray-600 text-xs"
            />
            <p className="text-sm px-1 text-gray-700 font-semibold">Autor</p>
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className="bg-gray-100 w-full rounded-lg px-4 py-3 text-gray-600 text-xs"
            />
            <p className="text-sm px-1 text-gray-700 font-semibold">
              Contenido
            </p>
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              rows={5}
              className="border w-full rounded-lg bg-gray-100 text-sm px-2 py-3"
            />
          </div>
          <div className="modal-action">
            <form
              method="dialog"
              className="flex space-x-2 "
              onSubmit={handleSubmit}
            >
              <button className="btn btn-sm text-sm">
                <span
                  className={loading ? "loading loading-spinner" : ""}
                ></span>
                {loading ? "Guardando" : "Guardar"}
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog ref={modal_informacion} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{blog?.titulo}</h3>
          <p className="py-4">{blog?.contenido}</p>
        </div>
      </dialog>

      <div className="px-8 py-4 w-full">
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => setFiltro(e.target.value)}
          className="border px-5 w-96 rounded-lg py-2 bg-gray-50 text-sm"
        />
      </div>
      <div className="px-8 w-full">
        <div className="grid grid-cols-3 gap-3 items-center">
          {blogs.map((blog) => (
            <Blog
              titulo={blog.titulo}
              autor={blog.autor}
              contenido={blog.contenido}
              fecha_publicacion={
                moment(blog.fecha_publicacion).format("L") ?? ""
              }
              mostarModal={() => mostrarMasInformacion(blog.id ?? 0)}
            />
          ))}
        </div>
        <Pagination
          paginas={paginas}
          cargarBlogs={(pagina: number) => actualizarPagina(pagina)}
        />
      </div>
    </>
  );
}

export default App;
