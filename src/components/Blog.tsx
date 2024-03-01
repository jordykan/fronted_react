import { FC } from "react";

type iProps = {
  titulo: string;
  autor: string;
  contenido: string;
  fecha_publicacion: string;
  mostarModal: () => void;
};

const Blog: FC<iProps> = (props) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {props.titulo}
      </h5>
      <p className="text-xs text-gray-500 font-semibold border-b">
        {props.autor} - {props.fecha_publicacion}
      </p>
      <p className="mb-3 font-normal text-sm text-gray-700 py-2 dark:text-gray-400">
        {props.contenido}
      </p>
      <button
        onClick={() => props.mostarModal()}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Mas información
      </button>
    </div>
  );
};

export default Blog;
