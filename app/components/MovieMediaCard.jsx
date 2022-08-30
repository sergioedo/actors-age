import { getMovieAttributes, getPersonAttributes } from "~/mediaUtils";
import PersonAvatar from "./PersonAvatar";

const NoMovie = ({ transparent = true }) => {
  return (
    <div
      className={`relative h-24 w-24 overflow-hidden rounded-full ${
        transparent ? "bg-transparent" : "bg-gray-100 dark:bg-gray-600"
      }`}
    >
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
    </div>
  );
};

const MovieMediaCard = ({ media }) => {
  const { mediaName, mediaTypeDesc, imageURL, releaseDate, age } =
    getMovieAttributes(media);
  const mainCast = media.cast
    .filter((person) => person.profile_path !== null)
    .slice(0, 6);

  const ageLabel =
    age === null
      ? "unknown age"
      : age > 0
      ? `${age} years ago`
      : age < 0
      ? `scheduled for ${releaseDate.getUTCFullYear()}`
      : "This year";

  return (
    <a
      href="/"
      className="flex flex-row items-center rounded-lg border bg-white shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      {imageURL ? (
        <img
          className="xs:h-54 md:h-84 rounded-l-lg object-cover md:w-48"
          src={imageURL}
          alt={mediaName}
        />
      ) : (
        <NoMovie />
      )}
      <div className="flex flex-col justify-between py-2 px-0 leading-normal md:px-4">
        <h5 className="mb-1 break-all px-2 text-center text-xl font-medium text-gray-900 dark:text-white sm:break-normal">
          {mediaName}
        </h5>
        <span className="px-2 text-center text-sm text-gray-500 dark:text-gray-400">
          <i>{mediaTypeDesc}</i>
        </span>
        <span className="pt-4 text-center text-lg text-gray-700 dark:text-gray-300 md:pt-2">
          {ageLabel}
        </span>
        <div className="pt-4 md:pt-2">
          <div className="flex flex-row flex-wrap justify-center gap-0">
            {mainCast.map((person) => {
              const { id, mediaName, imageURL, age, dead_since } =
                getPersonAttributes({ ...person, media_type: "person" });
              return (
                <PersonAvatar
                  key={id}
                  imageURL={imageURL}
                  name={mediaName}
                  size={"small"}
                  age={age}
                  deadSince={dead_since}
                />
              );
            })}
          </div>
        </div>
      </div>
    </a>
  );
};

export default MovieMediaCard;
