import requests
from readability import Document

response = requests.get(URL)
doc = Document(response.text)
doc.title()
with open(FILEPATH, 'w') as fd:
    fd.write(doc.summary())
