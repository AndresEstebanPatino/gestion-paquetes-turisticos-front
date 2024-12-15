import { useEffect, useState } from "react";
import axios from "../Api";
import Modal from "./Modal";

function UsuarioTabla() {
  const [usuarios, setUsuarios] = useState([]);
  const [destinos, setDestinos] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Cargar usuarios y destinos
  useEffect(() => {
    axios.get("/usuarios").then((res) => setUsuarios(res.data));
    axios.get("/destinos").then((res) => setDestinos(res.data));
  }, []);

  // Abrir modal para editar usuario
  const handleEditUser = (usuario) => {
    setSelectedUser(usuario);
    setShowModal(true);
  };

  // Guardar cambios de usuario
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

  // Asignar destino a usuario
  const handleAssignDestination = (userId, destinoId) => {
    axios
      .put(`/usuarios/${userId}/destinos/${destinoId}`)
      .then(() => {
        alert("Destino asignado con éxito");
        setUsuarios((prev) =>
          prev.map((user) => {
            if (user.id === userId) {
              return {
                ...user,
                destinosAsignados: [...user.destinosAsignados, destinos.find((d) => d.id === destinoId)],
              };
            }
            return user;
          })
        );
      });
  };

  return (
    <div>
      <h1>Usuarios</h1>
      <button
        onClick={() => {
          setSelectedUser({ nombre: "", email: "", destinosAsignados: [] });
          setShowModal(true);
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
                {usuario.destinosAsignados.map((d) => (
                  <span key={d.id}>{d.nombre}, </span>
                ))}
              </td>
              <td>
                <button onClick={() => handleEditUser(usuario)}>Editar</button>
                <button onClick={() => handleAssignDestination(usuario.id, 1)}>
                  Asignar Destino
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
            />
            <input
              type="email"
              placeholder="Email"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
            />
            <button onClick={handleSaveUser}>Guardar</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default UsuarioTabla;
