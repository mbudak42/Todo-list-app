from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # Frontend farklı porttan erişebilsin diye

# Görevleri dosyadan yükle
def gorevleri_yukle():
    if os.path.exists("gorevler.json"):
        with open("gorevler.json", "r", encoding="utf-8") as f:
            return json.load(f)
    return []

# Görevleri dosyaya kaydet
def gorevleri_kaydet():
    with open("gorevler.json", "w", encoding="utf-8") as f:
        json.dump(gorevler, f, indent=2, ensure_ascii=False)

# Görev Listemiz
gorevler = gorevleri_yukle()

# Görev Ekle
@app.route('/gorevler', methods=['POST'])
def gorev_ekle():
    data = request.get_json()
    gorev_icerigi = data.get("gorev_icerigi")
    
    en_son_id = max([g["gorev_id"] for g in gorevler], default=0)
    gorev_id = en_son_id + 1

    gorev = {
        "gorev_id": gorev_id,
        "gorev_icerigi": gorev_icerigi,
        "yapildi": False
    }

    gorevler.append(gorev)
    gorevleri_kaydet()
    return '', 204  # 204 = işlem başarılı ama içerik yok

# Gorevleri Listele
@app.route('/gorevler', methods=['GET'])
def gorevleri_getir():
    return jsonify(gorevler), 200

# Gorev Guncelleme
@app.route('/gorevler/<int:gorev_id>', methods=['PUT'])
def gorev_guncelle(gorev_id):
    for gorev in gorevler:
        if gorev["gorev_id"] == gorev_id:
            gorev["yapildi"] = not gorev["yapildi"]
            gorevleri_kaydet()	
            return '', 204
    return '', 404

# Gorev Sil
@app.route('/gorevler/<int:gorev_id>', methods=['DELETE'])
def gorev_sil(gorev_id):
    for gorev in gorevler:
        if gorev["gorev_id"] == gorev_id:
            gorevler.remove(gorev)
            gorevleri_kaydet()
            return '', 204
    return '', 404

# Tamamlananlari Sil
@app.route('/gorevler/tamamlananlar', methods=['DELETE'])
def tamamlananlari_sil():
    global gorevler  # Çünkü listeyi yeniden tanımlayacağız

    yeni_gorevler = []  # Yeni bir boş liste oluştur

    for gorev in gorevler:  # Eski listedeki her görevi dolaş
        if not gorev["yapildi"]:  # Eğer görev yapılmamışsa (yapildi == False)
            yeni_gorevler.append(gorev)  # Yeni listeye ekle

    gorevler = yeni_gorevler  # Eski listeyi yeni listeyle değiştir
    gorevleri_kaydet()
    return '', 204

# Baslat
if __name__ == '__main__':
    app.run(debug=True)