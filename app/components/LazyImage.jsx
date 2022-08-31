import GracefulImage from "./GracefulImage.client";

const LazyImage = (props) => {
  const ssr = typeof document === "undefined";
  if (ssr) {
    return <img alt={props.alt} {...props} />;
  } else {
    return <GracefulImage {...props} />;
  }
};

export default LazyImage;
