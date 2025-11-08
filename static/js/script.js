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
    hideResult();

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
            showResult();

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
    hideResult();
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
    if (loading) {
        convertBtn.disabled = true;
        convertBtn.classList.add('loading');
    } else {
        convertBtn.disabled = false;
        convertBtn.classList.remove('loading');
    }
}

function showResult() {
    resultSection.classList.add('show');
}

function hideResult() {
    resultSection.classList.remove('show');
}

function showError(message) {
    errorMessage.textContent = message;
    errorSection.classList.add('show');
}

function hideError() {
    errorSection.classList.remove('show');
}

// Enter key to convert (with Ctrl/Cmd)
textInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        convertBtn.click();
    }
});
