import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./Row.css";
import MovieModal from "./MovieModal/index.js";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Row = ({ title, id, fetchUrl, isLargeRow }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [movies, setMovies] = useState();
  const [modal, setModal] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  };

  const handleModal = (movie) => {
    // console.log(movie);
    setModal(true);
    setMovieSelected(movie);
  };

  if (movies) {
    return (
      <section className="row">
        <h2 style={{ marginTop: "20px", marginBottom: "20px" }}>{title}</h2>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Scrollbar, Pagination, A11y]}
          navigation
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            1378: {
              slidesPerView: 6,
              SildesPerGroup: 6,
            },
            998: {
              slidesPerView: 5,
              SildesPerGroup: 5,
            },
            625: {
              slidesPerView: 4,
              SildesPerGroup: 4,
            },
            0: {
              slidesPerView: 3,
              SildesPerGroup: 3,
            },
          }}
        >
          {/* <div className="slider"> */}
          {/* <div
            className="slider__arrow-left"
            onClick={() => {
              document.getElementById(id).scrollLeft -= window.innerWidth - 80;
            }}
          >
            <span className="arrow">{"<"}</span>
          </div> */}
          <div id={id} className="row__posters">
            {movies.map((movie) => {
              return (
                <SwiperSlide key={movie.id}>
                  <img
                    key={movie.id}
                    className={`row__poster ${
                      isLargeRow && "row__posterLarge"
                    }`}
                    src={`${BASE_URL}${
                      isLargeRow ? movie.poster_path : movie.backdrop_path
                    }`}
                    loading="lazy"
                    alt={movie.name}
                    onClick={() => {
                      handleModal(movie);
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
        {/* <div
            className="slider__arrow-right"
            onClick={() => {
              document.getElementById(id).scrollLeft += window.innerWidth - 80;
            }}
          >
            <span className="arrow">{">"}</span>
          </div> */}
        {/* </div> */}

        {modal && <MovieModal {...movieSelected} setModal={setModal} />}
      </section>
    );
  }
};

export default Row;
