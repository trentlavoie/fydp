from flask import Flask, render_template, request
from flask_webpack import Webpack
from werkzeug.serving import run_simple
from werkzeug import secure_filename
from flaskext.mysql import MySQL
import json
import os
from recommendation import recommendation_process

webpack = Webpack()

app = Flask(__name__, static_url_path='')
credentials = {
  "DATABASE_USER": "",
  "DATABASE_PASSWORD": "",
  "HOST": "",
  "DB": ""
}

with open('credentials.json') as data_file:
    credentials = json.load(data_file)

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = credentials['DATABASE_USER']
app.config['MYSQL_DATABASE_PASSWORD'] = credentials['DATABASE_PASSWORD']
app.config['MYSQL_DATABASE_DB'] = credentials['DB']
app.config['MYSQL_DATABASE_HOST'] = credentials['HOST']
mysql.init_app(app)

conn = mysql.connect()
cursor = conn.cursor()

params = {
    'DEBUG': True,
    'WEBPACK_MANIFEST_PATH': './build/manifest.json'
}

UPLOAD_FOLDER = 'tmp/'
ALLOWED_EXTENSIONS = set(['txt'])

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config.update(params)

webpack.init_app(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.jinja2')

@app.route('/process', methods=['POST'])
def process_preference_data():
    if request != None and request.files != None and len(request.files) > 0:
        file = request.files['file'];
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    budget = request.form['budget'];
    car_types = request.form['car_types']
    preferences = json.loads(request.form['preferences'])

    filter_preferences = []

    for preference in preferences:
        parameters = {}

        if 'clicked' in preference:
            parameters['car_attribute'] = preference['_id']
            parameters['clicked'] = preference['clicked']
            filter_preferences.append(parameters)

    filter_data = preferences

    #Query for car data here based on car_types and budget (we'll use preferences later)
    #recommendation_process(preferences, [])

    return 'None'


if __name__ == '__main__':
    run_simple('localhost', 3001, app, use_reloader=True, use_debugger=True)
