# Sprints - Devops Tools & Cloud Computing

## Repositório criado para realizar as entregas das Sprints do Challenge da Odontoprev

LARISSA ARAÚJO GAMA ALVARENGA – 96496 - 2TDSPS <br>
LARISSA LOPES OLIVEIRA – 552628 - 2TDSPC <br>
LUNA FAUSTINO LIMA – 552473 - 2TDSPS

## LINK YOUTUBE

https://youtu.be/9h03GgRAA9s?si=cZwhdiw9B0Dt7A5N

## INSTRUÇÕES DE USO DA APLICAÇÃO

1. Acesse a URL da aplicação: https://odontoprev-webapp.azurewebsites.net/
2. Na página inicial, você verá um Dashboard mostrando estatísticas de Clínicas, Dentistas e Pacientes
3. Navegue pelas diferentes abas para gerenciar cada entidade:
   - **Clínicas**: Visualize, adicione, edite ou exclua clínicas
   - **Dentistas**: Visualize, adicione, edite ou exclua dentistas
   - **Pacientes**: Visualize, adicione, edite ou exclua pacientes

## CONFIGURAÇÃO DO AMBIENTE DE CI/CD

### Pré-requisitos
- Conta no Azure DevOps com um projeto configurado
- Assinatura ativa do Azure
- Parallel Job ativado no Azure DevOps

### Passos para Execução das Pipelines

#### 1. Configurar Service Connection do Azure
1. Vá para "Project Settings" > "Service connections"
2. Crie uma nova conexão do tipo "Azure Resource Manager"
3. Selecione sua assinatura e nomeie a conexão como "azure-subscription"

#### 2. Configurar a Pipeline de CI
1. Vá para "Pipelines" > "Pipelines" > "New pipeline"
2. Selecione o repositório onde os arquivos do projeto estão
3. Selecione "Existing Azure Pipelines YAML file"
4. Escolha o arquivo "azure-pipelines-ci.yml"
5. Execute a pipeline

#### 3. Configurar a Pipeline de CD
1. Vá para "Pipelines" > "Pipelines" > "New pipeline"
2. Selecione o mesmo repositório
3. Selecione "Existing Azure Pipelines YAML file"
4. Escolha o arquivo "azure-pipelines-cd.yml"
5. Configure as variáveis necessárias:
   - `resourceGroupName`: Nome do grupo de recursos a ser criado
   - `webAppName`: Nome da Web App a ser criada
   - `sqlServerName`: Nome do servidor SQL
   - `sqlAdminLogin`: Login para o SQL Server
   - `sqlAdminPassword`: Senha para o SQL Server
6. Execute a pipeline

## DDL

O DDL das tabelas está no arquivo setup-database.sql (`sprint4/setup/setup-database.sql`).
