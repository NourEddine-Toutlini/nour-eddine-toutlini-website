from flask import Flask, render_template, send_from_directory
import json
import os

app = Flask(__name__)

# Load content data
def load_data():
    with open('data/content.json', 'r', encoding='utf-8') as f:
        return json.load(f)

@app.route('/')
def home():
    data = load_data()
    return render_template('index.html', data=data)

@app.route('/research')
def research():
    data = load_data()
    return render_template('research.html', data=data)

@app.route('/publications')
def publications():
    data = load_data()
    return render_template('publications.html', data=data)

@app.route('/cv')
def cv():
    data = load_data()
    return render_template('cv.html', data=data)

@app.route('/talks')
def talks():
    data = load_data()
    return render_template('talks.html', data=data)

@app.route('/simulations')
def simulations():
    data = load_data()
    return render_template('simulations.html', data=data)

@app.route('/download/<filename>')
def download_file(filename):
    return send_from_directory('static/files', filename)

# This is important for Vercel
if __name__ == '__main__':
    app.run(debug=False)