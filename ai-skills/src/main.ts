import type { OmdbResponse } from "./models/OmdbResponse";
import "./style.css";

const showError = (message: string) => {
  const errorEl = document.querySelector<HTMLDivElement>("#error");
  if (errorEl) errorEl.textContent = message;
};

const clearError = () => showError("");

export const getMovies = async (query: string) => {
  if (query.length < 2) {
    showError("Du måste skriva minst två tecken för att söka.");
    return;
  }

  clearError();

  try {
    const response = await fetch(
      `https://omdbapi.com/?apikey=416ed51a&s=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      showError("Något gick fel vid hämtning av filmer. Försök igen senare.");
      return;
    }

    const data: OmdbResponse = await response.json();
    const moviesContainer = document.querySelector("#movies");

    if (!moviesContainer) return;
    moviesContainer.innerHTML = "";

    if (data.Response === "False") {
      showError(
        data.Error ?? "Inga filmer hittades. Försök med ett annat sökord."
      );
      return;
    }

    data.Search.forEach((movie) => {
      const movieElement = document.createElement("div");
      movieElement.innerHTML = `
        <h2>${movie.Title}</h2>
        <img src="${movie.Poster}" alt="${movie.Title} poster" />
      `;
      moviesContainer.appendChild(movieElement);
    });
  } catch {
    showError("Kunde inte ansluta till filmtjänsten. Kontrollera din internetanslutning.");
  }
};

document.querySelector("#getMovies")?.addEventListener("click", () => {
  const input = document.querySelector<HTMLInputElement>("#searchInput");
  const query = input?.value.trim() ?? "";
  getMovies(query);
});
