import React, { useEffect, useState } from "react";
import "./SearchPage.css";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";
import Row from "../../components/Row";
import MovieModal from "../../components/MovieModal";
import useDebounce from "../../hooks/useDebounce";

const Search = () => {
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  let searchStr = useDebounce(query.get("q"), 500);
  const [searchResults, setsearchResults] = useState([]);
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [modal, setModal] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    if (searchStr) {
      fetchSearchMovie(searchStr);
    }
  }, [searchStr]);

  // useEffect(() => {
  //   console.log(searchResults);
  // }, [searchResults]);

  const fetchSearchMovie = async () => {
    try {
      const request = await axios.get(
        `/search/multi?include_adult=true&query=${searchStr}`
      );
      setsearchResults(request.data.results);
    } catch (e) {
      console.log("err", e);
    }
  };

  const handleModal = (movie) => {
    // console.log(movie);
    setModal(true);
    setMovieSelected(movie);
  };

  if (searchResults.length > 0) {
    return (
      <section className="search-container">
        {searchResults.map((movie) => {
          if (movie.backdrop_path && movie.media?.type !== "person") {
            const url = BASE_URL + movie.backdrop_path;
            // console.log(url);
            return (
              <div className="movie" key={movie.id}>
                <div className="movie__column-poster">
                  <img
                    src={url}
                    alt={
                      movie.name ||
                      movie.title ||
                      movie.original_title ||
                      "movie"
                    }
                    onClick={() => {
                      handleModal(movie);
                    }}
                    className="movie__poster"
                  />
                </div>
                <div>
                  <p style={{ color: "white" }}>
                    {movie.name ||
                      movie.title ||
                      movie.original_title ||
                      "movie"}
                  </p>
                </div>
              </div>
            );
          }
        })}
        {modal && <MovieModal {...movieSelected} setModal={setModal} />}
      </section>

      // <section className="row">
      //   <h2>Search Result</h2>
      //   <div className="slider">
      //     <div
      //       className="slider__arrow-left"
      //       onClick={() => {
      //         document.getElementById("search-result").scrollLeft -=
      //           window.innerWidth - 80;
      //       }}
      //     >
      //       <span className="arrow">{"<"}</span>
      //     </div>
      //     <div id={"search-result"} className="row__posters">
      //       {searchResults.map((movie) => {
      //         return (
      //           <img
      //             key={movie.id}
      //             className={`row__poster row__posterLarge`}
      //             src={`${BASE_URL}${movie.poster_path}`}
      //             loading="lazy"
      //             alt={
      //               movie.name || movie.title || movie.original_title || "movie"
      //             }
      //             onClick={() => {
      //               handleModal(movie);
      //             }}
      //           />
      //         );
      //       })}
      //     </div>
      //     <div
      //       className="slider__arrow-right"
      //       onClick={() => {
      //         document.getElementById("search-result").scrollLeft +=
      //           window.innerWidth - 80;
      //       }}
      //     >
      //       <span className="arrow">{">"}</span>
      //     </div>
      //   </div>

      //   {modal && <MovieModal {...movieSelected} setModal={setModal} />}
      // </section>
    );
  } else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          <p>Your search for "{searchStr}" did not have any matches</p>
          <p>Suggestions:</p>
          <ul>
            <li>Try different Keywords</li>
          </ul>
        </div>
      </section>
    );
  }
};

export default Search;
