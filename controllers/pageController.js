require("dotenv").config();
const { default: axios } = require("axios");

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/original/";
const MOVIE_SEARCH_URL =
  BASE_URL + "/search/multi?" + "&language=en-US&" + API_KEY;

const fetchDatasFORMultiple = async (url) => {
  // console.log(url);
  const res = await axios(url);
  // console.log(res);
  const data = await res.data.results;
  // console.log(data);
  return data;
};

const fetchDetails = async (url) => {
  // console.log(url);
  const res = await axios(url);
  // console.log(res);
  const data = await res.data;
  // console.log(data);
  return data;
};

const getEntertainment = async (type) => {
  let url;
  //fixing the url to fetch based on the type
  if (type === "latestM") {
    url = `${BASE_URL}/movie/now_playing?${API_KEY}`;
  } else if (type === "latestT") {
    url = `${BASE_URL}/discover/tv?${API_KEY}`;
  } else if (type === "trending") {
    url = `${BASE_URL}/trending/all/day?${API_KEY}`;
  }
  const movies = await fetchDatasFORMultiple(url);
  return movies;
};

exports.getIndex = async (req, res, next) => {
  const latestMovies = await getEntertainment("latestM");
  const trendingToday = await getEntertainment("trending");
  const latestTV = await getEntertainment("latestT");
  return res.render("index", {
    latestMovies,
    trendingToday,
    latestTV,
  });
};

exports.getDetails = async (req, res, next) => {
  let creator, imgSrc, creatorFound, url, name1;

  const id = req.params.id;
  const type = req.query.type;

  if (type === "movie") {
    url = `${BASE_URL}/movie/${id}?${API_KEY}`; //here we are using the api to get the data of the movie with the id given in the url
  } else if (type === "tv") {
    url = `${BASE_URL}/tv/${id}?${API_KEY}`; //here we are using the api to get the data of the tv show with the id given in the
  }
  if (!url) {
    return;
  }
  const detailMovie = await fetchDetails(url);
  const {
    vote_average,
    title,
    release_date,
    overview,
    name,
    backdrop_path,
    first_air_date,
    original_title,
    original_name,
  } = detailMovie;

  if (detailMovie.created_by && detailMovie.created_by.length != 0) {
    creatorFound = true;
    creator = detailMovie.created_by[0].name;
  }
  if (!backdrop_path) {
    imgSrc = "/default.jpg";
  } else {
    imgSrc = IMG_URL + backdrop_path;
  }

  const averageVote = vote_average.toFixed(1);
  const date = new Date(release_date || first_air_date).toDateString();
  name1 = title || original_title || name || original_name;

  const recomendationURL = `${BASE_URL}/${type}/${id}/recommendations?${API_KEY}`;
  const recommendationsRes = await axios(recomendationURL);

  let recommendationsData;

  if (!recommendationsRes.data) {
    recommendationsData = null;
  }
  recommendationsData = await recommendationsRes.data.results;

  const creditsURL = `${BASE_URL}/${type}/${id}/credits?${API_KEY}`;
  const creditsRes = await axios(creditsURL);
  const creditsData = await creditsRes.data;

  if (!creatorFound) {
    let directorArr = creditsData.crew.filter((el) => {
      return el.known_for_department === "Directing";
    });

    if (directorArr.length === 0) {
      creator = "Unknown";
    } else {
      creator = directorArr[0].name;
    }
  }
  let castName,
    castArr = [];

  for (i = 0; i < 6; i++) {
    if (creditsData.cast) {
      if (creditsData?.cast[i]?.name) {
        castName = creditsData.cast[i].name;
        castArr.push(castName);
      }
    }
  }

  return res.render("details", {
    detailMovie,
    averageVote,
    date,
    name1,
    overview,
    creator,
    castArr,
    imgSrc,
    type,
    recommendationsData,
  });
};

exports.searchMovie = async (req, res, next) => {
  const searchTerm = req.body.searchQuery;
  let url = `${MOVIE_SEARCH_URL}&query=${searchTerm}`;
  const searchRes = await axios(url);

  const searchedData = await searchRes.data.results;
  // console.log(searchedData);

  res.render("searchpage", { searchedData });
};
