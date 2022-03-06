#!/usr/bin/python
import sqlite3
from os import getenv
from dotenv import load_dotenv, find_dotenv
from algoliasearch.search_client import SearchClient
from algoliasearch.exceptions import AlgoliaException
from flask import Flask, request, jsonify
from flask_cors import CORS
from database_generation import database_generation


def connect_to_db():
    """Connection to the local sqlite database"""
    return sqlite3.connect("./database.sqlite")

def check_algolia_api_key():
    """Check the presence of the algolia API key in the back-end/.env file"""
    load_dotenv(find_dotenv())
    algolia_api_key = getenv("ALGOLIA_API_KEY")
    if (algolia_api_key is None):
        print("No Algolia API key from .env file! Contact the administrator to get it.")
        return 401
    return 200

        
# Algolia search
def update_algolia_index(array, method):
    """Update the Algolia Index using API"""
    load_dotenv(find_dotenv())
    algolia_api_id = getenv("ALGOLIA_APP_ID")
    algolia_api_key = getenv("ALGOLIA_API_KEY")
    algolia_index_name = getenv("ALGOLIA_INDEX_NAME")
    if check_algolia_api_key() == 401:
        return 500
    try:
        client = SearchClient.create(algolia_api_id, algolia_api_key)
        index = client.init_index(algolia_index_name)
        if method == "add":
            res = index.save_objects(array)
        elif method == "delete":
            res = index.delete_objects(array)
        elif method == "update":
            res = index.partial_update_objects(array)
        # index.clear_objects()
        res.wait()
    except AlgoliaException as error:
        print(error)
    except:
        print("Could not update Algolia index")


def insert_movie(movie):
    """Add a movie in the local database AND in the Algolia index"""
    if check_algolia_api_key() == 401:
        return 500
    try:
        update_algolia_index([movie], "add")
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute(
            """
        INSERT INTO movieTable (
            title,
            alternative_titles,
            year,
            image,
            color,
            score,
            rating,
            actors,
            actor_facets,
            genre,
            objectID
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
            (
                movie["title"],
                movie["alternative_titles"],
                movie["year"],
                movie["image"],
                movie["color"],
                movie["score"],
                movie["rating"],
                movie["actors"],
                movie["actor_facets"],
                movie["genre"],
                movie["objectID"],
            ),
        )
        conn.commit()
    except sqlite3.Error as error:
        print(error)
        conn().rollback()
    finally:
        conn.close()


def get_movies():
    """Get an array of all movies from the local database"""
    movies = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        database = conn.cursor()
        movie_list = database.execute("SELECT * from movieTable").fetchall()
        conn.commit()
        conn.close()
        movies = [dict(movie) for movie in movie_list]
    except sqlite3.Error as error:
        print(error)
        conn.rollback()
    return movies


def get_movie_by_id(movie_id):
    """Get a movie from the local database"""
    movie = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM movieTable WHERE objectID = ?", (movie_id,))
        row = cur.fetchone()
        # convert row object to dictionary
        movie["title"] = row["title"]
        movie["alternative_titles"] = row["alternative_titles"]
        movie["year"] = row["year"]
        movie["image"] = row["image"]
        movie["color"] = row["color"]
        movie["score"] = row["score"]
        movie["rating"] = row["rating"]
        movie["actors"] = row["actors"]
        movie["actor_facets"] = row["actor_facets"]
        movie["genre"] = row["genre"]
        movie["objectID"] = row["objectID"]
    except sqlite3.Error as error:
        print(error)
        conn.rollback()
    return movie


def update_movie(movie):
    """Update a movie in the local database AND in the Algolia index"""
    if check_algolia_api_key() == 401:
        return 500
    try:
        update_algolia_index([movie], "update")
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute(
            """
        UPDATE movieTable
        SET title = ?,
            alternative_titles = ?,
            year = ?,
            image = ?,
            color = ?,
            score = ?,
            rating = ?,
            actors = ?,
            actor_facets = ?,
            genre = ?
        WHERE objectID = ?
        """,
            (
                movie["title"],
                movie["alternative_titles"],
                movie["year"],
                movie["image"],
                movie["color"],
                movie["score"],
                movie["rating"],
                movie["actors"],
                movie["actor_facets"],
                movie["genre"],
                movie["objectID"],
            ),
        )
        conn.commit()
    except sqlite3.Error as error:
        print(error)
        conn.rollback()
    finally:
        conn.close()


def delete_movie(movie_id):
    """Delete a movie from the local database AND from the Algolia index"""
    if check_algolia_api_key() == 401:
        return
    try:
        update_algolia_index([movie_id], "delete")
        conn = connect_to_db()
        conn.execute("DELETE from movieTable WHERE objectID = ?", (movie_id,))
        conn.commit()
    except sqlite3.Error as error:
        print(error)
        conn.rollback()
    finally:
        conn.close()


database_generation()
movies = get_movies()
update_algolia_index(movies, "add")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/api/v1/check_api_key", methods=["GET"])
def api_check_algolia_api_key():
    return jsonify(check_algolia_api_key())

@app.route("/api/v1/movies", methods=["GET"])
def api_get_movies():
    return jsonify(get_movies())

@app.route("/api/v1/movies/<movie_id>", methods=["GET"])
def api_get_movie(movie_id):
    return jsonify(get_movie_by_id(movie_id))

@app.route("/api/v1/movies/add", methods=["POST"])
def api_add_movie():
    movie = request.get_json()
    return jsonify(insert_movie(movie))

@app.route("/api/v1/movies/update", methods=["PUT"])
def api_update_movie():
    movie = request.get_json()
    return jsonify(update_movie(movie))

@app.route("/api/v1/movies/delete/<movie_id>", methods=["DELETE"])
def api_delete_movie(movie_id):
    return jsonify(delete_movie(movie_id))

if __name__ == "__main__":
    app.debug = True
    app.run(debug=True)
    app.run()
