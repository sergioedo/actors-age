import { getPersonAttributes } from "~/mediaUtils";

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

const PersonMediaCard = ({ media }) => {
  const { mediaName, mediaTypeDesc, imageURL, birthday, age, dead_since } =
    getPersonAttributes(media);

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
      href="/"
      className="flex flex-col items-center rounded-lg border bg-white shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div className="flex flex-col items-center bg-transparent pb-10 pt-10">
        {imageURL ? (
          <img
            className="mb-3 h-24 w-24 rounded-full object-cover shadow-lg"
            src={imageURL}
            alt={mediaName}
          />
        ) : (
          <NoAvatar />
        )}
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
