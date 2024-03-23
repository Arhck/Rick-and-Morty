from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:33571821@localhost:5432/rick__morty'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
cors = CORS(app)

class Characters(db.Model):
    __tablename__ = "characters"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    status = db.Column(db.String(10))
    species = db.Column(db.String(200))
    type = db.Column(db.String(200))
    gender = db.Column(db.String(200))
    origin_name = db.Column(db.String(200))
    location_name = db.Column(db.String(200))
    image = db.Column(db.String(200))

class CharacterOutput(ma.Schema):
    id = ma.Int()
    name = ma.Str()
    status = ma.Str()
    species = ma.Str()
    type = ma.Str()
    gender = ma.Str()
    origin_name = ma.Str()
    location_name = ma.Str()
    image = ma.Str()

character_output = CharacterOutput()
characters_output = CharacterOutput(many=True)

# Rota para buscar elementos pelo atributo 'name' e retornar resultados paginados
@app.route('/', methods=['GET'])
def get_by_name():
    page = request.args.get('page', 1, type=int)
    name = request.args.get('name', '')
    print(f"Parâmetro 'nome' recebido: {name}")
    elementos = Characters.query.filter(Characters.name.ilike(f'%{name}%')).paginate(page=page, per_page=20)
    pagenow = elementos.page
    pagetotal = elementos.pages
    retorno = characters_output.dump(elementos)
    return jsonify({
        "queryName": name,
        "Page": pagenow,
        "TotPages": pagetotal,
        "Personagens": retorno
    })





# Rota para buscar elemento pelo ID e retornar todas as informações
@app.route('/characters/<int:id>', methods=['GET'])
def get_elemento_por_id(id):
    elemento = Characters.query.get_or_404(id)
    retorno = character_output.dump(elemento)
    return jsonify(retorno)

if __name__ == '__main__':
    app.run(debug=True)