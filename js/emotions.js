const openEmotionBtn = document.querySelector('.open-modal-btn-1');
const emotionModal = document.getElementById('modal-1');
const closeEmotionBtn = document.getElementById('closeModal-1');
const analyzeButton = document.getElementById('analyze-button');
const userText = document.getElementById('user-text');
const emotionResultDiv = document.getElementById('emotion-result');
const loadingIcon = document.getElementById('loading-icon-1');

// Open modal
openEmotionBtn.addEventListener('click', () => {
    emotionModal.style.display = 'flex';
});

// Close modal
closeEmotionBtn.addEventListener('click', () => {
    emotionModal.style.display = 'none';
    resetForm();
});

// Close modal when clicking outside of modal content
window.addEventListener('click', (event) => {
    if (event.target === emotionModal) {
        emotionModal.style.display = 'none';
        resetForm();
    }
});

// Enable/disable button based on text input
userText.addEventListener('input', () => {
    analyzeButton.disabled = userText.value.trim() === "";
});

// Reset form function
function resetForm() {
    userText.value = '';
    emotionResultDiv.innerHTML = '';
    analyzeButton.disabled = true;
    loadingIcon.style.display = 'none';  // Hide loading icon
    analyzeButton.querySelector('span').textContent = 'Analyze Emotion';
}

// Analyze emotion when button is clicked
analyzeButton.addEventListener('click', async () => {
    const text = userText.value.trim();
    if (!text) return;

    // Disable the button, show loading icon, and change button text
    analyzeButton.disabled = true;
    loadingIcon.style.display = 'inline-block';  // Show loading icon
    analyzeButton.querySelector('span').textContent = 'Processing...';
    emotionResultDiv.innerHTML = '';

    // IBM Watson NLU API credentials and URL
    const apiKey = "3STdTsPtflEU_qm0y49R_hJnKVEKMq3eOT77NcrgAtww";
    const url = "https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/5938cc01-dddf-4b90-8e61-17f9f2652852/v1/analyze?version=2019-07-12";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`apikey:${apiKey}`)
            },
            body: JSON.stringify({
                text: text,
                features: {
                    keywords: {
                        emotion: true,
                        limit: 1
                    }
                }
            })
        });

        if (!response.ok) {
            throw new Error('Emotion analysis failed');
        }

        const data = await response.json();
        const emotions = data.keywords[0]?.emotion;
        if (emotions) {
            const emotionPercentages = {
                joy: (emotions.joy * 100).toFixed(2),
                fear: (emotions.fear * 100).toFixed(2),
                sadness: (emotions.sadness * 100).toFixed(2),
                disgust: (emotions.disgust * 100).toFixed(2),
                anger: (emotions.anger * 100).toFixed(2)
            };

            emotionResultDiv.innerHTML = `
                <h3 class="result">Emotion Analysis:</h3>
                <p class="result">😊 Joy: ${emotionPercentages.joy}%</p>
                <p class="result">😨 Fear: ${emotionPercentages.fear}%</p>
                <p class="result">😢 Sadness: ${emotionPercentages.sadness}%</p>
                <p class="result">🤢 Disgust: ${emotionPercentages.disgust}%</p>
                <p class="result">😡 Anger: ${emotionPercentages.anger}%</p>
            `;
        } else {
            emotionResultDiv.innerHTML = `<p class="result">No significant emotions detected</p>.`;
        }
    } catch (error) {
        console.error('Error:', error);
        emotionResultDiv.innerHTML = `<p class="result danger">Error in analyzing emotions.</p>`;
    } finally {
        // Re-enable button and hide loading icon after processing
        analyzeButton.disabled = false;
        loadingIcon.style.display = 'none';  // Hide loading icon after processing
        analyzeButton.querySelector('span').textContent = 'Analyze Emotion';
    }
});
