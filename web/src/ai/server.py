from flask import Flask, request, jsonify
from flask_cors import CORS
from picture_analysis import analyze_image

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route("/api/analyze_image", methods=["POST"])
def analyze_image_endpoint():
    data = request.get_json()
    result = analyze_image(data["base64_string"])
    return jsonify({"analysis": result})

if __name__ == '__main__':
    app.run(debug=True, port=5000)