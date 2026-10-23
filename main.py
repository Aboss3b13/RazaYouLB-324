"""Flask-Applikation: Controller der Notizen-App."""

import os

from dotenv import load_dotenv
from flask import Flask, Response, abort, redirect, render_template, request, url_for

import helper
from database import db

load_dotenv()


def database_url():
    """Verbindung aus .env (lokal) oder App Settings (Azure). Ohne Angaben: SQLite."""
    if os.environ.get("DATABASE_URL"):
        return os.environ["DATABASE_URL"]
    if os.environ.get("DBHOST"):
        url = "postgresql+psycopg2://{user}:{pw}@{host}/{name}".format(
            user=os.environ["DBUSER"],
            pw=os.environ["DBPASS"],
            host=os.environ["DBHOST"],
            name=os.environ["DBNAME"],
        )
        if os.environ.get("DBSSL") == "require":
            url += "?sslmode=require"
        return url
    return "sqlite:///notizen.db"


def create_app(db_url=None):
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url or database_url()
    db.init_app(app)
    with app.app_context():
        db.create_all()

    @app.route("/")
    def index():
        query = request.args.get("q", "")
        return render_template("index.html", notes=helper.search(query), query=query)

    @app.route("/add", methods=["POST"])
    def add():
        try:
            helper.add(request.form.get("title"), request.form.get("text"))
        except ValueError:
            pass
        return redirect(url_for("index"))

    @app.route("/edit/<int:note_id>", methods=["GET", "POST"])
    def edit(note_id):
        note = helper.get(note_id) or abort(404)
        if request.method == "POST":
            try:
                helper.update(note_id, request.form.get("title"), request.form.get("text"))
            except ValueError:
                pass
            return redirect(url_for("index"))
        return render_template("edit.html", note=note)

    @app.route("/delete/<int:note_id>", methods=["POST"])
    def delete(note_id):
        helper.delete(note_id)
        return redirect(url_for("index"))

    @app.route("/download")
    def download():
        return Response(
            helper.get_csv(),
            mimetype="text/csv",
            headers={"Content-disposition": "attachment; filename=notizen.csv"},
        )

    @app.route("/health")
    def health():
        return {"status": "ok"}

    return app


app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
