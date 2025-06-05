import { useEffect, useState } from "react";

export default function ProductoComponent() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("/data/productos.json")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("[Error al cargar productos]", err));
  }, []);

  return (
    <div className="container p-5 bg-light">
      <h2 className="text-center mb-4">Nuestros productos</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {productos.map((producto) => (
          <div className="col" key={producto.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={producto.imagen}
                className="card-img-top"
                alt={producto.nombre}
                style={{ objectFit: "contain", height: "200px" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">
                  {producto.descripcion.slice(0, 100)}...
                </p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="h5 mb-0">${producto.precio}</span>
                  <button className="btn btn-outline-primary">
                    <i className="bi bi-cart-plus"></i> Añadir
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
