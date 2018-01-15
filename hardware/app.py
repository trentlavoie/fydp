#!venv/bin/python
import os
import json
from flask import Flask, request, jsonify

SAVE_FOLDER = '~/fydp-data/recording/'

if not os.path.exists(SAVE_FOLDER):
    os.makedirs(SAVE_FOLDER)

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)


@app.route('/api/<string:filename>', methods=['POST'])
def create_task(filename):
    if not request.json:
        abort(400)
    with open(SAVE_FOLDER + filename + '.json', 'w') as f:
        f.write(request.json)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'}


