export const environment = {
    production: true,
    apiUrl: window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : 'https://backend-app-8ev9.onrender.com/api'
};