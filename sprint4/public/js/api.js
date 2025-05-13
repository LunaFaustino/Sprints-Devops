const API = {
    async request(endpoint, method = "GET", data = null) {
        const url = `${API_CONFIG.baseUrl}${endpoint}`;

        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
        };

        if (data && (method === "POST" || method === "PUT")) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            if (method === "DELETE") {
                return { success: true };
            }

            return await response.json();
        } catch (error) {
            console.error("Erro na API:", error);
            throw error;
        }
    },

    async getClinicas() {
        return this.request(API_CONFIG.endpoints.clinicas);
    },

    async getClinica(id) {
        return this.request(`${API_CONFIG.endpoints.clinicas}/${id}`);
    },

    async createClinica(clinica) {
        return this.request(API_CONFIG.endpoints.clinicas, "POST", clinica);
    },

    async updateClinica(id, clinica) {
        return this.request(
            `${API_CONFIG.endpoints.clinicas}/${id}`,
            "PUT",
            clinica
        );
    },

    async deleteClinica(id) {
        return this.request(`${API_CONFIG.endpoints.clinicas}/${id}`, "DELETE");
    },

    async getDentistas() {
        return this.request(API_CONFIG.endpoints.dentistas);
    },

    async getDentista(id) {
        return this.request(`${API_CONFIG.endpoints.dentistas}/${id}`);
    },

    async createDentista(dentista) {
        return this.request(API_CONFIG.endpoints.dentistas, "POST", dentista);
    },

    async updateDentista(id, dentista) {
        return this.request(
            `${API_CONFIG.endpoints.dentistas}/${id}`,
            "PUT",
            dentista
        );
    },

    async deleteDentista(id) {
        return this.request(
            `${API_CONFIG.endpoints.dentistas}/${id}`,
            "DELETE"
        );
    },

    async getPacientes() {
        return this.request(API_CONFIG.endpoints.pacientes);
    },

    async getPaciente(id) {
        return this.request(`${API_CONFIG.endpoints.pacientes}/${id}`);
    },

    async createPaciente(paciente) {
        return this.request(API_CONFIG.endpoints.pacientes, "POST", paciente);
    },

    async updatePaciente(id, paciente) {
        return this.request(
            `${API_CONFIG.endpoints.pacientes}/${id}`,
            "PUT",
            paciente
        );
    },

    async deletePaciente(id) {
        return this.request(
            `${API_CONFIG.endpoints.pacientes}/${id}`,
            "DELETE"
        );
    },

    async getDashboardData() {
        return this.request(API_CONFIG.endpoints.dashboard);
    },
};
