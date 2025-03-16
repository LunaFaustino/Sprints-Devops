const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const sqlConfig = {
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'OdontoprevAdmin123',
    database: process.env.DB_NAME || 'OdontoprevDB',
    server: process.env.DB_SERVER || 'odontoprev-server.database.windows.net',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
};

async function connectToDatabase() {
    try {
        await sql.connect(sqlConfig);
        console.log('Conectado ao banco de dados SQL Azure');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    }
}

app.get('/api/clinicas', async (req, res) => {
    try {
        const result = await sql.query`
            SELECT * FROM Clinica
            WHERE Status = 1
            ORDER BY Nome
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error('Erro ao buscar clínicas:', err);
        res.status(500).json({ error: 'Erro ao buscar clínicas' });
    }
});

app.get('/api/clinicas/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await sql.query`
            SELECT * FROM Clinica
            WHERE ClinicaID = ${id} AND Status = 1
        `;
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Clínica não encontrada' });
        }
        
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Erro ao buscar clínica:', err);
        res.status(500).json({ error: 'Erro ao buscar clínica' });
    }
});

app.post('/api/clinicas', async (req, res) => {
    const { Nome, Endereco, Telefone, Email } = req.body;
    
    try {
        const result = await sql.query`
            INSERT INTO Clinica (Nome, Endereco, Telefone, Email)
            OUTPUT INSERTED.*
            VALUES (${Nome}, ${Endereco}, ${Telefone}, ${Email})
        `;
        
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('Erro ao criar clínica:', err);
        res.status(500).json({ error: 'Erro ao criar clínica' });
    }
});

app.put('/api/clinicas/:id', async (req, res) => {
    const { id } = req.params;
    const { Nome, Endereco, Telefone, Email } = req.body;
    
    try {
        const result = await sql.query`
            UPDATE Clinica
            SET Nome = ${Nome},
                Endereco = ${Endereco},
                Telefone = ${Telefone},
                Email = ${Email}
            OUTPUT INSERTED.*
            WHERE ClinicaID = ${id} AND Status = 1
        `;
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Clínica não encontrada' });
        }
        
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Erro ao atualizar clínica:', err);
        res.status(500).json({ error: 'Erro ao atualizar clínica' });
    }
});

app.delete('/api/clinicas/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await sql.query`
            DELETE FROM Clinica
            WHERE ClinicaID = ${id}
        `;
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Clínica não encontrada' });
        }
        
        res.json({ success: true });
    } catch (err) {
        console.error('Erro ao excluir clínica:', err);
        res.status(500).json({ error: 'Erro ao excluir clínica' });
    }
});

app.get('/api/dentistas', async (req, res) => {
    try {
        const result = await sql.query`
            SELECT d.*, c.Nome as ClinicaNome
            FROM Dentista d
            JOIN Clinica c ON d.ClinicaID = c.ClinicaID
            WHERE d.Status = 1 AND c.Status = 1
            ORDER BY d.Nome
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error('Erro ao buscar dentistas:', err);
        res.status(500).json({ error: 'Erro ao buscar dentistas' });
    }
});

