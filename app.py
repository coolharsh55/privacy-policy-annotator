from os import environ as env
from bottle import app
from bottle import request
from bottle import route
from bottle import response
from bottle import run
from bottle import static_file
from bottle import template
import json
from readability import Document
import requests

# the decorator
def enable_cors(fn):
    def _enable_cors(*args, **kwargs):
        # set CORS headers
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'

        if bottle.request.method != 'OPTIONS':
            # actual request; reply with the actual response
            return fn(*args, **kwargs)

    return _enable_cors


@route('/')
def home():
    return template('index')


@route('/extract')
@enable_cors
def extract():
	url = request.query.url
	if not url:
		response.status = 400
		return 'url incorrect'
	content = extract_data_from_page(url)
	return json.dumps(content)    


def extract_data_from_page(url):
	response = requests.get(url)
	doc = Document(response.text)
	return doc.content()


if __name__ == '__main__':
	run(debug=True, server='gunicorn', host='0.0.0.0', port=int(env.get("PORT", 5000)))