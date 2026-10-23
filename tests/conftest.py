import os
import sys

import pytest

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from database import db  # noqa: E402
from main import create_app  # noqa: E402


@pytest.fixture()
def app():
    """Eigene Test-Datenbank pro Test: PostgreSQL in der CI, sonst SQLite im Speicher."""
    app = create_app(os.environ.get("TEST_DATABASE_URL", "sqlite:///:memory:"))
    with app.app_context():
        db.drop_all()
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()


@pytest.fixture()
def client(app):
    return app.test_client()
