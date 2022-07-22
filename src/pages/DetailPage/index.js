import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "../../api/axios.js";

const Detail = () => {
  const { movieId } = useParams();
  const [movies, setMovies] = useState({});
  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`
      );
      setMovies(request.data);
    }
    fetchData();
    //순차로 하고싶으면 훅안에 async함수 만들어서 실행시키자
  }, [movieId]);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  if (!movies) return <div>...loading</div>;

  return (
    <section>
      <img
        style={{ width: "100%", height: "auto" }}
        src={`${base_url}${movies.backdrop_path}`}
        alt="modal__poster-img"
      />
    </section>
  );
};

export default Detail;
