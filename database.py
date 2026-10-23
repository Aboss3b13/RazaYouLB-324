"""Gemeinsames Datenbank-Objekt (eigene Datei, damit es keine zirkulären Imports gibt)."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
