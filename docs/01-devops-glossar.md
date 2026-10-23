# DevOps und Glossar

## Was ist DevOps? (LZ 1.1)

DevOps ist die Verbindung von **Dev**elopment (Entwicklung) und **Op**eration**s** (Betrieb):
Menschen, Prozesse und Werkzeuge arbeiten zusammen, damit Kunden laufend Mehrwert erhalten.

Betroffene Bereiche und was wir dafür verwenden:

| Bereich | Werkzeug im Projekt |
| --- | --- |
| Planen | GitHub Issues, Labels, Meilensteine |
| Entwickeln | VS Code, Git, Feature-Branches |
| Bauen | GitHub Actions, PyInstaller, Docker |
| Testen | pytest (lokal mit pre-commit, auf dem Server in der CI) |
| Ausliefern | GitHub Releases, GitHub Packages, Azure App Service |
| Betreiben | Azure (App Service + PostgreSQL), Health-Check |

## Warum DevOps? (LZ 1.2)

- Fehler werden **früh** gefunden (Tests bei jedem Commit und Pull Request).
- Neue Versionen sind **schneller** beim Kunden (kürzere *Time to Market*).
- **Automatisierung** statt Handarbeit = weniger Fehler.
- Alles ist **nachvollziehbar**: Anforderung → Code → Test → Version.

## Glossar (Deutsch – Englisch)

| Deutsch | Englisch | Bedeutung |
| --- | --- | --- |
| Verantwortlichkeit | Accountability | Das Team ist für sein Produkt bis in den Betrieb verantwortlich. |
| Agilität | Agility | In kleinen Schritten arbeiten und schnell auf Änderungen reagieren. |
| Automatisierter Integrationsprozess | Continuous Integration (CI) | Jede Änderung wird automatisch gebaut und getestet. |
| Automatisierte Auslieferung | Continuous Delivery/Deployment (CD) | Jede geprüfte Version wird automatisch ausgeliefert. |
| Auslieferung | Deployment | Die Applikation auf den Server bringen. |
| Infrastruktur als Code | Infrastructure as Code (IaC) | Server per Skript statt von Hand (`azure/setup.sh`). |
| Veröffentlichungszyklus | Release cycle | Zeit zwischen zwei Versionen. |
| Zeit bis zur Marktreife | Time to Market | Zeit von der Idee bis zum Kunden. |
| Versionsverwaltung | Version Control | Alle Änderungen werden gespeichert (Git). |
| Anforderung | Requirement | Was das System können muss. |
| Anforderungs-Erhebung | Requirements elicitation | Anforderungen sammeln. |
| Anforderungs-Verwaltung | Requirements management | Anforderungen erfassen, ordnen, verfolgen. |
| – | Issue | Eintrag für Anforderung, Fehler oder Aufgabe. |
| Meilenstein | Milestone | Version, zu der mehrere Issues gehören. |
| Minimal brauchbares Produkt | MVP | Kleinste Version mit Nutzen. |
| Produktverwalter | Product manager | Entscheidet, was wann umgesetzt wird. |
| Anforderungs-Verwaltungsplan | RMP | Regeln, wie Anforderungen behandelt werden. |
| Rückverfolgbarkeit | Traceability | Verbindung Anforderung ↔ Code ↔ Test. |
| – | User story | *Als … möchte ich … damit …* |
| Vorlage | Template | Vorgegebenes Format für Issues. |
| Zuständige Person | Assignee | Wer am Issue arbeitet. |
| Einbuchung | Commit | Gespeicherter Stand mit Nachricht. |
| Ablage | Repository | Projekt mit ganzer Geschichte. |
| Bereitstellungsbereich | Staging area | Was in den nächsten Commit kommt (`git add`). |
| Ast | Branch | Eigene Entwicklungslinie. |
| Änderungsantrag | Pull request | Bitte, einen Branch zu übernehmen – mit Review. |
| Haken | Hook | Skript bei einem Git-Ereignis (z.B. vor dem Commit). |
| Etikette | Tag / Label | Markiert eine Version (Tag) oder ein Issue (Label). |
| Behälter | Container | App mit Abhängigkeiten und Betriebssystem (Docker). |
| Behälterverzeichnis | Container registry | Ablage für Images (ghcr.io). |
| Testabdeckung | Code coverage | Anteil Code, der von Tests ausgeführt wird. |
| Objekt-relationale Abbildung | ORM | Klassen werden zu Tabellen (SQLAlchemy). |
| Geheimnis | Secret | Passwort o.ä., nie im Code (`.env`, App Settings, GitHub Secrets). |
