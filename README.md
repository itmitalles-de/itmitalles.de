# IT mit alles

Statische Website für den Münchner IT-Service. Die Seite besteht bewusst nur aus HTML, CSS und einem kleinen JavaScript für Sprachumschaltung, mobile Navigation und das Kontaktformular. Dadurch bleibt sie schnell, günstig und leicht zu pflegen.

## Veröffentlichung

Ein Push auf `main` startet `.github/workflows/pages.yml` und veröffentlicht die Website über GitHub Pages.

## Kontaktformular (Web3Forms)

Das Formular in `index.html` (`#contact-form`) sendet ohne eigenen Server per [Web3Forms](https://web3forms.com/) eine Mail an `tim@itmitalles.de`:

1. Auf web3forms.com die Mailadresse `tim@itmitalles.de` eintragen, den zugeschickten Access-Key kopieren.
2. In `index.html` den Platzhalter `YOUR_WEB3FORMS_ACCESS_KEY` (`<input type="hidden" name="access_key" ...>`) durch den echten Key ersetzen.

Bis dahin schlägt das Absenden mit einer Fehlermeldung fehl; Mail- und WhatsApp-Link funktionieren unabhängig davon sofort.

## Vor dem öffentlichen Start

- [x] Impressum mit echtem Namen, ladungsfähiger Anschrift und Kontaktdaten ausgefüllt (Tim-Lion Niedermaier / IT mit alles, Werinherstr. 110, 81541 München).
- [ ] Web3Forms Access-Key eintragen (siehe oben), sonst geht das Kontaktformular nicht raus.
- Datenschutzerklärung auf die tatsächlich verwendete Mail-, Formular- (Web3Forms) und Hosting-Infrastruktur abstimmen.
- Prüfen, ob `tim@itmitalles.de` als Postfach eingerichtet ist.
- DNS für `itmitalles.de` und optional `www.itmitalles.de` auf GitHub Pages zeigen lassen.

## Inhaltliche Leitlinie

Die Positionierung folgt dem vorhandenen Businessplan: kleine Firmen und Teams bis etwa zehn Mitarbeitende, Freiberufler und Privatpersonen; Netzwerk und WLAN, Geräte und Arbeitsplätze, Server und Cloud sowie E-Commerce und Web. Das Angebot ist konkrete Hilfe auf Zuruf nach Absprache und aktueller Verfügbarkeit – ohne starre SLAs, 24/7-Versprechen oder unnötige monatliche Bereitschaftspauschalen. Monitoring und laufende Betreuung sind bewusst kein Bestandteil des Startangebots.
