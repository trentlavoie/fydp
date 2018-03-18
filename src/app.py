from flask import Flask, render_template, request, jsonify
from flask_webpack import Webpack
from werkzeug.serving import run_simple
from werkzeug import secure_filename
from flaskext.mysql import MySQL
import os
import sys
import json
sys.path.insert(0, '../notebooks/rec')
from rmse import return_rmse

webpack = Webpack()

app = Flask(__name__, static_url_path='')

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = ''
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'demo'
app.config['MYSQL_DATABASE_HOST'] = ''
mysql.init_app(app)

#conn = mysql.connect()
#cursor =conn.cursor()
#use cursor to execute queries from now on

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
    filename = 'run_40.csv'
    if request != None and request.files != None and len(request.files) > 0:
        file = request.files['file'];
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    budget = request.form['budget'];
    car_types = request.form['car_types']
    preferences = json.loads(request.form['preferences'])
    filter_preferences = []

    gas = 0
    for preference in preferences:
        parameters = {}
        if 'clicked' in preference:
            parameters['car_attribute'] = preference['_id']
            parameters['clicked'] = preference['clicked']
            parameters['car_types'] = car_types
            filter_preferences.append(parameters)
            if parameters['car_attribute'] == 'Fuel  Economy':
                gas = parameters['clicked']

    print(filter_preferences)
    list_of_cars = return_rmse(budget, gas, filename, car_types)
    return jsonify(list_of_cars=list(list_of_cars))



if __name__ == '__main__':
    run_simple('localhost', 3001, app, use_reloader=True, use_debugger=True)
