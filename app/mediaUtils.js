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

const imageBaseURL = "https://image.tmdb.org/t/p/";
const mediaImageURL = {
  person: (media) =>
    media.profile_path ? `${imageBaseURL}w185${media.profile_path}` : null,
  movie: (media) =>
    media.poster_path ? `${imageBaseURL}w185${media.poster_path}` : null,
  tv: (media) =>
    media.poster_path ? `${imageBaseURL}w185${media.poster_path}` : null,
};

const getMediaStartDate = {
  person: (media) => (media.birthday ? media.birthday : null),
  movie: (media) => (media.release_date ? media.release_date : null),
  tv: (media) => (media.first_air_date ? media.first_air_date : null),
};

function calculateAgeFromDate(fromDate) {
  var diff_ms = Date.now() - fromDate.getTime();
  var age_dt = new Date(diff_ms);

  return age_dt.getUTCFullYear() - 1970;
}

const getMediaAttributes = (media) => {
  const { id, media_type } = media;
  const mediaName = getMediaName[media_type](media);
  const mediaTypeDesc = getMediaTypeDesc[media_type](media);
  const imageURL = mediaImageURL[media_type](media);
  const startDate = getMediaStartDate[media_type](media);
  const age = startDate ? calculateAgeFromDate(new Date(startDate)) : null;
  return {
    id,
    mediaName,
    mediaType: media_type,
    mediaTypeDesc,
    imageURL,
    startDate: new Date(startDate),
    age,
  };
};

const getPersonAttributes = (media) => {
  const { deathday } = media;
  const { id, mediaName, mediaTypeDesc, imageURL, startDate, age } =
    getMediaAttributes(media);

  return {
    id,
    mediaName,
    mediaTypeDesc,
    imageURL,
    birthday: startDate,
    age,
    deathday: deathday ? new Date(new Date(deathday)) : null,
    dead_since: deathday ? calculateAgeFromDate(new Date(deathday)) : null,
  };
};

const getMovieAttributes = (media) => {
  const { id, mediaName, mediaType, mediaTypeDesc, imageURL, startDate, age } =
    getMediaAttributes(media);

  return {
    id,
    mediaType,
    mediaName,
    mediaTypeDesc,
    imageURL,
    releaseDate: new Date(startDate),
    age,
  };
};

export { getMediaName, getPersonAttributes, getMovieAttributes, imageBaseURL };
