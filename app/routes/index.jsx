import React from "react";
import { json } from "@remix-run/node";
import {
  useLoaderData,
  useSearchParams,
  useTransition,
} from "@remix-run/react";

import MadeWith from "~/components/MadeWith";
import PersonMediaCard from "~/components/PersonMediaCard";
import MovieMediaCard from "~/components/MovieMediaCard";
import Loading from "~/components/Loading";
import SearchBar from "~/components/SearchBar";

const fetchPersonDetails = async (media) => {
  const { id } = media;
  // add detailed data from person (birthday, deathday)
  const detail = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}`
  );
  const person = await detail.json();
  return {
    ...media,
    birthday: person.birthday,
    deathday: person.deathday,
  };
};

const fetchMovieDetails = async (media) => {
  const { id, media_type } = media;
  // add detailed data from person (birthday, deathday)
  const detail = await fetch(
    `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits`
  );
  const movie = await detail.json();

  const cast = await Promise.all(
    movie.credits.cast
      .slice(0, 10)
      .filter((person) => person.profile_path !== null)
      .map(async (person) => {
        const personDetail = await fetchPersonDetails(person);
        return personDetail;
      })
  );

  return {
    ...media,
    cast,
  };
};

const fetchMediaDetails = {
  person: fetchPersonDetails,
  movie: fetchMovieDetails,
  tv: fetchMovieDetails,
};

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  if (!query) return {};
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${query}`
  );
  const data = await res.json();

  const completedResults = await Promise.all(
    data.results.slice(0, 10).map(async (media) => {
      const { media_type } = media;
      const detailedMedia = await fetchMediaDetails[media_type](media);
      return Promise.resolve(detailedMedia);
    })
  );
  return json({ ...data, results: completedResults });
};

const handleKeyUp = (event) => {
  //key code for enter
  if (event.keyCode === 13) {
    // event.preventDefault();
    event.target.blur();
  }
};

const getMediaCardByType = {
  person: PersonMediaCard,
  movie: MovieMediaCard,
  tv: MovieMediaCard,
};

export default function Index() {
  const [params] = useSearchParams();
  const query = params.get("query");
  const { results = [] } = useLoaderData();
  const transition = useTransition();
  console.log(results);
  return (
    <main className="relative min-h-screen bg-white dark:bg-gray-700 sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
          <div className="relative bg-black shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute">
              <img
                className="h-full w-full object-cover"
                src="/img/jason-dent-SnXIF8_2oPw-unsplash.jpeg"
                alt="Actors Age"
              />

              <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
            </div>
            <div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-yellow-500 drop-shadow-md">
                  <a href="/">Actors Age</a>
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-white sm:max-w-3xl">
                Looking for an actor/actress age? How old is a movie? Just
                search it.
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:max-w-none sm:justify-center">
                <SearchBar query={query} handleKeyUp={handleKeyUp} />
              </div>
              {transition.state === "idle" ? (
                results.length ? (
                  <div className="container mx-auto mt-5 space-y-2 lg:grid lg:grid-cols-2 lg:gap-2 lg:space-y-0 xl:grid-cols-3">
                    {results.map((result) => {
                      const { id, media_type } = result;
                      const MediaCard = getMediaCardByType[media_type];
                      return <MediaCard key={id} media={result} />;
                    })}
                  </div>
                ) : (
                  query && (
                    <div className="flex items-center justify-center pt-10">
                      <h3 className="text-white">No results found</h3>
                    </div>
                  )
                )
              ) : (
                <div className="flex items-center justify-center pt-10">
                  <Loading />
                </div>
              )}
            </div>
          </div>
        </div>
        <MadeWith />
      </div>
    </main>
  );
}
