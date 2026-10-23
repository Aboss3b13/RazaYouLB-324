"""Komponententests: je User Story mindestens ein Testfall."""

import pytest

import helper


def test_add_us01(app):
    # Given: keine Notizen / When: eine Notiz wird erstellt
    helper.add("  Einkauf ", "Milch")
    # Then: sie ist gespeichert und der Titel ist bereinigt
    notes = helper.get_all()
    assert len(notes) == 1
    assert notes[0].title == "Einkauf"
    assert notes[0].text == "Milch"


def test_add_empty_title_us01(app):
    with pytest.raises(ValueError):
        helper.add("   ", "x")


def test_update_us03(app):
    note = helper.add("Alt", "a")
    helper.update(note.id, "Neu", "b")
    assert helper.get(note.id).title == "Neu"
    assert helper.get(note.id).text == "b"


def test_update_unknown_us03(app):
    assert helper.update(999, "x") is None


def test_delete_us04(app):
    note = helper.add("Weg")
    assert helper.delete(note.id) is True
    assert helper.get_all() == []
    assert helper.delete(note.id) is False


def test_search_us05(app):
    helper.add("Einkauf", "Milch")
    helper.add("Schule", "M324 LB")
    assert [n.title for n in helper.search("MILCH")] == ["Einkauf"]
    assert [n.title for n in helper.search("schule")] == ["Schule"]
    assert len(helper.search("")) == 2


def test_sorted_newest_first(app):
    helper.add("Erste")
    helper.add("Zweite")
    assert [n.title for n in helper.get_all()] == ["Zweite", "Erste"]


def test_csv_us08(app):
    helper.add("Mit, Komma", 'Text mit "Anführungszeichen"')
    lines = helper.get_csv().splitlines()
    assert lines[0] == "titel,text,geaendert"
    assert lines[1].startswith('"Mit, Komma","Text mit ""Anführungszeichen"""')
