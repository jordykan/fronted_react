import { FC } from "react";

type iProps = {
  abrirModal: () => void;
};

const Navbar: FC<iProps> = (props) => {
  return (
    <div className="navbar bg-base-100 border-b ">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Apps Blog</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <button
              className="btn btn-sm text-xs"
              onClick={() => props.abrirModal()}
            >
              Agregar blog
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
