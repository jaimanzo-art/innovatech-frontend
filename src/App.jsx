import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [estadoBackend, setEstadoBackend] = useState(null);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerEstadoBackend();
    obtenerProductos();
  }, []);

  const obtenerEstadoBackend = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/api/health`);
      const datos = await respuesta.json();
      setEstadoBackend(datos);
    } catch (error) {
      setError("No se pudo conectar con el Backend");
    }
  };

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch(`${API_URL}/api/productos`);
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (error) {
      setError("No se pudieron cargar los productos desde el Backend");
    }
  };

  return (
    <main className="contenedor">
      <section className="hero">
        <div>
          <p className="etiqueta">Evaluación Parcial N°2 - DevOps</p>
          <h1>Innovatech Chile</h1>
          <p>
            Aplicación Frontend desplegada en Docker, conectada a un Backend
            con Node.js, Express y MySQL.
          </p>
        </div>
      </section>

      <section className="tarjeta">
        <h2>Estado del Backend</h2>

        {estadoBackend ? (
          <div className="estado-ok">
            <p>
              <strong>Servicio:</strong> {estadoBackend.servicio}
            </p>
            <p>
              <strong>Estado:</strong> {estadoBackend.estado}
            </p>
            <p>
              <strong>Fecha:</strong> {estadoBackend.fecha}
            </p>
          </div>
        ) : (
          <p>Consultando estado del Backend...</p>
        )}

        {error && <p className="error">{error}</p>}
      </section>

      <section className="tarjeta">
        <h2>Servicios DevOps desde MySQL</h2>

        <div className="grid">
          {productos.length > 0 ? (
            productos.map((producto) => (
              <article className="producto" key={producto.id}>
                <h3>{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
              </article>
            ))
          ) : (
            <p>Cargando servicios desde el Backend...</p>
          )}
        </div>
      </section>

      <section className="tarjeta">
        <h2>Arquitectura implementada</h2>
        <ul>
          <li>Frontend React servido con Nginx en contenedor Docker.</li>
          <li>Backend Node.js y Express ejecutado en contenedor Docker.</li>
          <li>Base de datos MySQL con volumen persistente.</li>
          <li>Comunicación Frontend → Backend mediante API REST.</li>
          <li>Despliegue preparado para AWS EC2.</li>
          <li>Pipeline CI/CD con GitHub Actions y Docker Hub.</li>
        </ul>
      </section>
    </main>
  );
}

export default App;