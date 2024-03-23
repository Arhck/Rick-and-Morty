import psycopg2
import json

# Função para conectar ao banco de dados
def connect_to_db():
    try:
        conn = psycopg2.connect(
            dbname="rick__morty",
            user="postgres",
            password="33571821",
            host="localhost",
            port="5432",
        )
        print("Conexão bem sucedida ao banco de dados")
        return conn
    except psycopg2.Error as e:
        print("Erro ao conectar ao banco de dados:", e)

# Função para inserir dados no banco de dados
def insert_data(conn, data):
    cursor = conn.cursor()
    try:
        cursor.execute(
            """CREATE table if not EXISTS characters (
            id INT PRIMARY key,
            name VARCHAR(200),
            status VARCHAR(10),
            species VARCHAR(200),
            type VARCHAR(200),
            gender VARCHAR(200),
            origin_name VARCHAR(200),
            location_name VARCHAR(200),
            image VARCHAR(200)
            );"""
        )

        for item in data:
            cursor.execute("""
                INSERT INTO characters (id, name, status, species, type, gender, origin_name, location_name, image) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                item['id'],
                item['name'],
                item['status'],
                item['species'],
                item['type'],
                item['gender'],
                item['origin']['name'],
                item['location']['name'],
                item['image'],
            ))
        conn.commit()
        print("Dados inseridos com sucesso")
    except psycopg2.Error as e:
        print("Erro ao inserir dados:", e)
        conn.rollback()
    finally:
        cursor.close()

# Função para ler dados do arquivo JSON
def read_json(file_path):
    try:
        with open(file_path, encoding="utf-8") as f:
            data = json.load(f)
            data = sorted(data, key=lambda x: x["id"])
            print("Arquivo LIDO!")
            return data
    except FileNotFoundError:
        print("Arquivo JSON não encontrado")

if __name__ == "__main__":
    conn = connect_to_db()
    if conn:
        data = read_json("allCharsUpdated.json")
        if data:
            insert_data(conn, data)
        conn.close()