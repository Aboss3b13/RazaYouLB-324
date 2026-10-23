# DevOps-Glossar

Begriffe aus dem Modul 324, in eigenen Worten (Deutsch – Englisch).

## DevOps (Auftrag 1610)

| Deutsch | Englisch | Bedeutung |
| --- | --- | --- |
| DevOps | DevOps | Zusammenarbeit von Entwicklung und Betrieb mit Menschen, Prozessen und Werkzeugen, um laufend Mehrwert für den Kunden zu liefern. |
| Verantwortlichkeit | Accountability | Das Team ist für sein Produkt vom Code bis zum Betrieb verantwortlich. |
| Agilität | Agility | In kurzen Schritten arbeiten und schnell auf Änderungen reagieren. |
| Automatisierter Integrationsprozess | Continuous Integration (CI) | Jede Änderung wird automatisch gebaut und getestet. |
| Automatisierte Auslieferung | Continuous Delivery / Deployment (CD) | Jede erfolgreiche Änderung wird automatisch ausgeliefert. |
| Auslieferung | Deployment | Die Anwendung auf den Server bringen, damit Benutzer sie verwenden können. |
| Infrastruktur als Code | Infrastructure as Code (IaC) | Server und Dienste werden mit Skripten statt von Hand erstellt (bei uns `azure/setup.sh`). |
| Veröffentlichungszyklus | Release cycle | Zeit zwischen zwei Versionen. |
| Zeit bis zur Marktreife | Time to Market | Wie lange es dauert, bis eine Idee beim Kunden ist. |
| Versionsverwaltung | Version Control | Alle Änderungen am Code werden gespeichert und sind nachvollziehbar (Git). |

## Anforderungen (Auftrag 1611)

| Deutsch | Englisch | Bedeutung |
| --- | --- | --- |
| Anforderung | Requirement | Was das System können muss. |
| Anforderungs-Erhebung | Requirements elicitation | Anforderungen bei Kunden/Benutzern sammeln. |
| Anforderungs-Verwaltung | Requirements management | Anforderungen erfassen, ordnen, verfolgen. |
| – | Issue | Eintrag in GitHub für Anforderung, Fehler oder Aufgabe. |
| Meilenstein | Milestone | Ziel/Version, zu der mehrere Issues gehören (z.B. `v2.0.0`). |
| Minimal brauchbares Produkt | MVP (Minimum Viable Product) | Kleinste Version, die schon Nutzen bringt. |
| Produktverwalter | Product Manager | Entscheidet, was wann umgesetzt wird. |
| Anforderungs-Verwaltungsplan | RMP (Requirements Management Plan) | Regeln, wie Anforderungen erfasst und bearbeitet werden. |
| Rückverfolgbarkeit | Traceability | Verbindung Anforderung → Code → Test. |
| – | User Story | Anforderung aus Benutzersicht: *Als … möchte ich … damit …* |
| Vorlage | Template | Vorgegebenes Format für neue Issues. |
| Zuständige Person | Assignee | Wer am Issue arbeitet. |
| Etikette | Label | Markierung eines Issues, z.B. `type: bug`. |
| Akzeptanzkriterien | Acceptance criteria | Wann eine Anforderung erfüllt ist. |

## Git (Auftrag 1630)

| Deutsch | Englisch | Bedeutung |
| --- | --- | --- |
| Einbuchung | Commit | Gespeicherter Stand mit Nachricht. |
| Ablage | Repository | Ordner mit allen Dateien und der ganzen Geschichte. |
| Bereitstellungsbereich | Staging Area | Änderungen, die in den nächsten Commit kommen (`git add`). |
| Ast | Branch | Eigene Entwicklungslinie, z.B. `feature/6-datenbank`. |
| Änderungsantrag | Pull Request (PR) | Bitte, einen Branch in `main` zu übernehmen – mit Review. |
| Haken | Git Hook | Skript, das bei Git-Ereignissen läuft (z.B. vor dem Commit). |
| Zusammenführungskonflikt | Merge conflict | Zwei Änderungen an derselben Stelle, muss von Hand gelöst werden. |

## CI/CD (Aufträge 1640–1651)

| Deutsch | Englisch | Bedeutung |
| --- | --- | --- |
| Arbeitsablauf | Workflow | YAML-Datei in `.github/workflows`, die GitHub Actions ausführt. |
| Artefakt | Artifact | Ergebnis vom Build (ZIP, Docker-Image, `dist/`). |
| Behälter | Container | Paket aus App + Abhängigkeiten + Betriebssystem (Docker). |
| Behälterverzeichnis | Container Registry | Ablage für Docker-Images (GitHub Packages / ghcr.io). |
| Testabdeckung | Code Coverage | Anteil des Codes, der von Tests ausgeführt wird. |
| Etikette (Version) | Tag | Markiert eine Version, z.B. `v2.0.0`. |
| Geheimnis | Secret | Passwort o.ä., das nie im Code steht (`.env`, App Settings, GitHub Secrets). |
| Objekt-relationale Abbildung | ORM | Objekte im Code werden automatisch zu Tabellen in der DB. |
