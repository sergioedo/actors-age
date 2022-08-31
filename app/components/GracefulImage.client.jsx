import Image from "react-graceful-image";

// Wrapper component, to make it only available on client side (not support SSR, uses window element)
const GracefulImage = (props) => {
  return <Image {...props} />;
};

export default GracefulImage;
