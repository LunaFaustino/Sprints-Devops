IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Clinica')
BEGIN
    CREATE TABLE Clinica (
        ClinicaID INT PRIMARY KEY IDENTITY(1,1),
        Nome NVARCHAR(100) NOT NULL,
        Endereco NVARCHAR(200) NOT NULL,
        Telefone NVARCHAR(20) NOT NULL,
        Email NVARCHAR(100),
        DataCadastro DATETIME DEFAULT GETDATE(),
        Status BIT DEFAULT 1
    );
    
    PRINT 'Tabela Clinica criada com sucesso.'
END
ELSE
BEGIN
    PRINT 'Tabela Clinica já existe.'
END

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Dentista')
BEGIN
    CREATE TABLE Dentista (
        DentistaID INT PRIMARY KEY IDENTITY(1,1),
        Nome NVARCHAR(100) NOT NULL,
        CRO NVARCHAR(20) NOT NULL,
        Especialidade NVARCHAR(50),
        Telefone NVARCHAR(20),
        Email NVARCHAR(100),
        ClinicaID INT NOT NULL,
        DataCadastro DATETIME DEFAULT GETDATE(),
        Status BIT DEFAULT 1,
        FOREIGN KEY (ClinicaID) REFERENCES Clinica(ClinicaID)
    );
    
    PRINT 'Tabela Dentista criada com sucesso.'
END
ELSE
BEGIN
    PRINT 'Tabela Dentista já existe.'
END

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Paciente')
BEGIN
    CREATE TABLE Paciente (
        PacienteID INT PRIMARY KEY IDENTITY(1,1),
        Nome NVARCHAR(100) NOT NULL,
        CPF NVARCHAR(14) NOT NULL,
        DataNascimento DATE,
        Telefone NVARCHAR(20),
        Email NVARCHAR(100),
        Endereco NVARCHAR(200),
        ClinicaID INT NOT NULL,
        DataCadastro DATETIME DEFAULT GETDATE(),
        Status BIT DEFAULT 1,
        FOREIGN KEY (ClinicaID) REFERENCES Clinica(ClinicaID)
    );
    
    PRINT 'Tabela Paciente criada com sucesso.'
END
ELSE
BEGIN
    PRINT 'Tabela Paciente já existe.'
END

DECLARE @ClinicaCount INT
SELECT @ClinicaCount = COUNT(*) FROM Clinica

