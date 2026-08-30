import "./Usuarios.css";

function RoleBadge({ perfil }) {
  const classe = {
    Administrador: "badge-admin",
    Tecnico: "badge-tech",
    Leitura: "badge-reader",
  };

  return (
    <span className={`role-badge ${classe[perfil] || "badge-reader"}`}>
      {perfil}
    </span>
  );
}

export default RoleBadge;