import loadingSvg from "../assets/tube-spinner.svg";

const Loading = () => {
  return (
    <img
      src={loadingSvg}
      alt="loading..."
      id="loading"
      className="w-1/2 h-1/2 absolute"
    />
  );
};

export default Loading;
