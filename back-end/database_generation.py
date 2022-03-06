import json
import sqlite3
from datetime import datetime


def database_generation():
    database = sqlite3.connect("./database.sqlite")
    with open("./movies.json", encoding="utf-8-sig") as json_file:
        json_data = json.loads(json_file.read())

    # Aim of this block is to get the list of the columns in the JSON file.
    columns = []
    column = []
    for data in json_data:
        column = list(data.keys())
        for col in column:
            if col not in columns:
                columns.append(col)

    # Here we get values of the columns in the JSON file in the right order.
    value = []
    values = []
    for data in json_data:
        for col in columns:
            if isinstance(dict(data).get(col), list):
                value.append(str(dict(data).get(col)))
            else:
                value.append(dict(data).get(col))
        values.append(value)
        value.clear()

    # Time to generate the create and insert queries and apply it to the sqlite3 database
    create_query = "create table if not exists movieTable ({})".format(
        ",".join(columns)
    )
    insert_query = "insert into movieTable ({0}) values (?{1})".format(
        ",".join(columns), ",?" * (len(columns) - 1)
    )
    print("insert has started at " + str(datetime.now()))
    cur = database.cursor()
    cur.execute(create_query)
    cur.executemany(insert_query, values)
    values.clear()
    database.commit()
    cur.close()
    print("insert has completed at " + str(datetime.now()))
