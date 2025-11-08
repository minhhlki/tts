// Elements
const textInput = document.getElementById('textInput');
const languageSelect = document.getElementById('languageSelect');
const slowSpeedCheckbox = document.getElementById('slowSpeed');
const convertBtn = document.getElementById('convertBtn');
const clearBtn = document.getElementById('clearBtn');
const charCount = document.getElementById('charCount');
const resultSection = document.getElementById('resultSection');
const errorSection = document.getElementById('errorSection');
const audioPlayer = document.getElementById('audioPlayer');
const downloadBtn = document.getElementById('downloadBtn');
const errorMessage = document.getElementById('errorMessage');

let currentFilename = null;

// Update character count
textInput.addEventListener('input', () => {
    charCount.textContent = textInput.value.length;
});

// Convert button click
convertBtn.addEventListener('click', async () => {
    const text = textInput.value.trim();

    if (!text) {
        showError('Vui lòng nhập văn bản trước khi chuyển đổi!');
        return;
    }

    // Hide previous results and errors
    hideError();
    resultSection.style.display = 'none';

    // Show loading state
    setLoading(true);

    try {
        const response = await fetch('/api/tts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                language: languageSelect.value,
                slow: slowSpeedCheckbox.checked
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            currentFilename = data.filename;

            // Set audio source
            audioPlayer.src = `/api/play/${currentFilename}`;

            // Show result section
            resultSection.style.display = 'block';

            // Auto play
            audioPlayer.play().catch(err => {
                console.log('Auto-play prevented:', err);
            });
        } else {
            showError(data.error || 'Đã xảy ra lỗi khi chuyển đổi!');
        }
    } catch (error) {
        showError('Không thể kết nối đến server. Vui lòng thử lại!');
        console.error('Error:', error);
    } finally {
        setLoading(false);
    }
});

// Clear button click
clearBtn.addEventListener('click', () => {
    textInput.value = '';
    charCount.textContent = '0';
    resultSection.style.display = 'none';
    hideError();
    currentFilename = null;
    audioPlayer.src = '';
});

// Download button click
downloadBtn.addEventListener('click', () => {
    if (currentFilename) {
        window.location.href = `/api/download/${currentFilename}`;
    }
});

// Helper functions
function setLoading(loading) {
    const btnText = convertBtn.querySelector('.btn-text');
    const loader = convertBtn.querySelector('.loader');

    if (loading) {
        convertBtn.disabled = true;
        btnText.style.display = 'none';
        loader.style.display = 'block';
    } else {
        convertBtn.disabled = false;
        btnText.style.display = 'block';
        loader.style.display = 'none';
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorSection.style.display = 'block';
}

function hideError() {
    errorSection.style.display = 'none';
}

// Enter key to convert (with Ctrl/Cmd)
textInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        convertBtn.click();
    }
});

// Load sample text on page load (optional)
window.addEventListener('load', () => {
    const sampleTexts = {
        'vi': 'Xin chào! Đây là công cụ chuyển văn bản thành giọng nói.',
        'en': 'Hello! This is a text-to-speech tool.',
        'ja': 'こんにちは！これはテキスト読み上げツールです。',
        'ko': '안녕하세요! 텍스트 음성 변환 도구입니다.',
        'zh-CN': '你好！这是一个文本转语音工具。'
    };

    // Optional: Set sample text based on selected language
    languageSelect.addEventListener('change', () => {
        if (!textInput.value) {
            textInput.value = sampleTexts[languageSelect.value] || '';
            charCount.textContent = textInput.value.length;
        }
    });
});
