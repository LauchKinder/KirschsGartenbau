
# Sicherheitsarchitektur Kirschs Gartenbau (V2)

Das Projekt nutzt nun eine **Server-Proxy-Architektur**, um maximale Sicherheit zu gewährleisten.

## 1. Schutz von Geheimnissen
- **Keine Client-SDKs:** Das `@google/genai` SDK wird nicht mehr im Browser geladen. Alle KI-Aufrufe finden in der Datei `api/chat.ts` statt.
- **Serverseitige Keys:** Der `API_KEY` wird ausschließlich auf dem Server (Environment Variable) genutzt. Er gelangt niemals in den Browser des Nutzers.

## 2. Deployment-Checkliste
- **Hoster:** Empfohlen wird Vercel oder Netlify.
- **Environment Variable:** Setzen Sie `API_KEY` in den Projekteinstellungen Ihres Hosters.
- **Vite/Build:** Die Build-Pipeline ist "sauber" – es werden keine Geheimnisse in die JS-Bundles geschrieben.

## 3. Datenfluss
1. Browser sendet Nachricht an `/api/chat`.
2. Serverless Function liest den sicheren Key und ruft Gemini auf.
3. Die Antwort wird als Text-Stream sicher zurück an den Browser geleitet.

Diese Architektur verhindert effektiv das Auslesen Ihres API-Schlüssels durch Dritte.
