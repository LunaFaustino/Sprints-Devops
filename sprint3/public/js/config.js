const API_CONFIG = {
  // URL da API - será configurada no Azure App Service
  baseUrl: window.location.hostname === 'localhost' ? 'http://localhost:8080/api' : '/api',
  
  endpoints: {
      clinicas: '/clinicas',
      dentistas: '/dentistas',
      pacientes: '/pacientes',
      dashboard: '/dashboard'
  }
};