# Công cụ chuyển văn bản thành giọng nói

Công cụ đơn giản chuyển văn bản thành giọng nói, hỗ trợ tiếng Việt và nhiều ngôn ngữ khác. Chạy trên máy tính cá nhân.

## Tính năng

- Hỗ trợ tiếng Việt và 8+ ngôn ngữ khác
- Giao diện đơn giản, gọn gàng, dễ sử dụng
- Phát audio ngay lập tức
- Tải xuống file MP3
- Điều chỉnh tốc độ đọc

## Cài đặt

### Yêu cầu
- Python 3.7+
- pip

### Các bước cài đặt

1. Cài đặt thư viện:
```bash
pip install -r requirements.txt
```

2. Chạy ứng dụng:
```bash
python app.py
```

3. Mở trình duyệt và truy cập:
```
http://localhost:5000
```

## Cách sử dụng

1. Nhập văn bản vào ô văn bản
2. Chọn ngôn ngữ (mặc định: Tiếng Việt)
3. Tùy chọn: Chọn "Tốc độ chậm" nếu cần
4. Nhấn "Chuyển đổi"
5. Nghe hoặc tải xuống file audio

### Phím tắt
- `Ctrl + Enter` (Windows/Linux) hoặc `Cmd + Enter` (Mac): Chuyển đổi văn bản

## Ngôn ngữ hỗ trợ

- Tiếng Việt
- English
- 日本語 (Japanese)
- 한국어 (Korean)
- 中文 (Chinese)
- Français (French)
- Deutsch (German)
- Español (Spanish)

## Công nghệ

- **Backend**: Flask
- **TTS**: Google Text-to-Speech (gTTS)
- **Frontend**: HTML, CSS, JavaScript

## Cấu trúc

```
tts/
├── app.py              # Flask backend
├── requirements.txt    # Dependencies
├── README.md          # Tài liệu
├── templates/
│   └── index.html     # Giao diện
└── static/
    ├── css/
    │   └── style.css  # Styling
    └── js/
        └── script.js  # Logic
```

## Lưu ý

- File audio được lưu tạm và tự động xóa sau 1 giờ
- Cần kết nối internet để sử dụng gTTS
- Chỉ sử dụng nội bộ trên máy cá nhân

## Khắc phục sự cố

**Lỗi: Module not found**
```bash
pip install -r requirements.txt
```

**Lỗi: Port đã được sử dụng**

Đổi port trong `app.py` (dòng cuối):
```python
app.run(debug=True, host='0.0.0.0', port=8080)
```

## License

MIT License
