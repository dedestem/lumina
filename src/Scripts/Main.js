let searchTimeout; // Store timeout ID globally

function generateResult(content) {
    const result = document.createElement('div');
    result.classList.add('Result');

    const paragraph = document.createElement('p');
    paragraph.innerHTML = content; // Use innerHTML to allow links
    result.appendChild(paragraph);

    document.body.appendChild(result);
}

function evaluateExpression(expression) {
    try {
        const sanitizedExpression = expression.replace(/[^0-9+\-*/.() ]/g, ""); // Allow only numbers and operators
        const result = eval(sanitizedExpression); // Use eval safely after sanitizing input
        return `Result: ${result}`;
    } catch (error) {
        return "Error: Invalid expression";
    }
}

function generateSearchResults(term) {
    const lowerCaseTerm = term.toLowerCase();

    // Wikipedia search
    if (lowerCaseTerm.includes("wikipedia")) {
        const query = term.replace("wikipedia", "").trim();
        generateResult(`<a href="https://wikipedia.org" target="_blank">Wikipedia Homepage</a>`);
        if (query) {
            generateResult(`<a href="https://en.wikipedia.org/wiki/${encodeURIComponent(query)}" target="_blank">Search Wikipedia for "${query}"</a>`);
        }
    }

    // YouTube search
    if (lowerCaseTerm.includes("youtube")) {
        const query = term.replace("youtube", "").trim();
        generateResult(`<a href="https://youtube.com" target="_blank">YouTube Homepage</a>`);
        if (query) {
            generateResult(`<a href="https://www.youtube.com/results?search_query=${encodeURIComponent(query)}" target="_blank">Search YouTube for "${query}"</a>`);
        }
    }

    // GitHub search
    if (lowerCaseTerm.includes("github")) {
        const query = term.replace("github", "").trim();
        generateResult(`<a href="https://github.com" target="_blank">GitHub Homepage</a>`);
        if (query) {
            generateResult(`<a href="https://github.com/search?q=${encodeURIComponent(query)}" target="_blank">Search GitHub for "${query}"</a>`);
        }
    }

    // Roblox search
    if (lowerCaseTerm.includes("roblox")) {
        const query = term.replace("roblox", "").trim();
        generateResult(`<a href="https://www.roblox.com" target="_blank">Roblox Homepage</a>`);
        if (query) {
            generateResult(`<a href="https://www.roblox.com/catalog?CatalogSearch=${encodeURIComponent(query)}" target="_blank">Search Roblox for "${query}"</a>`);
        }
    }

    // General search fallback (e.g., Google)
    if (!lowerCaseTerm.includes("wikipedia") && !lowerCaseTerm.includes("youtube") &&
        !lowerCaseTerm.includes("github") && !lowerCaseTerm.includes("roblox")) {
        generateResult(`<a href="https://www.google.com/search?q=${encodeURIComponent(term)}" target="_blank">Search Google for "${term}"</a>`);
    }
}

function search() {
    const loader = document.getElementById("Loader");
    loader.style.display = "flex";

    // Clear previous results
    const existingResults = document.querySelectorAll('.Result');
    existingResults.forEach(result => result.remove());

    // Cancel previous search
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }

    const searchTerm = document.getElementById("Searchbar").value.trim();

    // Start new timeout
    searchTimeout = setTimeout(() => {
        loader.style.display = "none";

        if (/^[0-9+\-*/.() ]+$/.test(searchTerm)) {
            // Math expression detected
            const result = evaluateExpression(searchTerm);
            generateResult(result);
        } else if (searchTerm) {
            // General search functionality
            generateSearchResults(searchTerm);
        } else {
            
        }
    }, 1000); // Adjust the timeout as needed
}

document.addEventListener('DOMContentLoaded', () => {
    const searchbar = document.getElementById("Searchbar");
    const loader = document.getElementById("Loader");

    searchbar.addEventListener("input", search);
    loader.style.display = "none";
});
