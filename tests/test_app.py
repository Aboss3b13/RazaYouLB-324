"""Integrationstests: HTTP-Anfragen -> Flask -> Datenbank -> HTML."""

import helper


def test_health(client):
    assert client.get("/health").get_json() == {"status": "ok"}


def test_create_and_show_us01(client):
    response = client.post("/add", data={"title": "Test", "text": "Hallo"}, follow_redirects=True)
    assert response.status_code == 200
    assert "Test" in response.get_data(as_text=True)


def test_empty_title_is_ignored_us01(client):
    client.post("/add", data={"title": "  "})
    assert helper.get_all() == []


def test_saved_in_database_us02(client):
    client.post("/add", data={"title": "Bleibt"})
    # Neue Anfrage liest wieder aus der Datenbank
    assert "Bleibt" in client.get("/").get_data(as_text=True)
    assert helper.get_all()[0].title == "Bleibt"


def test_edit_us03(client):
    note = helper.add("Alt")
    assert client.get(f"/edit/{note.id}").status_code == 200
    client.post(f"/edit/{note.id}", data={"title": "Neu", "text": ""})
    page = client.get("/").get_data(as_text=True)
    assert "Neu" in page and "Alt" not in page


def test_edit_unknown_gives_404(client):
    assert client.get("/edit/999").status_code == 404


def test_delete_us04(client):
    note = helper.add("Weg")
    client.post(f"/delete/{note.id}")
    assert "Keine Notizen" in client.get("/").get_data(as_text=True)


def test_search_us05(client):
    helper.add("Einkauf", "Milch")
    helper.add("Schule", "M324")
    page = client.get("/?q=milch").get_data(as_text=True)
    assert "Einkauf" in page and "Schule" not in page


def test_download_csv_us08(client):
    helper.add("Export")
    response = client.get("/download")
    assert response.mimetype == "text/csv"
    assert "Export" in response.get_data(as_text=True)
