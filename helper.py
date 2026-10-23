"""Logik der Notizen-App: Model und Funktionen zum Lesen und Schreiben."""

import csv
import io
from datetime import datetime

from database import db


class Note(db.Model):
    """Eine Notiz. SQLAlchemy bildet die Klasse auf eine Tabelle ab (ORM)."""

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    text = db.Column(db.Text, nullable=False, default="")
    updated = db.Column(db.DateTime, nullable=False, default=datetime.now)


def _clean_title(title):
    title = (title or "").strip()
    if not title:
        raise ValueError("Titel darf nicht leer sein")
    return title[:100]


def add(title, text=""):
    """Erstellt eine neue Notiz (US-01)."""
    note = Note(title=_clean_title(title), text=(text or "").strip())
    db.session.add(note)
    db.session.commit()
    return note


def get_all():
    """Alle Notizen, die neueste zuerst."""
    return Note.query.order_by(Note.updated.desc(), Note.id.desc()).all()


def get(note_id):
    return db.session.get(Note, note_id)


def update(note_id, title, text=""):
    """Ändert eine Notiz (US-03)."""
    note = get(note_id)
    if note is None:
        return None
    note.title = _clean_title(title)
    note.text = (text or "").strip()
    note.updated = datetime.now()
    db.session.commit()
    return note


def delete(note_id):
    """Löscht eine Notiz (US-04)."""
    note = get(note_id)
    if note is None:
        return False
    db.session.delete(note)
    db.session.commit()
    return True


def search(query):
    """Sucht in Titel und Text, ohne Gross-/Kleinschreibung (US-05)."""
    query = (query or "").strip()
    if not query:
        return get_all()
    pattern = f"%{query}%"
    return (
        Note.query.filter(Note.title.ilike(pattern) | Note.text.ilike(pattern))
        .order_by(Note.updated.desc(), Note.id.desc())
        .all()
    )


def get_csv():
    """Alle Notizen als CSV-Text (US-08)."""
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["titel", "text", "geaendert"])
    for note in get_all():
        writer.writerow([note.title, note.text, note.updated.strftime("%Y-%m-%d %H:%M")])
    return output.getvalue()
