import { getPersonAttributes } from "~/mediaUtils";
import PersonAvatar from "./PersonAvatar";

const PersonMediaCard = ({ media }) => {
  const { id, mediaName, mediaTypeDesc, imageURL, birthday, age, dead_since } =
    getPersonAttributes(media);

  const TMDBLink = `https://www.themoviedb.org/person/${id}`;

  const ageLabel =
    age === null
      ? "unknown age"
      : age > 0
      ? dead_since
        ? `Died ${dead_since} years ago`
        : `${age} years old`
      : age < 0
      ? `scheduled born for ${birthday.getUTCFullYear()}`
      : "Just born this Year!";

  return (
    <a
      href={TMDBLink}
      target="_blank"
      rel="noreferrer"
      className="flex flex-col items-center rounded-lg border bg-white shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div className="flex flex-col items-center bg-transparent pb-10 pt-10">
        <PersonAvatar
          imageURL={imageURL}
          name={mediaName}
          age={age}
          deadSince={dead_since}
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {mediaName}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          <i>{mediaTypeDesc}</i>
        </span>
        <span className="pt-4 text-lg text-gray-700 dark:text-gray-300">
          {ageLabel}
        </span>
      </div>
    </a>
  );
};

export default PersonMediaCard;
