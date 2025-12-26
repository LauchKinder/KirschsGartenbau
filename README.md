# Kirschs Gartenbau - Webauftritt

Dieses Projekt ist die offizielle Website für **Kirschs Gartenbau**, ein junges und engagiertes Gartenbauunternehmen aus der Region Kuppenheim und Baden-Baden.

## 🛡️ Sicherheitshinweise (WICHTIG)

Dieses Projekt nutzt die Google Gemini API für den Garten-Assistenten. Um Ihren API-Schlüssel zu schützen:

1. **Kein Hardcoding:** Der API-Schlüssel wird im Code über `process.env.API_KEY` aufgerufen. Schreiben Sie niemals Ihren echten Schlüssel (`AIza...`) direkt in die `.tsx` oder `.html` Dateien.
2. **Environment Variables:** Hinterlegen Sie Ihren Schlüssel im Deployment-Dashboard Ihres Hosters (z.B. Vercel) unter dem Namen `API_KEY`.
3. **.gitignore:** Die Datei `.gitignore` ist bereits so konfiguriert, dass sie `.env`-Dateien ignoriert. Stellen Sie sicher, dass Sie Ihren Schlüssel nur lokal in einer `.env` Datei speichern und diese niemals pushen.
4. **Schlüssel-Rotation:** Falls Sie vermuten, dass Ihr Schlüssel öffentlich geworden ist, löschen Sie ihn sofort in der Google AI Studio Konsole und erstellen Sie einen neuen.

## Features

- **Modernes Design:** Responsive UI mit Tailwind CSS und hochwertiger Typografie.
- **KI-Gartenassistent:** Chatbot auf Basis von Gemini 3 Flash.
- **Kontaktformular:** Sicherer Versand via Formspree.
- **Spendenmodell:** Transparente Kommunikation des Konzepts.

## Technischer Stack

- **Frontend:** React 19 (ES6 Module via esm.sh)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **KI-Integration:** @google/genai

## Installation & Deployment

### Lokal ausführen
1. Repository klonen.
2. Datei `.env.example` zu `.env` kopieren.
3. Ihren API-Key in `.env` eintragen.
4. Mit einem lokalen Webserver (z.B. VS Code Live Server) starten.

### Deployment (Empfehlung: Vercel)
1. Repository mit Vercel verbinden.
2. In den "Project Settings" unter "Environment Variables" einen neuen Eintrag erstellen:
   - Key: `API_KEY`
   - Value: `IHR_ECHTER_SCHLÜSSEL`
3. Deploy klicken.

---
© 2026 Kirschs Gartenbau | Region Kuppenheim & Baden-Baden
