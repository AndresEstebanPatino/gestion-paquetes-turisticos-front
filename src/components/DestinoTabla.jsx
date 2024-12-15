import { useEffect, useState } from "react";
import axios from "../Api";
import Modal from "./Modal";

function DestinoTabla() {
  const [destinos, setDestinos] = useState([]);
  const [selectedDestino, setSelectedDestino] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Cargar destinos turísticos
  useEffect(() => {
    axios
      .get("/destinos")
      .then((res) => setDestinos(res.data))
      .catch((error) => console.error("Error al cargar destinos:", error));
  }, []);

  // Abrir modal para crear o editar destino
  const handleEditDestino = (destino) => {
    setSelectedDestino(destino);
    setShowModal(true);
  };

  // Guardar cambios del destino
  const handleSaveDestino = () => {
    if (selectedDestino.id) {
      axios
        .put(`/destinos/${selectedDestino.id}`, selectedDestino)
        .then(() => {
          setDestinos((prev) =>
            prev.map((destino) =>
              destino.id === selectedDestino.id ? selectedDestino : destino
            )
          );
        });
    } else {
      axios.post("/destinos", selectedDestino).then((res) => {
        setDestinos((prev) => [...prev, res.data]);
      });
    }
    setShowModal(false);
    setSelectedDestino(null);
  };

  // Eliminar destino
  const handleDeleteDestino = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este destino?")) {
      axios.delete(`/destinos/${id}`).then(() => {
        setDestinos((prev) => prev.filter((destino) => destino.id !== id));
      });
    }
  };

  return (
    <div>
      <h1>Destinos Turísticos</h1>
      <button
        onClick={() => {
          setSelectedDestino({ nombre: "", precio: 0 });
          setShowModal(true);
        }}
        style={{
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Crear Destino
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {destinos.length > 0 ? (
            destinos.map((destino) => (
              <tr key={destino.id}>
                <td>{destino.id}</td>
                <td>{destino.nombre}</td>
                <td>${destino.precio.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => handleEditDestino(destino)}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#ffc107",
                      color: "black",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteDestino(destino.id)}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No hay destinos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          title={selectedDestino?.id ? "Editar Destino" : "Crear Destino"}
        >
          <div>
            <input
              type="text"
              placeholder="Nombre del destino"
              value={selectedDestino.nombre}
              onChange={(e) =>
                setSelectedDestino({ ...selectedDestino, nombre: e.target.value })
              }
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
            <input
              type="number"
              placeholder="Precio"
              value={selectedDestino.precio}
              onChange={(e) =>
                setSelectedDestino({ ...selectedDestino, precio: e.target.value })
              }
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
            <button
              onClick={handleSaveDestino}
              style={{
                padding: "10px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Guardar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default DestinoTabla;
