document.getElementById('convert-button').addEventListener('click', async () => {
    const text = document.getElementById('text-input').value.trim();
    const convertButton = document.getElementById('convert-button');
    const loadingIcon = document.getElementById('loading-icon');

    if (!text) {
        alert('Please enter some text.');
        return;
    }
    convertButton.disabled = true;
    loadingIcon.style.display = 'inline-block';
    convertButton.querySelector('span').textContent = 'Processing...';

    const fileNameWords = text.split(/\s+/).slice(0, 2).join('_');
    const fileName = fileNameWords || "audio";  

    const apiKey = "ZRHTXfiBJCwoiBQiDwm6DDwdMvzFTL0D92UsJK21WSiH";
    const url = "https://api.au-syd.text-to-speech.watson.cloud.ibm.com/instances/b9beb9ce-485b-4682-84bf-f70d787bf4f5/v1/synthesize?voice=en-US_MichaelV3Voice";

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'audio/wav',
                'Authorization': 'Basic ' + btoa(`apikey:${apiKey}`)
            },
            body: JSON.stringify({ text: text })
        });

        if (!response.ok) {
            throw new Error('Text-to-Speech conversion failed');
        }

        const audioBlob = await response.blob();
        const audioUrl = window.URL.createObjectURL(audioBlob);

        const downloadLink = document.createElement('a');
        downloadLink.href = audioUrl;
        downloadLink.download = `${fileName}.wav`;  
        downloadLink.click();

        convertButton.disabled = false;
        loadingIcon.style.display = 'none';
        convertButton.querySelector('span').textContent = 'Convert to Speech';

        window.URL.revokeObjectURL(audioUrl);
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to convert text to speech.');

        convertButton.disabled = false;
        loadingIcon.style.display = 'none';
        convertButton.querySelector('span').textContent = 'Convert to Speech';
    }
});
