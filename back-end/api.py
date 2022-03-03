#!/usr/bin/python
import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
from database_generation import database_generation 
from os import getenv
from algoliasearch.search_client import SearchClient
from dotenv import load_dotenv, find_dotenv


def connect_to_db():
    conn = sqlite3.connect('./database.sqlite')
    return conn

# Algolia search
def update_algolia_index(array, method):
    load_dotenv(find_dotenv())
    ALGOLIA_APP_ID = getenv('ALGOLIA_APP_ID')
    ALGOLIA_API_KEY = getenv('ALGOLIA_API_KEY')
    ALGOLIA_INDEX_NAME = getenv('ALGOLIA_INDEX_NAME')
    client = SearchClient.create(ALGOLIA_APP_ID, ALGOLIA_API_KEY)
    index = client.init_index(ALGOLIA_INDEX_NAME)
    if method == "add":
        res = index.save_objects(array)
    if method == "delete":
        res = index.delete_object(array)
    if method == "update":
        res = index.partial_update_objects(array)
    res.wait()
    # index.clear_objects()

def insert_movie(movie):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("""
        INSERT INTO movieTable (
            title, alternative_titles, year, image, color, score, rating, actors, actor_facets, genre, objectID
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """
        ,(movie['title'], movie['alternative_titles'], movie['year'], movie['image'], movie['color'], movie['score'], movie['rating'], movie['actors'], movie['actor_facets'], movie['genre'], movie['objectID']) 
        )
        conn.commit()
        update_algolia_index([movie],"add")
    except:
        conn().rollback()
    finally:
        conn.close()
    return 201


def get_movies():
    movies = []
    try:
        # Create a SQL connection to our SQLite database
        conn = sqlite3.connect("./database.sqlite")
        conn.row_factory = sqlite3.Row # This enables column access by name: row['column_name'] 
        db = conn.cursor()
        movie_list = db.execute('''
        SELECT * from movieTable
        ''').fetchall()
        conn.commit()
        # Be sure to close the connection
        conn.close()
        movies = [dict(movie) for movie in movie_list]
    except: 
        movies = []
    return movies


def get_movie_by_id(movie_id):
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
    except:
        movie = {}
    return movie


def update_movie(movie):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("""
        UPDATE movieTable SET title = ?, alternative_titles = ?, year = ?, image = ?, color = ?, score = ?, rating = ?, actors = ?, actor_facets = ?, genre = ?  
        WHERE objectID = ?
        """, 
        (movie['title'], movie['alternative_titles'], movie['year'], movie['image'], movie['color'], movie['score'], movie['rating'], movie['actors'], movie['actor_facets'], movie['genre'], movie['objectID']) 
        )
        conn.commit()
        update_algolia_index([movie],"update")
    except:
        conn.rollback()
    finally:
        conn.close()
    return 201


def delete_movie(movie_id):
    message = {}
    try:
        conn = connect_to_db()
        conn.execute("DELETE from movieTable WHERE objectID = ?", (movie_id,))
        conn.commit()
        message["status"] = "movie deleted successfully"
        movie = get_movie_by_id(movie_id)
        update_algolia_index([movie],"delete")
    except:
        conn.rollback()
        message["status"] = "Cannot delete movie"
    finally:
        conn.close()

    return message



database_generation()
movies = get_movies()
update_algolia_index(movies,"add")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/movies', methods=['GET'])
def api_get_movies():
    return jsonify(get_movies())

@app.route('/api/movies/<movie_id>', methods=['GET'])
def api_get_movie(movie_id):
    return jsonify(get_movie_by_id(movie_id))

@app.route('/api/movies/add',  methods = ['POST'])
def api_add_movie():
    movie = request.get_json()
    return jsonify(insert_movie(movie))

@app.route('/api/movies/update',  methods = ['PUT'])
def api_update_movie():
    movie = request.get_json()
    return jsonify(update_movie(movie))

@app.route('/api/movies/delete/<movie_id>',  methods = ['DELETE'])
def api_delete_movie(movie_id):
    return jsonify(delete_movie(movie_id))

if __name__ == "__main__":
    app.debug = True
    app.run(debug=True)
    app.run()