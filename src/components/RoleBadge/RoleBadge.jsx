import { ShieldCheck, User, UserCog, Users } from "lucide-react";

import "./RoleBadge.css";

// Configuração de cada perfil: cor/ícone exibido no badge.
// Adicione novas entradas aqui caso surjam novos perfis no sistema.
const PERFIS = {
  Administrador: {
    icon: ShieldCheck,
    className: "role-badge admin",
  },
  Gerente: {
    icon: UserCog,
    className: "role-badge gerente",
  },
  Supervisor: {
    icon: Users,
    className: "role-badge supervisor",
  },
  Usuario: {
    icon: User,
    className: "role-badge usuario",
  },
  Usuário: {
    icon: User,
    className: "role-badge usuario",
  },
};

const PERFIL_PADRAO = {
  icon: User,
  className: "role-badge default",
};

function RoleBadge({ perfil }) {
  const config = PERFIS[perfil] || PERFIL_PADRAO;
  const Icon = config.icon;

  return (
    <span className={config.className}>
      <Icon size={14} />
      {perfil}
    </span>
  );
}

export default RoleBadge;