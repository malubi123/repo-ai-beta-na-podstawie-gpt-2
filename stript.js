const apiKey = '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'; // Zamień na swój rzeczywisty klucz

document.getElementById('queryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const query = document.getElementById('query').value;
    const responseDiv = document.getElementById('response');
    responseDiv.innerText = 'Fetching responses...';

    fetch('https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3.1-8B-Instruct', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: query })
    })
    .then(res => res.json())
    .then(data => {
        // Dopasuj przetwarzanie danych do struktury odpowiedzi
        const generatedText = data[0]?.generated_text || 'No response';
        responseDiv.innerText = generatedText;
    })
    .catch(error => {
        responseDiv.innerText = 'An error occurred: ' + error.message;
    });
});
