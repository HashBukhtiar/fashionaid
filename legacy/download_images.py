from flask import Flask, request
import os

app = Flask(__name__)
UPLOAD_FOLDER = '/images'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return 'No image part', 400
    file = request.files['image']
    if file.filename == '':
        return 'No selected image', 400
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
    return 'Image uploaded successfully', 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
