require("dotenv").config();
const { default: axios } = require("axios");

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.API_KEY;

const fetchDatas = async (url) => {
  const res = await axios(url);
  const data = await res.data.results;
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
  const movies = await fetchDatas(url);
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
  const id = req.params.id;
  // console.log(id);
  const type = req.query;
  return res.render("details");
};
