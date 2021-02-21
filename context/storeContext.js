import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';

export const API_URL =
  'https://api.mercadolibre.com/sites/MLA/search?q=Motorola%20G6';

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([
    {nombre: 'Categoria 1', color: 'red', id: Math.random().toString(10)},
    {nombre: 'Categoria 2', color: 'blue', id: Math.random().toString(10)},
    {nombre: 'Categoria 3', color: 'green', id: Math.random().toString(10)},
    {nombre: 'Categoria 4', color: 'yellow', id: Math.random().toString(10)},
  ]);
  const [categoriasProductos, setCategoriasProductos] = useState({});
  const [usuarios, setUsuarios] = useState([
    {nombre: 'Usuario 1', email: 'email@mail.com', id: Math.random().toString(10)},
    {nombre: 'Usuario 2', email: 'email@mail.com', id: Math.random().toString(10)},
  ]);
  const [usuariosProductos, setUsuariosProductos] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setProductos(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const agregarProductoACategoria = (categoria, producto) => {
    if (!categoria?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }

    const categoriaProductos = categoriasProductos[categoria.id] ?? [];
    if (!categoriaProductos.includes(producto.id)) {
      //Si no esta lo agregamos
      const newCategoriasProductos = {
        ...categoriasProductos,
        [categoria.id]: [...categoriaProductos, producto.id],
      };
      setCategoriasProductos(newCategoriasProductos);
    }
  };

  const agregarProductoAUsuario = (usuario, producto) => {
    if (!usuario?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }

    const usuariosProductos = usuariosProductos[usuario.id] ?? [];
    if (!usuariosProductos.includes(producto.id)) {
      //Si no esta lo agregamos
      const newUsuariosProductos = {
        ...usuariosProductos,
        [usuarios.id]: [...usuariosProductos, producto.id],
      };
      setUsuariosProductos(newUsuariosProductos);
    }
  };
  
  const quitarProductoDeUsuario = (usuario, producto) => {
    if (!usuario?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }
    const usuariosProductos = usuariosProductos[usuario.id] ?? [];
    if (usuariosProductos.includes(producto.id)) {
      //Si esta lo quitamos
      setUsuariosProductos({
        ...usuariosProductos,
        [usuarios.id]: usuariosProductos.filter((pid) => pid !== producto.id),
      });
    }
  };
  const quitarProductoDeCategoria = (categoria, producto) => {
    if (!categoria?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }
    const categoriaProductos = categoriasProductos[categoria.id] ?? [];
    if (categoriaProductos.includes(producto.id)) {
      //Si esta lo quitamos
      setCategoriasProductos({
        ...categoriasProductos,
        [categoria.id]: categoriaProductos.filter((pid) => pid !== producto.id),
      });
    }
  };

  const obtenerCategoriasDelProducto = (producto) => {
    const categoriasId = Object.keys(categoriasProductos);
    const categoriasIdDelProducto = categoriasId.reduce(
      (acc, cur) =>
        categoriasProductos[cur].includes(producto.id) ? [...acc, cur] : acc,
      [],
    );
    const results = categorias.filter((c) =>
      categoriasIdDelProducto.includes(c.id),
    );
    return results;
  };

  const obtenerUsuariosDelProducto = (producto) => {
    const usuariosId = Object.keys(usuariosProductos);
    const usuariosIdDelProducto = usuariosId.reduce(
      (acc, cur) =>
        usuariosProductos[cur].includes(producto.id) ? [...acc, cur] : acc,
      [],
    );
    const results = usuarios.filter((c) =>
      usuariosIdDelProducto.includes(c.id),
    );
    return results;
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        productos,
        setProductos,
        categorias,
        setCategorias,
        agregarProductoACategoria,
        quitarProductoDeCategoria,
        obtenerCategoriasDelProducto,
        obtenerUsuariosDelProducto,
        usuarios,
        agregarProductoAUsuario,
        setUsuarios,
        quitarProductoDeUsuario,
      }}>
      {children}
    </StoreContext.Provider>
  );
};
