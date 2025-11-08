from flask import Flask, render_template, request, send_file, jsonify
from gtts import gTTS
import os
import tempfile
from datetime import datetime

app = Flask(__name__)

# Tạo thư mục tạm để lưu file audio
TEMP_FOLDER = tempfile.gettempdir()

@app.route('/')
def index():
    """Trang chủ"""
    return render_template('index.html')

@app.route('/api/tts', methods=['POST'])
def text_to_speech():
    """API chuyển văn bản thành giọng nói"""
    try:
        data = request.get_json()
        text = data.get('text', '')
        language = data.get('language', 'vi')
        slow = data.get('slow', False)

        if not text:
            return jsonify({'error': 'Vui lòng nhập văn bản'}), 400

        # Tạo file audio
        tts = gTTS(text=text, lang=language, slow=slow)

        # Tạo tên file duy nhất
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f'tts_{timestamp}.mp3'
        filepath = os.path.join(TEMP_FOLDER, filename)

        # Lưu file
        tts.save(filepath)

        return jsonify({
            'success': True,
            'filename': filename,
            'message': 'Chuyển đổi thành công!'
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/download/<filename>')
def download_file(filename):
    """Download file audio"""
    try:
        filepath = os.path.join(TEMP_FOLDER, filename)
        if os.path.exists(filepath):
            return send_file(filepath, as_attachment=True, download_name=filename)
        else:
            return jsonify({'error': 'File không tồn tại'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/play/<filename>')
def play_file(filename):
    """Phát file audio"""
    try:
        filepath = os.path.join(TEMP_FOLDER, filename)
        if os.path.exists(filepath):
            return send_file(filepath, mimetype='audio/mpeg')
        else:
            return jsonify({'error': 'File không tồn tại'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Cleanup old files khi khởi động
def cleanup_old_files():
    """Xóa các file audio cũ"""
    try:
        for filename in os.listdir(TEMP_FOLDER):
            if filename.startswith('tts_') and filename.endswith('.mp3'):
                filepath = os.path.join(TEMP_FOLDER, filename)
                # Xóa file cũ hơn 1 giờ
                if os.path.getmtime(filepath) < datetime.now().timestamp() - 3600:
                    os.remove(filepath)
    except Exception as e:
        print(f"Error cleaning up files: {e}")

if __name__ == '__main__':
    cleanup_old_files()
    app.run(debug=True, host='0.0.0.0', port=5000)
