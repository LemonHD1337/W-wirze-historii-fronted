import loadingSvg from "../../assets/tube-spinner.svg";

const Loading = () => {
  return (
    <div className="w-full flex justify-center mt-10">
      <img
        src={loadingSvg}
        alt="loading..."
        id="loading"
        className="w-32 h-32"
      />
    </div>
  );
};

export default Loading;
