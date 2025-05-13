const API_CONFIG = {
    baseUrl:
        window.location.hostname === "localhost"
            ? "http://localhost:8080/api"
            : "/api",

    endpoints: {
        clinicas: "/clinicas",
        dentistas: "/dentistas",
        pacientes: "/pacientes",
        dashboard: "/dashboard",
    },
};
