// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { OmdbResponse } from "../models/OmdbResponse";

// Import after environment is set up
import { getMovies } from "../main";

const mockResponse: OmdbResponse = {
  Response: "True",
  Search: [
    {
      Title: "Star Wars",
      Year: "1977",
      imdbID: "tt0076759",
      Type: "movie",
      Poster: "https://example.com/sw.jpg",
    },
    {
      Title: "Star Trek",
      Year: "1979",
      imdbID: "tt0079945",
      Type: "movie",
      Poster: "N/A",
    },
  ],
};

const mockFetch = (data: unknown, ok = true) =>
  vi.fn().mockResolvedValue({
    ok,
    json: vi.fn().mockResolvedValue(data),
  });

describe("getMovies", () => {
  let moviesContainer: HTMLElement;
  let errorContainer: HTMLElement;

  beforeEach(() => {
    // Arrange: set up #movies and #error elements in the document
    moviesContainer = document.createElement("div");
    moviesContainer.id = "movies";
    document.body.appendChild(moviesContainer);

    errorContainer = document.createElement("div");
    errorContainer.id = "error";
    document.body.appendChild(errorContainer);

    vi.stubGlobal("fetch", mockFetch(mockResponse));
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  // Happy path: renders a card for each movie
  it("renders a movie card for each result", async () => {
    // Act
    await getMovies("star");

    // Assert
    const cards = moviesContainer.querySelectorAll("div");
    expect(cards.length).toBe(mockResponse.Search.length);
  });

  // Happy path: movie title appears in the DOM
  it("displays the movie title in each card", async () => {
    // Act
    await getMovies("star");

    // Assert
    expect(moviesContainer.innerHTML).toContain("Star Wars");
    expect(moviesContainer.innerHTML).toContain("Star Trek");
  });

  // Happy path: movie poster image is rendered with correct src and alt
  it("renders a poster image with correct src and alt attributes", async () => {
    // Act
    await getMovies("star");

    // Assert
    const img = moviesContainer.querySelector("img") as HTMLImageElement;
    expect(img.src).toBe("https://example.com/sw.jpg");
    expect(img.alt).toBe("Star Wars poster");
  });

  // Edge case: calling getMovies twice clears previous results
  it("clears previous results before rendering new ones", async () => {
    // Arrange: populate container with stale content
    moviesContainer.innerHTML = "<p>old content</p>";

    // Act
    await getMovies("star");

    // Assert: stale content is gone, only new cards remain
    expect(moviesContainer.innerHTML).not.toContain("old content");
    expect(moviesContainer.querySelectorAll("div").length).toBe(
      mockResponse.Search.length,
    );
  });

  // Invalid input: query shorter than 2 characters shows error and does not fetch
  it("shows an error and does not fetch when query is shorter than 2 characters", async () => {
    // Act
    await getMovies("a");

    // Assert
    expect(errorContainer.textContent).toBeTruthy();
    expect(vi.mocked(fetch)).not.toHaveBeenCalled();
    expect(moviesContainer.innerHTML).toBe("");
  });

  // Invalid input: empty string also blocked
  it("shows an error and does not fetch for an empty query", async () => {
    // Act
    await getMovies("");

    // Assert
    expect(errorContainer.textContent).toBeTruthy();
    expect(vi.mocked(fetch)).not.toHaveBeenCalled();
  });

  // Edge case: API returns Response "False"
  it("shows an error message when the API returns no results", async () => {
    // Arrange
    vi.stubGlobal(
      "fetch",
      mockFetch({ Response: "False", Error: "Movie not found!" }),
    );

    // Act
    await getMovies("xyzzy");

    // Assert
    expect(errorContainer.textContent).toContain("Movie not found!");
    expect(moviesContainer.innerHTML).toBe("");
  });

  // Edge case: network failure shows user-friendly error
  it("shows a user-friendly error when fetch throws a network error", async () => {
    // Arrange
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network error")),
    );

    // Act
    await getMovies("star");

    // Assert
    expect(errorContainer.textContent).toBeTruthy();
    expect(moviesContainer.innerHTML).toBe("");
  });
});
