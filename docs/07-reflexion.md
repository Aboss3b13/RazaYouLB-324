# Reflexion (Team)

Abbas Raza und Yucan You – je Kompetenz aus dem Bewertungsraster.

## A1 – Anforderungen erfassen und verwalten

Unsere Anforderungen haben wir als User Stories in GitHub Issues erfasst. Die Vorlagen für
User Story und Bug Report (`.github/ISSUE_TEMPLATE/`) setzen automatisch `type: …` und
`status: new issue`. Die User Stories haben Akzeptanzkriterien, und zu den Funktionen der App
gibt es Testfälle, deren Name auf die Story verweist (z.B. `test_delete_us04`). US-06
(Datenbank) prüfen wir dadurch, dass alle Tests in der CI gegen PostgreSQL laufen, US-07
(Auslieferung) über den Workflow `azure.yml` mit Health-Check. Durch die Issue-Nummer in jeder
Commit-Message und `Closes #…` im Pull Request sind Anforderung, Code, Test und Version
verknüpft. Zusätzlich haben wir GitHub Issues mit Jira und Azure DevOps Boards verglichen und
begründet, warum GitHub für unser kleines Team am besten passt.

Nicht gut lief, dass wir die Issues am Anfang keiner Person zugewiesen und nicht alle einem
Meilenstein zugeordnet haben. Die Label-Workflows gab es von Anfang an, ausgelöst wurden sie aber
erst nachträglich (Issue #18). Gelernt haben wir, dass ein Anforderungsprozess nur etwas bringt,
wenn man ihn ab dem ersten Issue lebt und nicht erst am Schluss aufräumt.

## B1 – Entwicklungsumgebung

Unsere Entwicklungsumgebung haben wir selbst eingerichtet und erweitert: VS-Code-Einstellungen
mit Formatieren beim Speichern, empfohlene Extensions, eine Debug-Konfiguration für Flask, ein
Dev Container und `docker compose` mit PostgreSQL. Mit pre-commit laufen vor jedem Commit black,
flake8 und pytest, dazu ein eigener Hook, der eine Issue-Nummer in der Commit-Message verlangt.
So hatten wir beide schnell dieselbe Umgebung.

Am einfachsten war das Einrichten von pre-commit. Schwieriger war, dass lokal SQLite und auf
Azure PostgreSQL läuft. Mit `docker compose` können wir lokal mit PostgreSQL testen; dabei
mussten wir noch korrigieren, dass die App startete, bevor die Datenbank bereit war (PR #20).
Uns ist klar geworden, dass lokale Hooks mit `--no-verify` umgangen werden können. Deshalb laufen
dieselben Prüfungen nochmals in der CI.

## C1 – Sourcecode- und Artefaktverwaltung

Wir arbeiten mit Git und GitHub Flow: Issue, Branch, Commits mit Issue-Nummer, Pull Request,
Review, Merge. Versionen markieren wir mit semantischen Tags (`v2.0.0`, `v2.1.0`). Bei jedem Tag
entstehen automatisch die Artefakte: ein GitHub Release mit Quellcode und Windows-Exe
(`notizen.exe`) und ein Docker-Image auf GitHub Packages (ghcr.io). Jedes Artefakt ist so
eindeutig einer Version des Quellcodes zugeordnet.

Hier sehen wir unsere grösste Schwäche. Am Anfang haben wir Branches lokal in `main` gemergt,
ohne Pull Request und ohne Review. Einen ersten Entwurf in JavaScript haben wir verworfen
(PRs #11–#15). Auch nachdem wir den Ablauf korrigiert hatten, ging noch ein Commit direkt auf
`main` (README-Link) und PR #20 wurde ohne Review gemergt. Grund war, dass der Branch-Schutz
nicht eingerichtet war und der Ablauf nur eine Team-Regel blieb. Beim nächsten Projekt richten
wir den Branch-Schutz am ersten Tag ein, damit Pull Request und Review technisch erzwungen werden.

## D1 – Automatisierter Integrationsprozess

Zu den User Stories haben wir Testfälle geschrieben: Komponententests für die Logik
(`tests/test_helper.py`) und Integrationstests, die mit dem Flask-Testclient eine Anfrage über die
Routen bis in die Datenbank prüfen (`tests/test_app.py`). Die CI läuft bei jedem Pull Request und
jedem Push auf `main`. Sie startet PostgreSQL als Service-Container, prüft Formatierung (black)
und Code-Qualität (flake8), führt alle Tests aus und zeigt die Testabdeckung in der Zusammenfassung
an. Vor jedem Deployment laufen die Tests nochmals.

Die Tests selbst zu schreiben war eher einfach. Schwieriger war, dass dieselben Tests lokal mit
SQLite und in der CI mit PostgreSQL laufen sollten. Das haben wir mit der Variable
`TEST_DATABASE_URL` gelöst. Wir haben gemerkt, wie viel Sicherheit eine grüne CI gibt: Fehler
fallen auf, bevor sie in `main` landen.

## E1 – Automatisierter Deploymentprozess

Wenn wir einen Tag `v*` setzen, laufen zuerst die Tests gegen PostgreSQL. Nur wenn sie grün sind,
wird die App mit GitHub Actions auf Azure App Service ausgeliefert. Der Workflow schreibt die
Version in die App, und ein Health-Check prüft am Schluss, ob genau diese Version unter `/health`
live ist. Fehlt das Secret, wird der Lauf rot statt still erfolgreich. Die Laufzeitumgebung
(App Service, PostgreSQL, App Settings) erstellen wir mit `azure/setup.sh` als Infrastruktur als
Code.

Am schwierigsten war für uns Azure: Publish-Profil, Secrets, Datenbankverbindung mit SSL und
herauszufinden, warum ein Deployment fehlschlägt. Beim ersten Entwurf schlug das Deployment fehl.
Später merkten wir, dass ein grüner Lauf allein nicht beweist, dass die neue Version live ist.
Darum haben wir die Prüfung auf das Secret und den Health-Check mit Versionsvergleich ergänzt
(PR #17). Darauf sind wir am meisten stolz: Ein Tag genügt, und die neue Version ist geprüft online.
