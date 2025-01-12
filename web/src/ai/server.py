from flask import Flask, request, jsonify
from flask_cors import CORS
from picture_analysis import analyze_image

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

@app.route("/api/analyze_image", methods=["POST"])
def analyze_image_endpoint():
    data = request.get_json()
    base64_string = data.get("selectedImage")
    if not base64_string:
        return jsonify({"error": "No image provided"}), 400
    
    # Log the received base64 string length
    print(f"Received image data length: {len(base64_string)}")
    print(f"Received image data: {base64_string[:100]}...")

    try:
        result = analyze_image(base64_string)
        return jsonify({"analysis": result})
    except Exception as e:
        print(f"Error analyzing image: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)