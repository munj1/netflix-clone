import React, { useEffect, useState } from "react";
import "./Banner.css";
import requests from "../api/requests.js";
import axios from "../api/axios.js";
import styled from "styled-components";

const Banner = () => {
  const [movie, setMovie] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [movieKey, setMovieKey] = useState("");

  const fetchData = async () => {
    //get every movies currently playing
    const request = await axios.get(requests.fetchNowPlaying);
    // select random movie and save id
    const movieId = await request.data.results[
      Math.floor(Math.random() * request.data.results.length)
    ].id;

    // get details of that movie
    const { data } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });

    setMovie(data);
    // console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(movie);
    if (movie.videos) {
      if (movie.videos.results.length !== 0) {
        setMovieKey(movie.videos.results[0].key);
      }
    }
  }, [movie, movieKey]);

  // useEffect(() => {
  //   console.log(movie);
  //   console.log(movieKey);
  // }, [movie, movieKey]);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  if (isClicked && movieKey) {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movieKey}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movieKey}`}
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  } else {
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
        <div className="banner__contents">
          {/* Title */}
          <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name || "제목없음"}
          </h1>
          <div className="banner__buttons">
            <button
              className="banner__button play"
              onClick={() => {
                setIsClicked(true);
              }}
            >
              Play
            </button>
            <button className="banner__button info">
              <div className="space">More Information</div>
            </button>
          </div>
          {/* DIV > 2 BUTTONS */}
          <h1 className="banner__description">
            {truncate(movie?.overview, 100)}
          </h1>
          {/* Description */}
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  }
};

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default Banner;
