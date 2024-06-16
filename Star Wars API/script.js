document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const resultsText = document.getElementById('results-text');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            fetch(`https://swapi.dev/api/people/?search=${query}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results.length > 0) {
                        const character = data.results[0];
                        resultsText.innerHTML = `
                            <strong>Name:</strong> ${character.name}<br>
                            <strong>Height:</strong> ${character.height}<br>
                            <strong>Mass:</strong> ${character.mass}<br>
                            <strong>Hair Color:</strong> ${character.hair_color}<br>
                            <strong>Skin Color:</strong> ${character.skin_color}<br>
                            <strong>Eye Color:</strong> ${character.eye_color}<br>
                            <strong>Birth Year:</strong> ${character.birth_year}<br>
                            <strong>Gender:</strong> ${character.gender}
                        `;
                    } else {
                        resultsText.innerHTML = 'No results found.';
                    }
                })
                .catch(error => {
                    resultsText.innerHTML = `Error: ${error.message}`;
                });
        } else {
            resultsText.innerHTML = 'Please enter a search term.';
        }
    });
});