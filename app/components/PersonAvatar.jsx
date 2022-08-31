const noAvatarCls = {
  big: {
    container: "h-24 w-24",
    icon: "left-2 top-1 h-20 w-20",
  },
  small: {
    container: "h-12 w-12",
    icon: "left-2 top-1 h-8 w-8",
  },
};

const NoAvatar = ({ size = "big" }) => {
  const classes = noAvatarCls[size];
  return (
    <div
      className={`relative ${classes.container} m-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-600`}
    >
      <svg
        className={`absolute ${classes.icon} text-gray-400`}
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

const avatarCls = {
  big: {
    imageCls: "h-24 w-24",
    notificationCls: "bottom-3 right-1",
  },
  small: {
    imageCls: "h-12 w-12",
    notificationCls: "bottom-1 -right-1",
  },
};

const PersonAvatar = ({
  imageURL,
  name,
  size = "big",
  age = "20",
  deadSince,
}) => {
  const { imageCls, notificationCls } = avatarCls[size];
  const ageValue = age === null ? "?" : deadSince ? "&#10015;" : age;
  if (imageURL) {
    return (
      <div className="relative">
        <img
          className={`m-1 mb-3 ${imageCls} rounded-full object-cover shadow-lg`}
          src={imageURL}
          alt={name}
        />
        {age && (
          <div
            className={`absolute ${notificationCls} inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-yellow-500 text-xs font-bold text-gray-100 dark:border-gray-900 dark:text-black`}
          >
            <div dangerouslySetInnerHTML={{ __html: ageValue }} />
          </div>
        )}
      </div>
    );
  } else return <NoAvatar size={size} />;
};

export default PersonAvatar;
