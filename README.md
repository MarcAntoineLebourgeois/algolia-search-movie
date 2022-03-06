# algolia-search-movie

This project is an Algolia interview assessment.
Python & Flask are used for the back-end and TypeScript & React for the front-end.

## Installation

1- Clone the repository

### Back-end

In the back-end folder,

2- Use the package manager [pipenv](https://pipenv-es.readthedocs.io/es/stable/) and run the following commands:
Otherwise,

```bash
pip install --user pipenv
```

````bash
pipenv shell
pipenv install
export FLASK_APP=api
flask run

By default, the development server listens on [http://127.0.0.1:5000](http://127.0.0.1:5000)

### Front-end

In the front-end folder,

3- Use the package manager [yarn](https://yarnpkg.com/) or [nodejs-npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and run the following commands:

```bash
yarn install
yarn start
````

By default, the development server listens on [http://127.0.0.1:3000](http://127.0.0.1:3000)

## Tests

For back-end tests, go to the back-end folder:

```bash
pipenv run pytest
```

## Static analysis

For back-end analysis, go to the back-end folder:

```bash
pipenv run pylint
```

For front-end, go to the front-end folder:

```bash
yarn run check
```

## Notes:

- Algolia index has been created manually using the web console.
- For security concern, the frontend API key uses a search-only API key.
