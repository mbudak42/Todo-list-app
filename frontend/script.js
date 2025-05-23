function yeni_gorev() {
	var kullanici_input = prompt("Enter Task:");

	if (kullanici_input != null && kullanici_input !== "") {
		fetch('http://127.0.0.1:5000/gorevler', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ gorev_icerigi: kullanici_input })
		})
			.then(() => {
				listeyi_guncelle();
			})
			.catch(error => {
				console.error('Sunucu hatasi:', error);
			});
	}
}

function gorev_sil(gorev_id) {
	fetch(`http://127.0.0.1:5000/gorevler/${gorev_id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
	})
		.then(() => listeyi_guncelle())
		.catch(error => {
			console.error('Sunucu hatasi:', error);
		});
}

function gorev_guncelle(gorev_id) {
	fetch(`http://127.0.0.1:5000/gorevler/${gorev_id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' }
	})
		.then(() => listeyi_guncelle())
		.catch(error => console.error('Sunucu hatasi:', error));
}

function listeyi_guncelle() {
	fetch('http://127.0.0.1:5000/gorevler')
		.then(response => response.json())
		.then(data => {
			const liste = document.getElementById("list");
			liste.innerHTML = "";  // Listeyi temizle

			data.forEach(gorev => {
				let yeniSatir = document.createElement("div");

				let checkbox = document.createElement("input");
				checkbox.type = "checkbox";
				checkbox.checked = gorev.yapildi;
				checkbox.onchange = function () {
					gorev_guncelle(gorev.gorev_id);
				};

				let gorevMetni = document.createElement("span");
				gorevMetni.textContent = gorev.gorev_icerigi;
				if (gorev.yapildi) {
					gorevMetni.style.textDecoration = "line-through";
				}

				let silButonu = document.createElement("button");
				silButonu.textContent = "Sil";
				silButonu.onclick = function () {
					gorev_sil(gorev.gorev_id);
				};

				yeniSatir.appendChild(checkbox);
				yeniSatir.appendChild(gorevMetni);
				yeniSatir.appendChild(silButonu);

				liste.appendChild(yeniSatir);
			});
		});
}

function tamamlananlari_sil() {
	fetch('http://127.0.0.1:5000/gorevler/tamamlananlar', {
		method: 'DELETE'
	})
		.then(() => listeyi_guncelle())
		.catch(error => console.error('Sunucu hatasi:', error));

}

function listeyi_kaydet() {
	fetch('http://127.0.0.1:5000/gorevler/kaydet', {
		method: 'POST'
	})
		.catch(error => console.error('Sunucu hatasi:', error));
}

window.onload = function () {
	listeyi_guncelle();
};

window.onbeforeunload = function () {
	listeyi_kaydet();
};
