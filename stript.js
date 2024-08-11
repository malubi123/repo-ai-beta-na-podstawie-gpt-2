document.getElementById('queryForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const query = document.getElementById('query').value;
    const responseDiv = document.getElementById('response');
    responseDiv.innerText = 'Fetching responses...';

    fetch('https://api-inference.huggingface.co/models/gpt2', { // Zamień na aktualny endpoint, jeśli to konieczne
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: query })
    })
    .then(res => res.json())
    .then(data => {
        // Sprawdź, jak struktura odpowiedzi wygląda w rzeczywistości
        const generatedText = data[0]?.generated_text || 'No response';
        responseDiv.innerText = generatedText;
    })
    .catch(error => {
        responseDiv.innerText = 'An error occurred: ' + error.message;
    });
});
