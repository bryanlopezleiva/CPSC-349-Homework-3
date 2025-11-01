import React, { useState, useEffect, useCallback, useMemo } from "react";
import Header from "./Header.js";
import MoviesList from "./MoviesLists.js";
import Footer from "./Pagination.js";
import { API_KEY, PAGE_URL, SEARCH_URL } from "./Constants.js";
import "./Styles.css";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("option1");

  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }),
    [],
  );

  const fetchMovies = useCallback(
    async (page = 1) => {
      const url = `${PAGE_URL}${page}`;
      try {
        const response = await fetch(url, options);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setMovies(data.results);
        setDisplayedMovies(data.results);
        setTotalPages(data.total_pages);
        setCurrentPage(page);
      } catch (error) {
        console.error("Error fetching movies", error);
      }
    },
    [options],
  );

  const searchMovies = async (query, page = 1) => {
    if (!query.trim()) {
      fetchMovies(1);
      return;
    }

    const url = `${SEARCH_URL}${encodeURIComponent(query)}&page=${page}`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();
      setMovies(data.results);
      setDisplayedMovies(data.results);
      setTotalPages(data.total_pages || 1);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error searching movies", error);
    }
  };

  const sortMovies = (sortType) => {
    if (sortType === "option1") {
      setDisplayedMovies([...movies]);
      return;
    }

    const sorted = [...movies];
    switch (sortType) {
      case "option2":
        sorted.sort(
          (a, b) => new Date(a.release_date) - new Date(b.release_date),
        );
        break;
      case "option3":
        sorted.sort(
          (a, b) => new Date(b.release_date) - new Date(a.release_date),
        );
        break;
      case "option4":
        sorted.sort((a, b) => a.vote_average - b.vote_average);
        break;
      case "option5":
        sorted.sort((a, b) => b.vote_average - a.vote_average);
        break;
      default:
        break;
    }
    setDisplayedMovies(sorted);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setSortOption("option1");
    searchMovies(value, 1);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
    sortMovies(value);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      if (searchTerm) {
        searchMovies(searchTerm, currentPage - 1);
      } else {
        fetchMovies(currentPage - 1);
      }
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      if (searchTerm) {
        searchMovies(searchTerm, currentPage + 1);
      } else {
        fetchMovies(currentPage + 1);
      }
    }
  };

  useEffect(() => {
    fetchMovies(1);
  }, [fetchMovies]);

  return (
    <div className="app">
      <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        sortOption={sortOption}
        onSortChange={handleSortChange}
      />
      <MoviesList movies={displayedMovies} />
      <Footer
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
}
