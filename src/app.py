from flask import Flask, render_template, request
from flask_webpack import Webpack
from werkzeug.serving import run_simple
from werkzeug import secure_filename
from flaskext.mysql import MySQL
import os

webpack = Webpack()

databaseConn = 'mysql://bfef844a9a31a0:ae5c3305@us-cdbr-iron-east-03.cleardb.net/heroku_82c859f0679adfb?reconnect=true'

app = Flask(__name__, static_url_path='')

mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = ''
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = 'demo'
app.config['MYSQL_DATABASE_HOST'] = ''
mysql.init_app(app)

conn = mysql.connect()
cursor =conn.cursor()
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
    file = request.files['file'];
    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    return 'Success Code or Error Code here'

if __name__ == '__main__':
    run_simple('localhost', 3001, app, use_reloader=True, use_debugger=True)
