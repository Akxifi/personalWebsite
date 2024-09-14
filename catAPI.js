document.addEventListener('DOMContentLoaded', function() {
    const catFactDiv = document.getElementById('cat-fact');
    const newFactButton = document.getElementById('new-fact');

    async function getCatFact() {
        try {
            const response = await fetch('https://catfact.ninja/fact');
            const data = await response.json();

            // Add fade-in effect when updating the fact
            catFactDiv.style.opacity = 0;  // Start fade-out
            setTimeout(() => {
                catFactDiv.innerHTML = data.fact;
                catFactDiv.style.opacity = 1;  // Fade-in
            }, 300);  // Wait 300ms before updating the text
        } catch (error) {
            console.error('Error fetching the cat fact:', error);
            catFactDiv.innerHTML = "Couldn't load a new fact, try again later.";
        }
    }

    getCatFact();  // Load a fact when the page loads

    newFactButton.addEventListener('click', getCatFact);
});
