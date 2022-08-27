import React from "react";
import { json } from "@remix-run/node";
import { useLoaderData, Form, useSearchParams } from "@remix-run/react";

const madeWith = [
  // {
  //   src: "https://user-images.githubusercontent.com/1500684/157764397-ccd8ea10-b8aa-4772-a99b-35de937319e1.svg",
  //   alt: "Fly.io",
  //   href: "https://fly.io",
  // },

  // {
  //   src: "https://user-images.githubusercontent.com/1500684/157764395-137ec949-382c-43bd-a3c0-0cb8cb22e22d.svg",
  //   alt: "SQLite",
  //   href: "https://sqlite.org",
  // },

  // {
  //   src: "https://user-images.githubusercontent.com/1500684/157764484-ad64a21a-d7fb-47e3-8669-ec046da20c1f.svg",
  //   alt: "Prisma",
  //   href: "https://prisma.io",
  // },

  {
    src: "https://user-images.githubusercontent.com/1500684/157764276-a516a239-e377-4a20-b44a-0ac7b65c8c14.svg",
    alt: "Tailwind",
    href: "https://tailwindcss.com",
  },

  // {
  //   src: "https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg",
  //   alt: "Cypress",
  //   href: "https://www.cypress.io",
  // },

  // {
  //   src: "https://user-images.githubusercontent.com/1500684/157772386-75444196-0604-4340-af28-53b236faa182.svg",
  //   alt: "MSW",
  //   href: "https://mswjs.io",
  // },

  // {
  //   src: "https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg",
  //   alt: "Vitest",
  //   href: "https://vitest.dev",
  // },

  // {
  //   src: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
  //   alt: "Testing Library",
  //   href: "https://testing-library.com",
  // },

  // {
  //   src: "https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg",
  //   alt: "Prettier",
  //   href: "https://prettier.io",
  // },

  // {
  //   src: "https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg",
  //   alt: "ESLint",
  //   href: "https://eslint.org",
  // },

  // {
  //   src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
  //   alt: "TypeScript",
  //   href: "https://typescriptlang.org",
  // },
];

const MadeWith = React.memo(() => {
  return (
    <div className="mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-center gap-8">
        <div className="flex items-center justify-center">
          <h3>Made with:</h3>
        </div>
        {madeWith.map((img) => (
          <a
            key={img.href}
            href={img.href}
            className="flex h-16 w-32 justify-center p-1 grayscale transition hover:grayscale-0 focus:grayscale-0"
          >
            <img alt={img.alt} src={img.src} />
          </a>
        ))}
      </div>
    </div>
  );
});

const mediaName = {
  person: (media) => media.name,
  movie: (media) => media.title,
  serie: (media) => media.title,
  tv: (media) => media.name,
};

const NoAvatar = () => {
  return (
    <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
      <svg
        className="absolute left-2 top-1 h-20 w-20 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};
const NoMovie = () => {
  return (
    <div className="relative h-24 w-24 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
      <svg
        className="absolute left-4 top-4 h-16 w-16 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        viewBox="-2 -2 24 24"
      >
        <path
          fill="currentColor"
          d="M6 15v3h8v-7H6v4zm-2-2v-2H2V9h2V7H2v6h2zm0 2H2v1a2 2 0 0 0 2 2v-3zm14-2V7h-2v2h2v2h-2v2h2zm0 2h-2v3a2 2 0 0 0 2-2v-1zm-4-8V2H6v7h8V7zm4-2V4a2 2 0 0 0-2-2v3h2zM4 5V2a2 2 0 0 0-2 2v1h2zm0-5h12a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
        />
      </svg>
      {/* <svg
        className="absolute left-4 top-4 h-16 w-16 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 48 48"
      >
        <g fill="none" stroke="currentColor" stroke-width="4">
          <path
            stroke-linejoin="round"
            d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"
          />
          <path
            stroke-linejoin="round"
            d="M24 18a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm0 18a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm-9-9a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm18 0a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"
          />
          <path stroke-linecap="round" d="M24 44h20" />
        </g>
      </svg> */}
    </div>
  );
};

const imageBaseURL = "https://image.tmdb.org/t/p/";
const mediaImageURL = {
  person: (media) =>
    media.profile_path ? `${imageBaseURL}w185${media.profile_path}` : null,
  movie: (media) =>
    media.poster_path ? `${imageBaseURL}w185${media.poster_path}` : null,
  serie: (media) =>
    media.poster_path ? `${imageBaseURL}w185${media.poster_path}` : null,
  tv: (media) =>
    media.poster_path ? `${imageBaseURL}w185${media.poster_path}` : null,
};

const MediaImage = ({ media }) => {
  const { media_type, name } = media;
  const imageURL = mediaImageURL[media_type](media);
  if (imageURL)
    return (
      <img
        className="mb-3 h-24 w-24 rounded-full object-cover shadow-lg"
        src={imageURL}
        alt={name}
      />
    );
  if (media_type === "person") return <NoAvatar />;
  return <NoMovie />;
};

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  if (!query) return {};
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${query}`
  );
  return json(await res.json());
};

export default function Index() {
  const [params] = useSearchParams();
  const { results = [] } = useLoaderData();
  console.log(results);
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="max-w-9xl mx-auto sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="/img/jason-dent-SnXIF8_2oPw-unsplash.jpeg"
                alt="Actors Age"
              />

              <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
            </div>
            <div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-yellow-500 drop-shadow-md">
                  Actors Age
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
                      placeholder="Search for actors, movies, series, tv shows..."
                      defaultValue={params.get("query")}
                      required
                    />
                  </div>
                </Form>
              </div>
              <div className="container mx-auto mt-5 space-y-2 lg:grid lg:grid-cols-3 lg:gap-2 lg:space-y-0">
                {results.map((result) => {
                  const { media_type, id } = result;
                  const name = mediaName[media_type](result);
                  return (
                    <div
                      key={id}
                      className="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow-md  dark:border-gray-700 dark:bg-gray-800"
                    >
                      <div className="flex flex-col items-center pb-10 pt-10">
                        <MediaImage media={result} />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                          {name}
                        </h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {media_type}
                        </span>
                        {/* <div className="mt-4 flex space-x-3 md:mt-6">
                          <a
                            href="#"
                            className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Add friend
                          </a>
                          <a
                            href="#"
                            className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                          >
                            Message
                          </a>
                        </div> */}
                      </div>
                    </div>
                  );
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
