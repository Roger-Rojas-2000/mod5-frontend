const URL_API_GATEWAY = "http://34.234.88.143";

// Microservicio de clientes (usa /api/customers/)
const URL_API_SERVICE1 = `${URL_API_GATEWAY}`;

// Microservicio de libros
const URL_API_SERVICE2 = `${URL_API_GATEWAY}`; // libros

// Microservicio de autenticación (Django REST + Djoser)
const URL_API_SERVICE3 = `${URL_API_GATEWAY}/auth`;

export { URL_API_SERVICE1, URL_API_SERVICE2, URL_API_SERVICE3 };
