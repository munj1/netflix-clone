import React, { useEffect, useRef, useState } from "react";
import "./MovieModal.css";
import movieTrailer from "movie-trailer";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const MovieModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setModal,
  orignial_name,
  id,
}) => {
  const base_url = "https://image.tmdb.org/t/p/w500";
  const [trailerId, setTrailerId] = useState("");
  const navigate = useNavigate();
  const ref = useRef();
  useOnClickOutside(ref, () => {
    setModal(false);
  });

  useEffect(() => {
    if (trailerId) {
      //리턴에 때려박아도될듯 이부분은
      setTrailerId("");
    } else {
      movieTrailer(title || name || orignial_name || "")
        .then((url) => {
          // console.log("url", url);
          const urlParams = new URLSearchParams(new URL(url).search);
          // console.log('urlParams.get("v")', urlParams.get("v"));
          setTrailerId(urlParams.get("v"));
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <div className="presentation" role="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          <span onClick={() => setModal(false)} className="modal-close">
            X
          </span>

          <img
            className="modal__poster-img"
            src={`${base_url}${backdrop_path}`}
            alt="modal__poster-img"
            // onClick={() => {
            //   navigate(`/${id}`);
            // }}
          />

          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__user-perc">
                {Math.floor(vote_average * 10)}% for you
              </span>{" "}
              {release_date ? release_date : first_air_date}
            </p>
            <h2 className="modal__title">{title ? title : name}</h2>
            <p className="modal__overview">평점: {vote_average}</p>
            {trailerId && (
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${trailerId}?autoplay=1`}
                title="Youtube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
            <p className="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
