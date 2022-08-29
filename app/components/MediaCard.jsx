const getMediaName = {
  person: (media) => media.name,
  movie: (media) => media.title,
  tv: (media) => media.name,
};

const getMediaTypeDesc = {
  person: (media) => {
    const { gender, known_for_department } = media;
    if (known_for_department === "Acting") {
      return gender === 1 ? "Actress" : "Actor";
    }
    if (known_for_department === "Directing") return "Director";
    return known_for_department;
  },
  movie: (media) => "Movie",
  tv: (media) => "TV Show",
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
    </div>
  );
};

const imageBaseURL = "https://image.tmdb.org/t/p/";
const mediaImageURL = {
  person: (media) =>
    media.profile_path ? `${imageBaseURL}w185${media.profile_path}` : null,
  movie: (media) =>
    media.poster_path ? `${imageBaseURL}w185${media.poster_path}` : null,
  tv: (media) =>
    media.poster_path ? `${imageBaseURL}w185${media.poster_path}` : null,
};

function calculateAgeFromDate(fromDate) {
  var diff_ms = Date.now() - fromDate.getTime();
  var age_dt = new Date(diff_ms);

  return age_dt.getUTCFullYear() - 1970;
}

const getMediaStartDate = {
  person: (media) => (media.birthday ? media.birthday : null),
  movie: (media) => (media.release_date ? media.release_date : null),
  tv: (media) => (media.first_air_date ? media.first_air_date : null),
};

const PersonMediaCard = ({
  mediaName,
  mediaTypeDesc,
  startDate,
  age,
  media,
  imageURL,
}) => {
  const { deathday } = media;
  const ageLabel =
    age === null
      ? "unknown age"
      : age > 0
      ? deathday
        ? `Died ${calculateAgeFromDate(new Date(deathday))} years ago`
        : `${age} years old`
      : age < 0
      ? `scheduled born for ${new Date(startDate).getUTCFullYear()}`
      : "Just born this Year!";
  return (
    <a
      href="/"
      className="w-full max-w-xl rounded-lg border border-gray-200 bg-white shadow-md hover:bg-gray-100 dark:border-gray-700  dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <div className="flex flex-col items-center pb-10 pt-10">
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
        <span className="pt-5 text-lg text-gray-700 dark:text-gray-300">
          {ageLabel}
        </span>
      </div>
    </a>
  );
};

const MovieMediaCard = ({
  mediaName,
  mediaTypeDesc,
  startDate,
  age,
  media,
  imageURL,
}) => {
  const ageLabel =
    age === null
      ? "unknown age"
      : age > 0
      ? `${age} years ago`
      : age < 0
      ? `scheduled for ${new Date(startDate).getUTCFullYear()}`
      : "This year";

  return (
    <a
      href="/"
      className="flex max-w-xl flex-col items-center rounded-lg border bg-white shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 md:flex-row"
    >
      {imageURL ? (
        <img
          className="xs:h-54 md:h-84 object-cover md:w-48 md:rounded-none md:rounded-l-lg"
          src={imageURL}
          alt={mediaName}
        />
      ) : (
        <NoMovie />
      )}
      <div className="flex flex-col justify-between p-4 leading-normal">
        {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {mediaName}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {ageLabel}
        </p> */}
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {mediaName}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          <i>{mediaTypeDesc}</i>
        </span>
        <span className="pt-5 text-lg text-gray-700 dark:text-gray-300">
          {ageLabel}
        </span>
      </div>
    </a>
  );
};

const getMediaCardByType = {
  person: PersonMediaCard,
  movie: MovieMediaCard,
  tv: MovieMediaCard,
};

const MediaCard = ({ media }) => {
  const { media_type } = media;
  const mediaName = getMediaName[media_type](media);
  const mediaTypeDesc = getMediaTypeDesc[media_type](media);
  const imageURL = mediaImageURL[media_type](media);
  const startDate = getMediaStartDate[media.media_type](media);
  const age = startDate ? calculateAgeFromDate(new Date(startDate)) : null;

  const MediaCardInstance = getMediaCardByType[media_type];
  return (
    <MediaCardInstance
      mediaName={mediaName}
      mediaTypeDesc={mediaTypeDesc}
      startDate={startDate}
      age={age}
      media={media}
      imageURL={imageURL}
    />
  );
};

export default MediaCard;
