from flask import Flask, render_template, request
from flask_webpack import Webpack
from werkzeug.serving import run_simple
from werkzeug import secure_filename
import os

webpack = Webpack()

databaseConn = 'mysql://bfef844a9a31a0:ae5c3305@us-cdbr-iron-east-03.cleardb.net/heroku_82c859f0679adfb?reconnect=true'

app = Flask(__name__, static_url_path='')

#Initialize database connection string
#app.config['SQLALCHEMY_POOL_TIMEOUT'] = 1
#app.config['SQLALCHEMY_POOL_SIZE'] = 1000
#app.config['SQLALCHEMY_DATABASE_URI'] = databaseConn
#app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
#app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = False
#db = SQLAlchemy(app)

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
