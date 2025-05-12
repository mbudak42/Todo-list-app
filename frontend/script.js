let gorevID = 1;

function yeni_gorev() {
	var kullanici_input = prompt("Lütfen bir şeyler yazın:");

	if (kullanici_input != null && kullanici_input !== "") {
		fetch('http://127.0.0.1:5000/gorevler', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ gorev_id: gorevID, gorev_icerigi: kullanici_input })
		})
			.catch(error => {
				console.error('Sunucu hatasi:', error);
			});
	}
	gorevID++;
	listeyi_guncelle();
}

function gorev_sil() {
	//> pythona silinecek gorevi soyle
	listeyi_guncelle();
}

function gorev_duzenle() {
	//> pythona değiştirilecek gorevi ve yeni stringi ver
	listeyi_guncelle();
}

function listeyi_guncelle() {
	//> pythondan tum listeyi al bastanyaz
	let yeniSatir = document.createElement("div");

	let checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.name = "yapilacaklar";
	checkbox.value = gorevSayisi;

	// Görev metni oluşturuluyor
	let gorevMetni = document.createElement("span");
	gorevMetni.textContent = kullanici_input;

	// Düzenleme butonu oluşturuluyor
	let duzenleButonu = document.createElement("button");
	duzenleButonu.textContent = "duzenle";
	duzenleButonu.onclick = function () { gorev_duzenle(gorevSayisi, gorevMetni); };

	// Silme butonu oluşturuluyor
	let silButonu = document.createElement("button");
	silButonu.textContent = "sil";
	silButonu.onclick = function () { gorev_sil(gorevSayisi, yeniSatir); };

	// Yeni satırdaki öğeleri ekliyoruz
	yeniSatir.appendChild(checkbox);
	yeniSatir.appendChild(gorevMetni);
	yeniSatir.appendChild(duzenleButonu);
	yeniSatir.appendChild(silButonu);
	document.getElementById("list").appendChild(yeniSatir);
}