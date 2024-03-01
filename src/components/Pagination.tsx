import { FC } from "react";

type iProps = {
  paginas: number;
  cargarBlogs: (pagina: number) => void;
};
let total_paginas: Array<number> = [];
const Pagination: FC<iProps> = (props) => {
  total_paginas = [];
  for (let i = 1; i <= props.paginas; i++) {
    total_paginas.push(i);
  }
  return (
    <div className="py-4">
      <div className="join">
        {total_paginas.map((pages) => (
          <button
            className="join-item btn"
            onClick={() => props.cargarBlogs(pages)}
          >
            {pages}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
