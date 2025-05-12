from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Frontend farklı porttan erişebilsin diye

# Geçici Görev Listemiz
gorevler = []

#Görev Ekle
@app.route('/gorevler', methods=['POST'])
def gorev_ekle():
    data = request.get_json()
    gorev_id = data.get("gorev_id")
    gorev_icerigi = data.get("gorev_icerigi")

    gorev = {
        "gorev_id": gorev_id,
        "gorev_icerigi": gorev_icerigi,
        "yapildi": False
    }

    gorevler.append(gorev)
    return '', 204  # 204 = işlem başarılı ama içerik yok
