export const isAuthenticated = (authHeader) => {
    let isAuthenticated = false;
    if (!authHeader) {

        return acessApp();
    }
    const parts = authHeader.split(' ');
    if (!parts.length === 2) {
        return acessApp();;
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return acessApp();;
    }
    isAuthenticated = true;
    return isAuthenticated;
}

function acessApp() {
    return alert('To Access This Application You Must Login')
}

