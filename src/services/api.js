// src/services/api.js
import axios from 'axios';

const ADMIN_API_KEY = 'MI_CLAVE_SUPER_SECRETA_qwerty12345';

const apiClient = axios.create({
  baseURL: 'https://futbol-stats-backend.vercel.app/api', 
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': ADMIN_API_KEY // Añadimos la cabecera de autenticación por defecto
  }
});

export default apiClient;