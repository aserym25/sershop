Write-Host "1. Compilation locale de Sershop..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erreur de compilation. Déploiement annulé." -ForegroundColor Red
    exit
}

Write-Host "2. Transfert des fichiers vers le VPS Hetzner..." -ForegroundColor Cyan
scp -r .\dist\* mohamed@62.238.105.149:/var/www/sershop.fr/

if ($LASTEXITCODE -ne 0) {
    Write-Host "Erreur lors du transfert SCP." -ForegroundColor Red
    exit
}

Write-Host "3. Mise à jour des droits et redémarrage de Nginx..." -ForegroundColor Cyan
ssh mohamed@62.238.105.149 "sudo chown -R mohamed:www-data /var/www/sershop.fr && sudo chmod -R 755 /var/www/sershop.fr && sudo systemctl reload nginx"

Write-Host "Déploiement terminé avec succès sur sershop.fr !" -ForegroundColor Green