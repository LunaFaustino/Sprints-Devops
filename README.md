# Sprints - Devops Tools & Cloud Computing

## Repositório criado para realizar as entregas das Sprints do Challenge da Odontoprev

LARISSA ARAÚJO GAMA ALVARENGA – 96496 - 2TDSPS <br>
LARISSA LOPES OLIVEIRA – 552628 - 2TDSPB <br>
LUNA FAUSTINO LIMA – 552473 - 2TDSPB

### LINK YOUTUBE

https://youtu.be/6NGU75nsx6I?si=LkK7KLSFwkDQwQPa

### INSTRUÇÕES

1 - Tenha o Docker e o docker-compose instalados em seu PC <br>
2 - Clone o repositório <br>
3 - Navegue até a pasta Sprint2 <br>
4 - Faça o comando "docker-compose up -d" <br>
5 - Abra o navegador e entre no "http://localhost:5000/get_pacientes" para o método GET <br>
6 - Para os métodos POST, PUT e DELETE é necessário um auxílio externo, como o programa POSTMAN.

### ENDPOINTS
/insert_paciente - POST <br>
/update_paciente/ID - PUT <br>
/get_pacientes - GET <br>
/delete_paciente/ID - DELETE

### EXEMPLO DE JSON
```json
{
    "nome": "Maria Silva",
    "cpf": "10987654321",
    "idade": 30,
    "quantidade_dentes": 27,
    "implante": "NÃO",
    "carie": "SIM",
    "cancer": "NÃO"
}
```
