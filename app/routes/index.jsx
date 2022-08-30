import React from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Form, useSearchParams } from "@remix-run/react";

import MadeWith from "~/components/MadeWith";
import MediaCard from "~/components/MediaCard";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  if (!query) return {};
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${query}`
  );
  const data = await res.json();

  const completedResults = await Promise.all(
    data.results.map(async (media) => {
      const { id, media_type } = media;
      if (media_type === "person") {
        // add detailed data from person (birthday, deathday)
        const detail = await fetch(
          `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.TMDB_API_KEY}`
        );
        const person = await detail.json();
        return Promise.resolve({
          ...media,
          birthday: person.birthday,
          deathday: person.deathday,
        });
      }
      return Promise.resolve(media);
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

export default function Index() {
  const [params] = useSearchParams();
  const { results = [] } = useLoaderData();
  console.log(results);
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
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
                <Form className="flex items-center" action=".">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      name="query"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Search for actors, movies, tv shows..."
                      defaultValue={params.get("query")}
                      onKeyUp={handleKeyUp}
                      required
                    />
                  </div>
                </Form>
              </div>
              <div className="container mx-auto mt-5 space-y-2 lg:grid lg:grid-cols-2 lg:gap-2 lg:space-y-0 xl:grid-cols-3 2xl:grid-cols-4">
                {results.map((result) => {
                  const { id } = result;
                  return <MediaCard key={id} media={result} />;
                })}
              </div>
            </div>
          </div>
        </div>
        <MadeWith />
      </div>
    </main>
  );
}