IF @ClinicaCount = 0
BEGIN
    INSERT INTO Clinica (Nome, Endereco, Telefone, Email)
    VALUES 
    ('Odontoprev Central', 'Av. Paulista, 1000, São Paulo, SP', '(11) 3456-7890', 'central@odontoprev.com.br'),
    ('Odontoprev Morumbi', 'Av. Morumbi, 2000, São Paulo, SP', '(11) 3456-7891', 'morumbi@odontoprev.com.br'),
    ('Odontoprev Tatuapé', 'Rua Tuiuti, 1500, São Paulo, SP', '(11) 3456-7892', 'tatuape@odontoprev.com.br'),
    ('Odontoprev Campinas', 'Av. Norte-Sul, 500, Campinas, SP', '(19) 3456-7893', 'campinas@odontoprev.com.br'),
    ('Odontoprev Rio', 'Av. Atlântica, 2500, Rio de Janeiro, RJ', '(21) 3456-7894', 'rio@odontoprev.com.br');
    
    PRINT 'Dados inseridos na tabela Clinica.'
    
    INSERT INTO Dentista (Nome, CRO, Especialidade, Telefone, Email, ClinicaID)
    VALUES 
    ('Dr. Carlos Silva', 'CRO-SP 12345', 'Ortodontia', '(11) 99876-5432', 'carlos.silva@odontoprev.com.br', 1),
    ('Dra. Mariana Costa', 'CRO-SP 23456', 'Endodontia', '(11) 99876-5433', 'mariana.costa@odontoprev.com.br', 1),
    ('Dr. Ricardo Almeida', 'CRO-SP 34567', 'Implantodontia', '(11) 99876-5434', 'ricardo.almeida@odontoprev.com.br', 2),
    ('Dra. Juliana Pereira', 'CRO-SP 45678', 'Periodontia', '(11) 99876-5435', 'juliana.pereira@odontoprev.com.br', 3),
    ('Dr. Fernando Gomes', 'CRO-RJ 56789', 'Cirurgia', '(21) 99876-5436', 'fernando.gomes@odontoprev.com.br', 5);
    
    PRINT 'Dados inseridos na tabela Dentista.'
    
    INSERT INTO Paciente (Nome, CPF, DataNascimento, Telefone, Email, Endereco, ClinicaID)
    VALUES 
    ('Ana Beatriz Souza', '123.456.789-01', '1985-05-15', '(11) 98765-4321', 'ana.souza@email.com', 'Rua das Flores, 100, São Paulo, SP', 1),
    ('João Pedro Santos', '234.567.890-12', '1990-10-20', '(11) 98765-4322', 'joao.santos@email.com', 'Av. Brasil, 200, São Paulo, SP', 1),
    ('Maria Clara Oliveira', '345.678.901-23', '1978-03-25', '(11) 98765-4323', 'maria.oliveira@email.com', 'Rua Augusta, 300, São Paulo, SP', 2),
    ('Pedro Henrique Lima', '456.789.012-34', '1995-07-30', '(11) 98765-4324', 'pedro.lima@email.com', 'Av. Rebouças, 400, São Paulo, SP', 3),
    ('Carla Ferreira Costa', '567.890.123-45', '1982-12-05', '(21) 98765-4325', 'carla.costa@email.com', 'Rua Copacabana, 500, Rio de Janeiro, RJ', 5);
    
    PRINT 'Dados inseridos na tabela Paciente.'
END
ELSE
BEGIN
    PRINT 'As tabelas já contêm dados. Nenhum dado foi inserido.'
END

EXEC sp_addextendedproperty 
    @name = N'MS_Description',
    @value = N'Tabela que armazena as informações das clínicas da Odontoprev',
    @level0type = N'SCHEMA', @level0name = N'dbo',
    @level1type = N'TABLE',  @level1name = N'Clinica';

EXEC sp_addextendedproperty 
    @name = N'MS_Description',
    @value = N'Tabela que armazena as informações dos dentistas da Odontoprev',
    @level0type = N'SCHEMA', @level0name = N'dbo',
    @level1type = N'TABLE',  @level1name = N'Dentista';

EXEC sp_addextendedproperty 
    @name = N'MS_Description',
    @value = N'Tabela que armazena as informações dos pacientes da Odontoprev',
    @level0type = N'SCHEMA', @level0name = N'dbo',
    @level1type = N'TABLE',  @level1name = N'Paciente';

EXEC sp_addextendedproperty 
    @name = N'MS_Description',
    @value = N'Identificador único da clínica',
    @level0type = N'SCHEMA', @level0name = N'dbo',
    @level1type = N'TABLE',  @level1name = N'Clinica',
    @level2type = N'COLUMN', @level2name = N'ClinicaID';

EXEC sp_addextendedproperty 
    @name = N'MS_Description',
    @value = N'Nome oficial da clínica',
    @level0type = N'SCHEMA', @level0name = N'dbo',
    @level1type = N'TABLE',  @level1name = N'Clinica',
    @level2type = N'COLUMN', @level2name = N'Nome';

EXEC sp_addextendedproperty 
    @name = N'MS_Description',
    @value = N'Status da clínica (1=Ativo, 0=Inativo)',
    @level0type = N'SCHEMA', @level0name = N'dbo',
    @level1type = N'TABLE',  @level1name = N'Clinica',
    @level2type = N'COLUMN', @level2name = N'Status';

PRINT 'Script de configuração do banco de dados executado com sucesso!'