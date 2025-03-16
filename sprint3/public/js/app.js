document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll("nav a");
    const pages = document.querySelectorAll(".page");

    const clinicaModal = document.getElementById("clinica-modal");
    const dentistaModal = document.getElementById("dentista-modal");
    const pacienteModal = document.getElementById("paciente-modal");
    const confirmModal = document.getElementById("confirm-modal");

    const addClinicaBtn = document.getElementById("add-clinica-btn");
    const addDentistaBtn = document.getElementById("add-dentista-btn");
    const addPacienteBtn = document.getElementById("add-paciente-btn");

    const clinicaForm = document.getElementById("clinica-form");
    const dentistaForm = document.getElementById("dentista-form");
    const pacienteForm = document.getElementById("paciente-form");

    navLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            navLinks.forEach((l) => l.classList.remove("active"));
            pages.forEach((p) => p.classList.remove("active"));

            this.classList.add("active");

            const targetPage = this.getAttribute("data-page");
            document.getElementById(targetPage).classList.add("active");

            loadPageData(targetPage);
        });
    });

    function loadPageData(page) {
        switch (page) {
            case "dashboard":
                loadDashboardData();
                break;
            case "clinicas":
                loadClinicas();
                break;
            case "dentistas":
                loadDentistas();
                break;
            case "pacientes":
                loadPacientes();
                break;
        }
    }

    async function loadDashboardData() {
        try {
            const data = await API.getDashboardData();

            document.getElementById("total-clinicas").textContent =
                data.totalClinicas;
            document.getElementById("total-dentistas").textContent =
                data.totalDentistas;
            document.getElementById("total-pacientes").textContent =
                data.totalPacientes;
        } catch (error) {
            console.error("Erro ao carregar dados do dashboard:", error);

            document.getElementById("total-clinicas").textContent = "?";
            document.getElementById("total-dentistas").textContent = "?";
            document.getElementById("total-pacientes").textContent = "?";
        }
    }

    async function loadClinicas() {
        try {
            const clinicas = await API.getClinicas();
            const tbody = document.querySelector("#clinicas-table tbody");
            tbody.innerHTML = "";

            clinicas.forEach((clinica) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                  <td>${clinica.ClinicaID}</td>
                  <td>${clinica.Nome}</td>
                  <td>${clinica.Endereco}</td>
                  <td>${clinica.Telefone}</td>
                  <td>${clinica.Email || "-"}</td>
                  <td>
                      <button class="action-btn edit-btn" data-id="${
                          clinica.ClinicaID
                      }">
                          <i class="fas fa-edit"></i>
                      </button>
                      <button class="action-btn delete-btn" data-id="${
                          clinica.ClinicaID
                      }" data-name="${clinica.Nome}">
                          <i class="fas fa-trash"></i>
                      </button>
                  </td>
              `;

                tbody.appendChild(row);
            });

            addClinicaButtonListeners();
        } catch (error) {
            console.error("Erro ao carregar clínicas:", error);
            alert(
                "Erro ao carregar dados de clínicas. Tente novamente mais tarde."
            );
        }
    }

    function addClinicaButtonListeners() {
        document
            .querySelectorAll("#clinicas-table .edit-btn")
            .forEach((btn) => {
                btn.addEventListener("click", function () {
                    const id = this.getAttribute("data-id");
                    editClinica(id);
                });
            });

        document
            .querySelectorAll("#clinicas-table .delete-btn")
            .forEach((btn) => {
                btn.addEventListener("click", function () {
                    const id = this.getAttribute("data-id");
                    const name = this.getAttribute("data-name");
                    confirmDeleteClinica(id, name);
                });
            });
    }

    async function editClinica(id) {
        try {
            const clinica = await API.getClinica(id);

            document.getElementById("clinica-id").value = clinica.ClinicaID;
            document.getElementById("clinica-nome").value = clinica.Nome;
            document.getElementById("clinica-endereco").value =
                clinica.Endereco;
            document.getElementById("clinica-telefone").value =
                clinica.Telefone;
            document.getElementById("clinica-email").value =
                clinica.Email || "";

            document.getElementById("clinica-modal-title").textContent =
                "Editar Clínica";

            openModal(clinicaModal);
        } catch (error) {
            console.error("Erro ao carregar dados da clínica:", error);
            alert(
                "Erro ao carregar dados da clínica. Tente novamente mais tarde."
            );
        }
    }

    function confirmDeleteClinica(id, name) {
        document.getElementById(
            "confirm-message"
        ).textContent = `Tem certeza que deseja excluir a clínica "${name}"?`;

        const confirmBtn = document.getElementById("confirm-yes");
        confirmBtn.onclick = async () => {
            try {
                await API.deleteClinica(id);
                closeModal(confirmModal);
                loadClinicas();
            } catch (error) {
                console.error("Erro ao excluir clínica:", error);
                alert("Erro ao excluir clínica. Tente novamente mais tarde.");
            }
        };

        openModal(confirmModal);
    }

    async function loadDentistas() {
        try {
            const dentistas = await API.getDentistas();
            const tbody = document.querySelector("#dentistas-table tbody");
            tbody.innerHTML = "";

            dentistas.forEach((dentista) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                  <td>${dentista.DentistaID}</td>
                  <td>${dentista.Nome}</td>
                  <td>${dentista.CRO}</td>
                  <td>${dentista.Especialidade || "-"}</td>
                  <td>${dentista.ClinicaNome}</td>
                  <td>${dentista.Telefone || "-"}</td>
                  <td>
                      <button class="action-btn edit-btn" data-id="${
                          dentista.DentistaID
                      }">
                          <i class="fas fa-edit"></i>
                      </button>
                      <button class="action-btn delete-btn" data-id="${
                          dentista.DentistaID
                      }" data-name="${dentista.Nome}">
                          <i class="fas fa-trash"></i>
                      </button>
                  </td>
              `;

                tbody.appendChild(row);
            });

            addDentistaButtonListeners();
        } catch (error) {
            console.error("Erro ao carregar dentistas:", error);
            alert(
                "Erro ao carregar dados de dentistas. Tente novamente mais tarde."
            );
        }
    }

    function addDentistaButtonListeners() {
        document
            .querySelectorAll("#dentistas-table .edit-btn")
            .forEach((btn) => {
                btn.addEventListener("click", function () {
                    const id = this.getAttribute("data-id");
                    editDentista(id);
                });
            });

        document
            .querySelectorAll("#dentistas-table .delete-btn")
            .forEach((btn) => {
                btn.addEventListener("click", function () {
                    const id = this.getAttribute("data-id");
                    const name = this.getAttribute("data-name");
                    confirmDeleteDentista(id, name);
                });
            });
    }

    async function editDentista(id) {
        try {
            const dentista = await API.getDentista(id);
            const clinicas = await API.getClinicas();

            const selectClinica = document.getElementById("dentista-clinica");
            selectClinica.innerHTML = "";

            clinicas.forEach((clinica) => {
                const option = document.createElement("option");
                option.value = clinica.ClinicaID;
                option.textContent = clinica.Nome;
                selectClinica.appendChild(option);
            });

            document.getElementById("dentista-id").value = dentista.DentistaID;
            document.getElementById("dentista-nome").value = dentista.Nome;
            document.getElementById("dentista-cro").value = dentista.CRO;
            document.getElementById("dentista-especialidade").value =
                dentista.Especialidade || "";
            document.getElementById("dentista-telefone").value =
                dentista.Telefone || "";
            document.getElementById("dentista-email").value =
                dentista.Email || "";
            document.getElementById("dentista-clinica").value =
                dentista.ClinicaID;

            document.getElementById("dentista-modal-title").textContent =
                "Editar Dentista";

            openModal(dentistaModal);
        } catch (error) {
            console.error("Erro ao carregar dados do dentista:", error);
            alert(
                "Erro ao carregar dados do dentista. Tente novamente mais tarde."
            );
        }
    }

    function confirmDeleteDentista(id, name) {
        document.getElementById(
            "confirm-message"
        ).textContent = `Tem certeza que deseja excluir o dentista "${name}"?`;

        const confirmBtn = document.getElementById("confirm-yes");
        confirmBtn.onclick = async () => {
            try {
                await API.deleteDentista(id);
                closeModal(confirmModal);
                loadDentistas();
            } catch (error) {
                console.error("Erro ao excluir dentista:", error);
                alert("Erro ao excluir dentista. Tente novamente mais tarde.");
            }
        };

        openModal(confirmModal);
    }

    async function loadPacientes() {
        try {
            const pacientes = await API.getPacientes();
            const tbody = document.querySelector("#pacientes-table tbody");
            tbody.innerHTML = "";

            pacientes.forEach((paciente) => {
                const idade = paciente.DataNascimento
                    ? calcularIdade(paciente.DataNascimento)
                    : "-";

                const row = document.createElement("tr");
                row.innerHTML = `
                  <td>${paciente.PacienteID}</td>
                  <td>${paciente.Nome}</td>
                  <td>${paciente.CPF}</td>
                  <td>${idade}</td>
                  <td>${paciente.Telefone || "-"}</td>
                  <td>${paciente.ClinicaNome}</td>
                  <td>
                      <button class="action-btn edit-btn" data-id="${
                          paciente.PacienteID
                      }">
                          <i class="fas fa-edit"></i>
                      </button>
                      <button class="action-btn delete-btn" data-id="${
                          paciente.PacienteID
                      }" data-name="${paciente.Nome}">
                          <i class="fas fa-trash"></i>
                      </button>
                  </td>
              `;

                tbody.appendChild(row);
            });

            addPacienteButtonListeners();
        } catch (error) {
            console.error("Erro ao carregar pacientes:", error);
            alert(
                "Erro ao carregar dados de pacientes. Tente novamente mais tarde."
            );
        }
    }

    function calcularIdade(dataNascimento) {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();

        if (
            hoje.getMonth() < nascimento.getMonth() ||
            (hoje.getMonth() === nascimento.getMonth() &&
                hoje.getDate() < nascimento.getDate())
        ) {
            idade--;
        }

        return idade;
    }

    function addPacienteButtonListeners() {
        document
            .querySelectorAll("#pacientes-table .edit-btn")
            .forEach((btn) => {
                btn.addEventListener("click", function () {
                    const id = this.getAttribute("data-id");
                    editPaciente(id);
                });
            });

        document
            .querySelectorAll("#pacientes-table .delete-btn")
            .forEach((btn) => {
                btn.addEventListener("click", function () {
                    const id = this.getAttribute("data-id");
                    const name = this.getAttribute("data-name");
                    confirmDeletePaciente(id, name);
                });
            });
    }

    async function editPaciente(id) {
        try {
            const paciente = await API.getPaciente(id);
            const clinicas = await API.getClinicas();

            const selectClinica = document.getElementById("paciente-clinica");
            selectClinica.innerHTML = "";

            clinicas.forEach((clinica) => {
                const option = document.createElement("option");
                option.value = clinica.ClinicaID;
                option.textContent = clinica.Nome;
                selectClinica.appendChild(option);
            });

            let dataNascimento = "";
            if (paciente.DataNascimento) {
                const data = new Date(paciente.DataNascimento);
                dataNascimento = data.toISOString().substring(0, 10);
            }

            document.getElementById("paciente-id").value = paciente.PacienteID;
            document.getElementById("paciente-nome").value = paciente.Nome;
            document.getElementById("paciente-cpf").value = paciente.CPF;
            document.getElementById("paciente-data-nascimento").value =
                dataNascimento;
            document.getElementById("paciente-telefone").value =
                paciente.Telefone || "";
            document.getElementById("paciente-email").value =
                paciente.Email || "";
            document.getElementById("paciente-endereco").value =
                paciente.Endereco || "";
            document.getElementById("paciente-clinica").value =
                paciente.ClinicaID;

            document.getElementById("paciente-modal-title").textContent =
                "Editar Paciente";

            openModal(pacienteModal);
        } catch (error) {
            console.error("Erro ao carregar dados do paciente:", error);
            alert(
                "Erro ao carregar dados do paciente. Tente novamente mais tarde."
            );
        }
    }

    function confirmDeletePaciente(id, name) {
        document.getElementById(
            "confirm-message"
        ).textContent = `Tem certeza que deseja excluir o paciente "${name}"?`;

        const confirmBtn = document.getElementById("confirm-yes");
        confirmBtn.onclick = async () => {
            try {
                await API.deletePaciente(id);
                closeModal(confirmModal);
                loadPacientes();
            } catch (error) {
                console.error("Erro ao excluir paciente:", error);
                alert("Erro ao excluir paciente. Tente novamente mais tarde.");
            }
        };

        openModal(confirmModal);
    }

    addDentistaBtn.addEventListener("click", async function () {
        try {
            const clinicas = await API.getClinicas();

            const selectClinica = document.getElementById("dentista-clinica");
            selectClinica.innerHTML = "";

            clinicas.forEach((clinica) => {
                const option = document.createElement("option");
                option.value = clinica.ClinicaID;
                option.textContent = clinica.Nome;
                selectClinica.appendChild(option);
            });

            document.getElementById("dentista-form").reset();
            document.getElementById("dentista-id").value = "";

            document.getElementById("dentista-modal-title").textContent =
                "Novo Dentista";

            openModal(dentistaModal);
        } catch (error) {
            console.error("Erro ao carregar clínicas:", error);
            alert("Erro ao preparar formulário. Tente novamente mais tarde.");
        }
    });

    addClinicaBtn.addEventListener("click", function () {
        document.getElementById("clinica-form").reset();
        document.getElementById("clinica-id").value = "";

        document.getElementById("clinica-modal-title").textContent =
            "Nova Clínica";

        openModal(clinicaModal);
    });

    addPacienteBtn.addEventListener("click", async function () {
        try {
            const clinicas = await API.getClinicas();

            const selectClinica = document.getElementById("paciente-clinica");
            selectClinica.innerHTML = "";

            clinicas.forEach((clinica) => {
                const option = document.createElement("option");
                option.value = clinica.ClinicaID;
                option.textContent = clinica.Nome;
                selectClinica.appendChild(option);
            });

            document.getElementById("paciente-form").reset();
            document.getElementById("paciente-id").value = "";

            document.getElementById("paciente-modal-title").textContent =
                "Novo Paciente";

            openModal(pacienteModal);
        } catch (error) {
            console.error("Erro ao carregar clínicas:", error);
            alert("Erro ao preparar formulário. Tente novamente mais tarde.");
        }
    });

    clinicaForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const id = document.getElementById("clinica-id").value;
        const clinica = {
            Nome: document.getElementById("clinica-nome").value,
            Endereco: document.getElementById("clinica-endereco").value,
            Telefone: document.getElementById("clinica-telefone").value,
            Email: document.getElementById("clinica-email").value,
        };

        try {
            if (id) {
                await API.updateClinica(id, clinica);
            } else {
                await API.createClinica(clinica);
            }

            closeModal(clinicaModal);
            loadClinicas();
        } catch (error) {
            console.error("Erro ao salvar clínica:", error);
            alert(
                "Erro ao salvar dados da clínica. Tente novamente mais tarde."
            );
        }
    });

    dentistaForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const id = document.getElementById("dentista-id").value;
        const dentista = {
            Nome: document.getElementById("dentista-nome").value,
            CRO: document.getElementById("dentista-cro").value,
            Especialidade: document.getElementById("dentista-especialidade")
                .value,
            Telefone: document.getElementById("dentista-telefone").value,
            Email: document.getElementById("dentista-email").value,
            ClinicaID: document.getElementById("dentista-clinica").value,
        };

        try {
            if (id) {
                await API.updateDentista(id, dentista);
            } else {
                await API.createDentista(dentista);
            }

            closeModal(dentistaModal);
            loadDentistas();
        } catch (error) {
            console.error("Erro ao salvar dentista:", error);
            alert(
                "Erro ao salvar dados do dentista. Tente novamente mais tarde."
            );
        }
    });

    pacienteForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const id = document.getElementById("paciente-id").value;
        const paciente = {
            Nome: document.getElementById("paciente-nome").value,
            CPF: document.getElementById("paciente-cpf").value,
            DataNascimento: document.getElementById("paciente-data-nascimento")
                .value,
            Telefone: document.getElementById("paciente-telefone").value,
            Email: document.getElementById("paciente-email").value,
            Endereco: document.getElementById("paciente-endereco").value,
            ClinicaID: document.getElementById("paciente-clinica").value,
        };

        try {
            if (id) {
                await API.updatePaciente(id, paciente);
            } else {
                await API.createPaciente(paciente);
            }

            closeModal(pacienteModal);
            loadPacientes();
        } catch (error) {
            console.error("Erro ao salvar paciente:", error);
            alert(
                "Erro ao salvar dados do paciente. Tente novamente mais tarde."
            );
        }
    });

    function openModal(modal) {
        modal.classList.add("active");
    }

    function closeModal(modal) {
        modal.classList.remove("active");
    }

    document.querySelectorAll(".close, .close-modal").forEach((element) => {
        element.addEventListener("click", function () {
            const modal = this.closest(".modal");
            closeModal(modal);
        });
    });

    window.onclick = function (event) {
        if (event.target.classList.contains("modal")) {
            closeModal(event.target);
        }
    };

    loadDashboardData();
});
