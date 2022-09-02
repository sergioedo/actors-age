import { Form, useSearchParams } from "@remix-run/react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const ChevronDownIcon = () => {
  return (
    <svg
      aria-hidden="true"
      className="ml-1 h-4 w-4"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

const MovieFilterIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m9.5 11l-.95 2.05L6.5 14l2.05.95L9.5 17l.95-2.05L12.5 14l-2.05-.95Zm6 0l-.65 1.35l-1.35.65l1.35.65l.65 1.35l.65-1.35L17.5 13l-1.35-.65ZM4 4l2 4h3L7 4h2l2 4h3l-2-4h2l2 4h3l-2-4h3q.825 0 1.413.588Q22 5.175 22 6v12q0 .825-.587 1.413Q20.825 20 20 20H4q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4Zm0 6v8h16v-8Zm0 0v8Z"
      />
    </svg>
  );
};

const MovieActorIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m4 3l2 4h3L7 3h2l2 4h3l-2-4h2l2 4h3l-2-4h3q.825 0 1.413.587Q22 4.175 22 5v14q0 .825-.587 1.413Q20.825 21 20 21H4q-.825 0-1.412-.587Q2 19.825 2 19V5q0-.825.588-1.413Q3.175 3 4 3Zm0 6v10h16V9Zm0 0v10Zm4 9h8v-.55q0-1.1-1.1-1.775Q13.8 15 12 15q-1.8 0-2.9.675Q8 16.35 8 17.45Zm4-4q.825 0 1.413-.588Q14 12.825 14 12t-.587-1.413Q12.825 10 12 10q-.825 0-1.412.587Q10 11.175 10 12q0 .825.588 1.412Q11.175 14 12 14Z"
      />
    </svg>
  );
};

const MovieIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m4 4l2 4h3L7 4h2l2 4h3l-2-4h2l2 4h3l-2-4h3q.825 0 1.413.588Q22 5.175 22 6v12q0 .825-.587 1.413Q20.825 20 20 20H4q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4Zm0 6v8h16v-8Zm0 0v8Z"
      />
    </svg>
  );
};

const TVShowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m9.5 15.5l7-4.5l-7-4.5ZM8 21v-2H4q-.825 0-1.412-.587Q2 17.825 2 17V5q0-.825.588-1.413Q3.175 3 4 3h16q.825 0 1.413.587Q22 4.175 22 5v12q0 .825-.587 1.413Q20.825 19 20 19h-4v2Zm-4-4h16V5H4v12Zm0 0V5v12Z"
      />
    </svg>
  );
};

const mediaTypes = [
  { value: "", label: "All types", icon: MovieFilterIcon },
  { value: "person", label: "People", icon: MovieActorIcon },
  { value: "movie", label: "Movies", icon: MovieIcon },
  { value: "tv", label: "TV Shows", icon: TVShowIcon },
];

const MediaTypesDropDown = ({ mediaTypeValue = "", handleMediaTypeChange }) => {
  const [params] = useSearchParams();
  const type = params.get("type") || "";
  const [selectedMediaTypeValue, setSelectedMediaTypeValue] = useState(type);
  const selectedMediaType = mediaTypes.find(
    (mt) => mt.value === selectedMediaTypeValue
  );
  return (
    <Menu as="div" className="relative inline-block flex-shrink-0 text-left">
      <div>
        <input
          type="text"
          id="search-type-filter"
          name="type"
          defaultValue={selectedMediaType.value}
          hidden
        />
        <Menu.Button className="text-grey-900 z-10 inline-flex flex-shrink-0 items-center rounded-l-lg border border-yellow-400 bg-yellow-500 py-2.5 px-4 text-center text-sm font-medium hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-500  dark:text-white">
          {selectedMediaType.label}
          <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-2 w-32 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-600 dark:text-white">
          <div className="px-1 py-1 ">
            {mediaTypes.map((mediaType) => {
              return (
                <Menu.Item key={mediaType.value}>
                  {({ active }) => (
                    <button
                      type="submit"
                      className={`${
                        active ? "bg-yellow-500" : ""
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-900 dark:text-white`}
                      onClick={() => setSelectedMediaTypeValue(mediaType.value)}
                    >
                      <mediaType.icon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                      <span className="pl-2">{mediaType.label}</span>
                    </button>
                  )}
                </Menu.Item>
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const handleKeyUp = (event) => {
  //key code for enter
  if (event.keyCode === 13 && event.target.value.length > 0) {
    event.target.blur();
  }
};

const SearchBar = ({ query }) => {
  return (
    <Form className="flex items-center" action=".">
      <label
        htmlFor="search-dropdown"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        Search
      </label>
      <MediaTypesDropDown />
      <div className="relative w-full">
        <input
          type="search"
          id="search-dropdown"
          name="query"
          className="z-20 block w-full rounded-r-lg border border-l-2 border-gray-300 border-l-gray-50 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-yellow-500 focus:ring-yellow-500 dark:border-gray-600 dark:border-l-gray-700  dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-yellow-500"
          placeholder="Search for actors, movies, tv shows..."
          defaultValue={query}
          onKeyUp={handleKeyUp}
          required
        />
        <button
          type="submit"
          className="absolute top-0 right-0 rounded-r-lg border border-yellow-500 bg-yellow-500 p-2.5 text-sm font-medium text-gray-900 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-200 dark:bg-yellow-400 dark:text-white dark:hover:bg-yellow-500 dark:focus:ring-yellow-600"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </Form>
  );
};

export default SearchBar;
