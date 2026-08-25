export function parseHostname(valor) {

    if (!valor) {
        return {
            hostname: "",
            serviceTag: ""
        };
    }

    // Remove espaços e converte para maiúsculo
    const hostname = valor.trim().toUpperCase();

    // Remove tudo antes dos últimos 7 caracteres
    // Service Tag Dell possui 7 caracteres.
    const serviceTag = hostname.slice(-7);

    return {
        hostname,
        serviceTag
    };
}

