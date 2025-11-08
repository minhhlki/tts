# 🎙️ Công cụ chuyển văn bản thành giọng nói (Text-to-Speech)

Một ứng dụng web đơn giản nhưng mạnh mẽ để chuyển đổi văn bản thành giọng nói, hỗ trợ tiếng Việt và nhiều ngôn ngữ khác.

## ✨ Tính năng

- 🇻🇳 **Hỗ trợ tiếng Việt** và 10+ ngôn ngữ khác
- 🎨 **Giao diện đẹp mắt** và dễ sử dụng
- 🔊 **Phát ngay lập tức** hoặc tải xuống file âm thanh
- ⚡ **Tốc độ nhanh** với Google Text-to-Speech
- 📱 **Responsive** - hoạt động tốt trên mọi thiết bị
- 🎵 **Điều chỉnh tốc độ** đọc (bình thường/chậm)

## 🌍 Ngôn ngữ được hỗ trợ

- 🇻🇳 Tiếng Việt
- 🇺🇸 English
- 🇯🇵 Japanese (日本語)
- 🇰🇷 Korean (한국어)
- 🇨🇳 Chinese (中文)
- 🇫🇷 French (Français)
- 🇩🇪 German (Deutsch)
- 🇪🇸 Spanish (Español)
- 🇮🇹 Italian (Italiano)
- 🇷🇺 Russian (Русский)

## 📋 Yêu cầu hệ thống

- Python 3.7 trở lên
- pip (Python package manager)

## 🚀 Cài đặt

### 1. Clone repository

```bash
git clone <repository-url>
cd tts
```

### 2. Cài đặt các thư viện cần thiết

```bash
pip install -r requirements.txt
```

### 3. Chạy ứng dụng

```bash
python app.py
```

### 4. Truy cập ứng dụng

Mở trình duyệt và truy cập: `http://localhost:5000`

## 💻 Cách sử dụng

1. **Nhập văn bản** bạn muốn chuyển đổi vào ô văn bản
2. **Chọn ngôn ngữ** phù hợp từ danh sách
3. **Tùy chọn**: Bật "Tốc độ chậm" nếu muốn giọng đọc chậm hơn
4. Nhấn nút **"Chuyển đổi"**
5. **Nghe** ngay lập tức hoặc **tải xuống** file âm thanh

### Phím tắt

- `Ctrl + Enter` (hoặc `Cmd + Enter` trên Mac): Chuyển đổi văn bản

## 📁 Cấu trúc dự án

```
tts/
├── app.py                 # Flask backend
├── requirements.txt       # Python dependencies
├── README.md             # Tài liệu
├── templates/
│   └── index.html        # Giao diện HTML
└── static/
    ├── css/
    │   └── style.css     # Styles
    └── js/
        └── script.js     # JavaScript logic
```

## 🛠️ Công nghệ sử dụng

- **Backend**: Flask (Python web framework)
- **TTS Engine**: gTTS (Google Text-to-Speech)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Design**: Gradient backgrounds, responsive layout

## 🔧 API Endpoints

### POST `/api/tts`
Chuyển đổi văn bản thành giọng nói

**Request Body:**
```json
{
  "text": "Văn bản cần chuyển đổi",
  "language": "vi",
  "slow": false
}
```

**Response:**
```json
{
  "success": true,
  "filename": "tts_20231108_120000.mp3",
  "message": "Chuyển đổi thành công!"
}
```

### GET `/api/play/<filename>`
Phát file âm thanh

### GET `/api/download/<filename>`
Tải xuống file âm thanh

## 🎯 Tính năng nâng cao

### Tự động dọn dẹp
Ứng dụng tự động xóa các file âm thanh cũ hơn 1 giờ để tiết kiệm dung lượng.

### Xử lý lỗi
- Kiểm tra văn bản rỗng
- Xử lý lỗi kết nối
- Thông báo lỗi thân thiện

## 🐛 Khắc phục sự cố

### Lỗi: "Module not found"
```bash
pip install -r requirements.txt
```

### Lỗi: "Port already in use"
Thay đổi port trong `app.py`:
```python
app.run(debug=True, host='0.0.0.0', port=8080)
```

### Lỗi tiếng Việt không phát đúng
Đảm bảo chọn đúng ngôn ngữ "🇻🇳 Tiếng Việt" trong dropdown.

## 📝 Lưu ý

- File âm thanh được lưu tạm thời trên server
- File sẽ tự động xóa sau 1 giờ
- Văn bản quá dài có thể mất nhiều thời gian xử lý
- Cần kết nối internet để sử dụng gTTS

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo pull request hoặc báo cáo issue.

## 📄 Giấy phép

MIT License - Tự do sử dụng cho mục đích cá nhân và thương mại.

## 👨‍💻 Tác giả

Made with ❤️ using Claude AI

## 🔮 Tính năng tương lai

- [ ] Thêm nhiều giọng đọc khác nhau
- [ ] Hỗ trợ upload file văn bản
- [ ] Lưu lịch sử chuyển đổi
- [ ] Tích hợp thêm TTS engines
- [ ] Export nhiều định dạng audio (WAV, OGG, etc.)
- [ ] API authentication
- [ ] Voice customization (pitch, speed, volume)

---

**Enjoy using the Text-to-Speech tool! 🎉**
