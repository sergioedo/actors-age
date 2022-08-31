import React from "react";
import {
  FlyIOIcon,
  ReactIcon,
  RemixIcon,
  TailWindIcon,
  TMDBIcon,
} from "./ProductIcons";

const madeWith = [
  {
    alt: "The Movie Database API",
    href: "https://developers.themoviedb.org/",
    icon: TMDBIcon,
  },
  {
    alt: "Remix",
    href: "https://remix.run/",
    icon: RemixIcon,
  },
  {
    alt: "React",
    href: "https://reactjs.org/",
    icon: ReactIcon,
  },
  {
    alt: "Tailwind",
    href: "https://tailwindcss.com",
    icon: TailWindIcon,
  },
  {
    alt: "Fly.io",
    href: "https://fly.io",
    icon: FlyIOIcon,
  },
];

const MadeWith = () => {
  return (
    <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-0">
        <div className="flex items-center justify-center">
          <h3>
            <i>Made with:</i>
          </h3>
        </div>
        {madeWith.map((product) => (
          <a
            key={product.href}
            href={product.href}
            className="flex items-center justify-center p-1 grayscale transition hover:grayscale-0 focus:grayscale-0"
          >
            <product.icon />
          </a>
        ))}
      </div>
    </div>
  );
};

export default React.memo(MadeWith);
