import argparse
import requests
from readability import Document

parser = argparse.ArgumentParser()
parser.add_argument(
    '-u', '--url', dest='url', help='url of policy', metavar='URL',
    required=True)
parser.add_argument(
    '-d', '--dest', dest='filepath', help='file to save policy',
    metavar='FILE', required=True)

args = parser.parse_args()
url = args.url
filepath = args.filepath
print(url, filepath)

response = requests.get(url)
doc = Document(response.text)
doc.title()
with open(filepath, 'w') as fd:
    fd.write(doc.content())
