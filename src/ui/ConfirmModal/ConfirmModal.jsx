export default function ConfirmModal() {
    setUsuarios(AuthService.listarUsuarios() ?? []);
}

