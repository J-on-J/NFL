
document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "3dd0515b-9074-4f57-9ab9-9d146dcb44f1";
    const gamesContainer = document.getElementById("games-container");

    fetch("https://api.dailyfantasyapi.io/v1/games/upcoming?league=NFL", {
        headers: { "x-api-key": apiKey }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to fetch games");
        }
        return response.json();
    })
    .then(data => {
        gamesContainer.innerHTML = "";
        if (data.length === 0) {
            gamesContainer.textContent = "No upcoming games found.";
            return;
        }
        data.forEach(game => {
            const gameElement = document.createElement("div");
            gameElement.className = "game";
            gameElement.innerHTML = `
                <h2>${game.homeTeam.name} vs. ${game.awayTeam.name}</h2>
                <p>League: ${game.league}</p>
                <p>Date: ${new Date(game.startTimestamp * 1000).toLocaleString()}</p>
            `;
            gamesContainer.appendChild(gameElement);
        });
    })
    .catch(error => {
        gamesContainer.textContent = "An error occurred while loading games.";
        console.error(error);
    });
});
