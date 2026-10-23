let compteurPiece = 1;

function ajouterPiece() {
  compteurPiece++;
  const container = document.getElementById('hvac-rooms-container');
  const pieceHtml = `
    <div class="hvac-room-block" id="piece-${compteurPiece}">
      <button class="hvac-btn-remove" onclick="supprimerPiece('piece-${compteurPiece}')">✕ Supprimer</button>
      <h3 class="hvac-room-title">Pièce ${compteurPiece}</h3>
      
      <div class="hvac-row">
        <div class="hvac-form-group">
          <label>Surface au sol (m²)</label>
          <input type="number" class="hvac-surface" placeholder="Ex: 15" min="1">
        </div>
        <div class="hvac-form-group">
          <label>Hauteur plafond (m)</label>
          <input type="number" class="hvac-hauteur" value="2.8" step="0.1" min="1">
        </div>
      </div>

      <div class="hvac-form-group">
        <label>Isolation de la pièce</label>
        <select class="hvac-isolation">
          <option value="bonne">Très bonne (Récente)</option>
          <option value="moyenne" selected>Moyenne (Standard)</option>
          <option value="faible">Faible (Ancienne)</option>
        </select>
      </div>

      <div class="hvac-row">
        <div class="hvac-form-group">
          <label>Vitrage (m²)</label>
          <input type="number" class="hvac-vitrage" value="1" min="0">
        </div>
        <div class="hvac-form-group">
          <label>Occupants</label>
          <input type="number" class="hvac-personnes" value="1" min="0">
        </div>
      </div>

      <div class="hvac-form-group" style="margin-bottom: 0;">
        <label>Équipements (Watts)</label>
        <input type="number" class="hvac-equipements" value="0" min="0">
      </div>
    </div>
  `;
  container.insertAdjacentHTML('beforeend', pieceHtml);
}

function supprimerPiece(idPiece) {
  document.getElementById(idPiece).remove();
}

function calculerMultiSplit() {
  const pieces = document.querySelectorAll('.hvac-room-block');
  let totalFroidWatts = 0;
  let totalChaudWatts = 0;
  let nbPiecesValides = 0;
  let detailsHtml = "<strong>Détail par unité intérieure :</strong><br>";

  let index = 1;
  pieces.forEach(piece => {
    const surface = parseFloat(piece.querySelector('.hvac-surface').value) || 0;
    const hauteur = parseFloat(piece.querySelector('.hvac-hauteur').value) || 0;
    
    if(surface > 0 && hauteur > 0) {
      nbPiecesValides++;
      const isolation = piece.querySelector('.hvac-isolation').value;
      const vitrage = parseFloat(piece.querySelector('.hvac-vitrage').value) || 0;
      const personnes = parseFloat(piece.querySelector('.hvac-personnes').value) || 0;
      const equipements = parseFloat(piece.querySelector('.hvac-equipements').value) || 0;

      const volume = surface * hauteur;
      let coeffFroid = isolation === "bonne" ? 30 : (isolation === "moyenne" ? 40 : 50);
      let coeffChaud = isolation === "bonne" ? 35 : (isolation === "moyenne" ? 45 : 60);

      let chargeFroid = (volume * coeffFroid) + (personnes * 130) + (vitrage * 150) + equipements;
      let wattsFroidPiece = Math.round(chargeFroid * 1.15); 
      let btuFroidPiece = Math.round(wattsFroidPiece * 3.41214);
      totalFroidWatts += wattsFroidPiece;

      let wattsChaudPiece = Math.round((volume * coeffChaud) * 1.20); 
      let btuChaudPiece = Math.round(wattsChaudPiece * 3.41214);
      totalChaudWatts += wattsChaudPiece;

      const maxPieceBTU = Math.max(btuFroidPiece, btuChaudPiece);
      detailsHtml += `- Unité ${index} : ~${maxPieceBTU.toLocaleString('fr-FR')} BTU/h<br>`;
    }
    index++;
  });

  if(nbPiecesValides === 0) {
    alert("Veuillez remplir correctement au moins une pièce (surface et hauteur).");
    return;
  }

  const totalFroidBTU = Math.round(totalFroidWatts * 3.41214);
  const totalChaudBTU = Math.round(totalChaudWatts * 3.41214);
  const maxTotalBTU = Math.max(totalFroidBTU, totalChaudBTU);

  document.getElementById('res-froid-watts').innerText = totalFroidWatts.toLocaleString('fr-FR') + ' W';
  document.getElementById('res-froid-btu').innerText = totalFroidBTU.toLocaleString('fr-FR') + ' BTU/h';
  document.getElementById('res-chaud-watts').innerText = totalChaudWatts.toLocaleString('fr-FR') + ' W';
  document.getElementById('res-chaud-btu').innerText = totalChaudBTU.toLocaleString('fr-FR') + ' BTU/h';
  document.getElementById('res-details-pieces').innerHTML = detailsHtml;

  const btnContainer = document.getElementById('dynamic-btn-container');
  let urlCategorie = "https://sershop.fr/categorie/climatiseurs-multi-split"; 
  let typeMulti = nbPiecesValides === 1 ? "Mono-Split" : 
                  nbPiecesValides === 2 ? "Bi-Split" : 
                  nbPiecesValides === 3 ? "Tri-Split" : 
                  nbPiecesValides === 4 ? "Quadri-Split" : 
                  "Multi-Split (" + nbPiecesValides + " postes)";

  if (maxTotalBTU > 48000) {
    btnContainer.innerHTML = `<a href="https://sershop.fr/contact" class="hvac-cta-btn">La puissance requise dépasse le standard résidentiel. Demander un devis (VRV/DRV)</a>`;
  } else {
    btnContainer.innerHTML = `<a href="${urlCategorie}" class="hvac-cta-btn">Voir nos compresseurs ${typeMulti} adaptées</a>`;
  }

  document.getElementById('hvac-result-box').style.display = 'block';
}