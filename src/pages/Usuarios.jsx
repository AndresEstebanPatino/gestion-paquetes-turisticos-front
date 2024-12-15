import { useEffect, useState } from "react";
import axios from "../Api";
import Modal from "../components/Modal";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Cargar usuarios
  useEffect(() => {
    axios
      .get("/usuarios")
      .then((res) => setUsuarios(res.data))
      .catch((error) => console.error("Error al cargar usuarios:", error));
  }, []);

  // Guardar usuario (crear o editar)
  const handleSaveUser = () => {
    if (selectedUser.id) {
      axios.put(`/usuarios/${selectedUser.id}`, selectedUser).then(() => {
        setUsuarios((prev) =>
          prev.map((user) =>
            user.id === selectedUser.id ? selectedUser : user
          )
        );
      });
    } else {
      axios.post("/usuarios", selectedUser).then((res) => {
        setUsuarios((prev) => [...prev, res.data]);
      });
    }
    setShowModal(false);
    setSelectedUser(null);
  };

  // Eliminar usuario
  const handleDeleteUser = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este usuario?")) {
      axios.delete(`/usuarios/${id}`).then(() => {
        setUsuarios((prev) => prev.filter((user) => user.id !== id));
      });
    }
  };

  return (
    <div>
      <h1>Gestión de Usuarios</h1>
      <button
        onClick={() => {
          setSelectedUser({ nombre: "", email: "", destinosAsignados: [] });
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
        Crear Usuario
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
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
                <button
                  onClick={() => {
                    setSelectedUser(usuario);
                    setShowModal(true);
                  }}
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
                  onClick={() => handleDeleteUser(usuario.id)}
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
          ))}
        </tbody>
      </table>

      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          title={selectedUser?.id ? "Editar Usuario" : "Crear Usuario"}
        >
          <div>
            <input
              type="text"
              placeholder="Nombre"
              value={selectedUser.nombre}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, nombre: e.target.value })
              }
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
            <input
              type="email"
              placeholder="Email"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
              style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            />
            <button
              onClick={handleSaveUser}
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

export default Usuarios;
