from flask import Flask, render_template, request, jsonify
from flask_cors import CORS  # Import CORS
import language_tool_python

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

tool = language_tool_python.LanguageTool('en-US')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/correct', methods=['POST'])
def essay():
    data = request.get_json()
    original_text = data.get('text', '')
    matches = tool.check(original_text)
    corrected_text = language_tool_python.utils.correct(original_text, matches)

    # Sentiment analysis placeholder (you can replace this with a real sentiment analysis later)
    sentiment = 'Neutral'  # Placeholder for sentiment, can be enhanced later

    return jsonify({
        'original': original_text,
        'corrected': corrected_text,
        'sentiment': sentiment,
    })

if __name__ == '__main__':
    app.run(debug=True)



