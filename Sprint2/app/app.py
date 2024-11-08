from flask import Flask, request, jsonify
import mysql.connector
import json


app = Flask(__name__)

db_config = {
    'user': 'root',
    'password': 'senha',
    'host': 'db',
    'database': 'sprint2'
}

@app.route('/insert_paciente', methods=['POST'])
def insert_paciente():
    data = request.json
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    cursor.execute(
        "INSERT INTO paciente (nome, cpf, idade, quantidade_dentes, implante, carie, cancer) "
        "VALUES (%s, %s, %s, %s, %s, %s, %s)",
        (data['nome'], data['cpf'], data['idade'], data['quantidade_dentes'], data['implante'], data['carie'], data['cancer'])
    )

    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({"status": "Paciente inserido com sucesso"}), 201

@app.route('/update_paciente/<int:id_paciente>', methods=['PUT'])
def update_paciente(id_paciente):
    data = request.json
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    cursor.execute(
        "UPDATE paciente SET nome = %s, cpf = %s, idade = %s, quantidade_dentes = %s, implante = %s, carie = %s, cancer = %s "
        "WHERE id_paciente = %s",
        (data['nome'], data['cpf'], data['idade'], data['quantidade_dentes'], data['implante'], data['carie'], data['cancer'], id_paciente)
    )

    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({"status": "Paciente atualizado com sucesso"}), 200

@app.route('/get_pacientes', methods=['GET'])
def get_pacientes():
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM paciente")
    pacientes = cursor.fetchall()

    pacientes_ordenados = [
        {
            "id_paciente": paciente["id_paciente"],
            "nome": paciente["nome"],
            "cpf": paciente["cpf"],
            "idade": paciente["idade"],
            "quantidade_dentes": paciente["quantidade_dentes"],
            "implante": paciente["implante"],
            "carie": paciente["carie"],
            "cancer": paciente["cancer"]
        }
        for paciente in pacientes
    ]

    cursor.close()
    connection.close()
    
    response = app.response_class(
        response=json.dumps(pacientes_ordenados, ensure_ascii=False),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/delete_paciente/<int:id_paciente>', methods=['DELETE'])
def delete_paciente(id_paciente):
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    # Executa a exclusão com base no id_paciente
    cursor.execute("DELETE FROM paciente WHERE id_paciente = %s", (id_paciente,))

    connection.commit()
    cursor.close()
    connection.close()
    
    return jsonify({"status": "Paciente deletado com sucesso"}), 200



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
