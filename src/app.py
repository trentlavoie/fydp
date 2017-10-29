from flask import Flask, render_template
from flask_webpack import Webpack
from werkzeug.serving import run_simple
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

app.config.update(params)

webpack.init_app(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.jinja2')

if __name__ == '__main__':
    run_simple('localhost', 3001, app, use_reloader=True, use_debugger=True)
