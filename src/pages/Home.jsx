import { useEffect, useState } from "react";
import axios from "../Api";

function Home() {
  const [usuarios, setUsuarios] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDestinoSelector, setShowDestinoSelector] = useState(false);

  // Cargar usuarios y destinos
  useEffect(() => {
    axios.get("/usuarios").then((response) => setUsuarios(response.data));
    axios.get("/destinos").then((response) => setDestinos(response.data));
  }, []);

  // Asignar destino al usuario seleccionado
  const handleAssignDestino = (destinoId) => {
    axios
      .put(`/usuarios/${selectedUser}/destinos/${destinoId}`)
      .then(() => {
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) => {
            if (usuario.id === selectedUser) {
              const destinoAsignado = destinos.find(
                (destino) => destino.id === destinoId
              );
              return {
                ...usuario,
                destinosAsignados: [destinoAsignado],
              };
            }
            return usuario;
          })
        );
        alert("Destino asignado con éxito");
      })
      .catch((error) => console.error("Error al asignar destino:", error));
    setShowDestinoSelector(false);
    setSelectedUser(null);
  };

  // Imprimir factura
  const handleImprimirFactura = (userId) => {
    const url = `http://localhost:8080/usuarios/${userId}/factura`;
    window.open(url, "_blank"); // Abre la factura en una nueva pestaña
  };

  return (
    <div>
      <h1>Lista de Usuarios y Destinos Asignados</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Destinos Asignados</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.email}</td>
              <td>
                {usuario.destinosAsignados.length > 0 ? (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {usuario.destinosAsignados.map((destino) => (
                      <li key={destino.id}>
                        {destino.nombre} - ${destino.precio.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedUser(usuario.id);
                      setShowDestinoSelector(true);
                    }}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Asignar Destino
                  </button>
                )}
              </td>
              <td>
                {usuario.destinosAsignados.length > 0 && (
                  <button
                    onClick={() => handleImprimirFactura(usuario.id)}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Imprimir Factura
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Selector de destinos */}
      {showDestinoSelector && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2>Seleccionar Destino</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {destinos.map((destino) => (
                <li key={destino.id} style={{ marginBottom: "10px" }}>
                  <button
                    onClick={() => handleAssignDestino(destino.id)}
                    style={{
                      padding: "10px",
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    {destino.nombre} - ${destino.precio.toFixed(2)}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setShowDestinoSelector(false);
                setSelectedUser(null);
              }}
              style={{
                padding: "10px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
                marginTop: "10px",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
};

export default Home;
