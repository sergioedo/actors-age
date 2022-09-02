import { getMediaName } from "./mediaUtils";

const movie = {
  adult: false,
  backdrop_path: "/6xBknFMZhCaNJYWXyyzHEXTRk3S.jpg",
  genre_ids: [28, 35, 18, 53],
  id: 787,
  media_type: "movie",
  original_language: "en",
  original_title: "Mr. & Mrs. Smith",
  overview:
    "After five (or six) years of vanilla-wedded bliss, ordinary suburbanites John and Jane Smith are stuck in a huge rut. Unbeknownst to each other, they are both coolly lethal, highly-paid assassins working for rival organisations. When they discover they're each other's next target, their secret lives collide in a spicy, explosive mix of wicked comedy, pent-up passion, nonstop action and high-tech weaponry.",
  popularity: 44.528,
  poster_path: "/wzIO3ytxeSNt1wRpXLIdkNbGoDm.jpg",
  release_date: "2005-06-07",
  title: "Mr. & Mrs. Smith",
  video: false,
  vote_average: 6.7,
  vote_count: 8816,
};

const person = {
  adult: false,
  gender: 2,
  id: 136532,
  known_for: [],
  known_for_department: "Acting",
  media_type: "person",
  name: "Matt Smith",
  popularity: 70.419,
  profile_path: "/xr2GSp8Pm6fT5VGm0I9tsWVcZ8q.jpg",
  birthday: "1982-10-28",
  deathday: null,
};

const tv = {
  backdrop_path: "/3SBnBjKwZYkufk5hKSIi9WL49Ir.jpg",
  first_air_date: "1971-01-05",
  genre_ids: [37],
  id: 3275,
  media_type: "tv",
  name: "Alias Smith and Jones",
  origin_country: ["US"],
  original_language: "en",
  original_name: "Alias Smith and Jones",
  overview:
    'Alias Smith and Jones is an American Western series that originally aired on ABC from 1971 to 1973. It stars Pete Duel as Hannibal Heyes and Ben Murphy as Jedediah "Kid" Curry, a pair of cousin outlaws trying to reform. The governor offers them a conditional amnesty, as he wants to keep the pact under wraps for political reasons. The condition is that they will still be wanted— until the governor can claim they have reformed and warrant clemency.',
  popularity: 12.117,
  poster_path: "/cvivxPeLnXUGiZtgeHdLVA6xGmb.jpg",
  vote_average: 7.2,
  vote_count: 20,
  cast: [],
};

test("getMediaName returns correct name", () => {
  expect(getMediaName["movie"](movie)).toBe(movie.title);
  expect(getMediaName["person"](person)).toBe(person.name);
  expect(getMediaName["tv"](tv)).toBe(tv.name);
});
