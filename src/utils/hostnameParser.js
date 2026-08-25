
export function parseHostname(valor) {

    if (!valor) {
        return {
            hostname: "",
            serviceTag: ""
        };
    }

    const hostname = valor
        .trim()
        .toUpperCase();

    // Dell Service Tag possui 7 caracteres.
    const serviceTag =
        hostname.length >= 7
            ? hostname.slice(-7)
            : hostname;

    return {
        hostname,
        serviceTag
    };
}

