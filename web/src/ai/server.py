from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows React frontend to connect

@app.route('/api/process', methods=['POST'])
def process_string():
    # Get JSON data from the frontend
    data = request.json
    input_string = data.get('input_string', '')

    # Perform any operation on the string
    reversed_string = input_string[::-1]  # Reverse the string as an example

    return jsonify({
        "original": input_string,
        "processed": reversed_string
    })

if __name__ == '__main__':
    app.run(debug=True)