app.get('/api/dentistas/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await sql.query`
            SELECT d.*, c.Nome as ClinicaNome
            FROM Dentista d
            JOIN Clinica c ON d.ClinicaID = c.ClinicaID
            WHERE d.DentistaID = ${id} AND d.Status = 1 AND c.Status = 1
        `;
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Dentista não encontrado' });
        }
        
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Erro ao buscar dentista:', err);
        res.status(500).json({ error: 'Erro ao buscar dentista' });
    }
});

app.post('/api/dentistas', async (req, res) => {
    const { Nome, CRO, Especialidade, Telefone, Email, ClinicaID } = req.body;
    
    try {
        const result = await sql.query`
            INSERT INTO Dentista (Nome, CRO, Especialidade, Telefone, Email, ClinicaID)
            OUTPUT INSERTED.*
            VALUES (${Nome}, ${CRO}, ${Especialidade}, ${Telefone}, ${Email}, ${ClinicaID})
        `;
        
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('Erro ao criar dentista:', err);
        res.status(500).json({ error: 'Erro ao criar dentista' });
    }
});

app.put('/api/dentistas/:id', async (req, res) => {
    const { id } = req.params;
    const { Nome, CRO, Especialidade, Telefone, Email, ClinicaID } = req.body;
    
    try {
        const result = await sql.query`
            UPDATE Dentista
            SET Nome = ${Nome},
                CRO = ${CRO},
                Especialidade = ${Especialidade},
                Telefone = ${Telefone},
                Email = ${Email},
                ClinicaID = ${ClinicaID}
            OUTPUT INSERTED.*
            WHERE DentistaID = ${id} AND Status = 1
        `;
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Dentista não encontrado' });
        }
        
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Erro ao atualizar dentista:', err);
        res.status(500).json({ error: 'Erro ao atualizar dentista' });
    }
});

app.delete('/api/dentistas/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await sql.query`
            DELETE FROM Dentista
            WHERE DentistaID = ${id}
        `;
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Dentista não encontrado' });
        }
        
        res.json({ success: true });
    } catch (err) {
        console.error('Erro ao excluir dentista:', err);
        res.status(500).json({ error: 'Erro ao excluir dentista' });
    }
});

app.get('/api/pacientes', async (req, res) => {
    try {
        const result = await sql.query`
            SELECT p.*, c.Nome as ClinicaNome
            FROM Paciente p
            JOIN Clinica c ON p.ClinicaID = c.ClinicaID
            WHERE p.Status = 1 AND c.Status = 1
            ORDER BY p.Nome
        `;
        res.json(result.recordset);
    } catch (err) {
        console.error('Erro ao buscar pacientes:', err);
        res.status(500).json({ error: 'Erro ao buscar pacientes' });
    }
});

app.get('/api/pacientes/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await sql.query`
            SELECT p.*, c.Nome as ClinicaNome
            FROM Paciente p
            JOIN Clinica c ON p.ClinicaID = c.ClinicaID
            WHERE p.PacienteID = ${id} AND p.Status = 1 AND c.Status = 1
        `;
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Paciente não encontrado' });
        }
        
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Erro ao buscar paciente:', err);
        res.status(500).json({ error: 'Erro ao buscar paciente' });
    }
});

app.post('/api/pacientes', async (req, res) => {
    const { Nome, CPF, DataNascimento, Telefone, Email, Endereco, ClinicaID } = req.body;
    
    try {
        const result = await sql.query`
            INSERT INTO Paciente (Nome, CPF, DataNascimento, Telefone, Email, Endereco, ClinicaID)
            OUTPUT INSERTED.*
            VALUES (${Nome}, ${CPF}, ${DataNascimento}, ${Telefone}, ${Email}, ${Endereco}, ${ClinicaID})
        `;
        
        res.status(201).json(result.recordset[0]);
    } catch (err) {
        console.error('Erro ao criar paciente:', err);
        res.status(500).json({ error: 'Erro ao criar paciente' });
    }
});

app.put('/api/pacientes/:id', async (req, res) => {
    const { id } = req.params;
    const { Nome, CPF, DataNascimento, Telefone, Email, Endereco, ClinicaID } = req.body;
    
    try {
        const result = await sql.query`
            UPDATE Paciente
            SET Nome = ${Nome},
                CPF = ${CPF},
                DataNascimento = ${DataNascimento},
                Telefone = ${Telefone},
                Email = ${Email},
                Endereco = ${Endereco},
                ClinicaID = ${ClinicaID}
            OUTPUT INSERTED.*
            WHERE PacienteID = ${id} AND Status = 1
        `;
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'Paciente não encontrado' });
        }
        
        res.json(result.recordset[0]);
    } catch (err) {
        console.error('Erro ao atualizar paciente:', err);
        res.status(500).json({ error: 'Erro ao atualizar paciente' });
    }
});

app.delete('/api/pacientes/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const result = await sql.query`
            DELETE FROM Paciente
            WHERE PacienteID = ${id}
        `;
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ error: 'Paciente não encontrado' });
        }
        
        res.json({ success: true });
    } catch (err) {
        console.error('Erro ao excluir paciente:', err);
        res.status(500).json({ error: 'Erro ao excluir paciente' });
    }
});

app.get('/api/dashboard', async (req, res) => {
    try {
        const clinicasResult = await sql.query`
            SELECT COUNT(*) as total FROM Clinica WHERE Status = 1
        `;
        
        const dentistasResult = await sql.query`
            SELECT COUNT(*) as total FROM Dentista WHERE Status = 1
        `;
        
        const pacientesResult = await sql.query`
            SELECT COUNT(*) as total FROM Paciente WHERE Status = 1
        `;
        
        const dashboardData = {
            totalClinicas: clinicasResult.recordset[0].total,
            totalDentistas: dentistasResult.recordset[0].total,
            totalPacientes: pacientesResult.recordset[0].total
        };
        
        res.json(dashboardData);
    } catch (err) {
        console.error('Erro ao buscar dados do dashboard:', err);
        res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

async function startServer() {
    await connectToDatabase();
    
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

startServer();