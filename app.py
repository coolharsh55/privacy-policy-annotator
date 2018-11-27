from os import environ as env
from bottle import app
from bottle import hook
from bottle import request
from bottle import route
from bottle import response
from bottle import run
from bottle import static_file
from bottle import template
import json
from readability import Document
import requests


@hook('after_request')
def enable_cors():
    response.headers['Access-Control-Allow-Origin'] = '*'


@route('/')
def home():
    return template('index')


@route('/extract')
def extract():
	try:
		url = request.query.url
		if not url:
			response.status = 400
			return 'url incorrect'
		content = extract_data_from_page(url)
	except Exception:
		return 0
	response.headers['Content-type'] = 'application/json'
	return json.dumps(content)    


def extract_data_from_page(url):
	response = requests.get(url)
	doc = Document(response.text)
	return doc.content()


if __name__ == '__main__':
	run(debug=True, server='gunicorn', host='0.0.0.0', port=int(env.get("PORT", 5000)))