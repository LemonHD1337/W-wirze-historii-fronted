const HomePage = () => {
  return (
    <div
      className={
        "w-full h-full flex justify-center items-center flex-grow md:p-5"
      }
    >
      <div
        className={
          "border w-2/3 h-2/3 shadow-lg p-5 rounded-xl md:h-auto mobileL:w-full"
        }
      >
        <h1 className={"text-2xl font-bold p-4 text-center mobileS:text-lg"}>
          W wirze historii...
        </h1>
        <p className={"text-lg"}>
          Strona powstała w celu przybliżenia uczniom zagadnień historycznych w
          sposób ciekawy i przyjemny. Najłatwiejszym sposobem przyswajania
          wiedzy jest nauka przez zabawę, dlatego na tej stronie można znaleźć
          następujące zakładki:
        </p>
        <br />
        <p className={"text-lg"}>
          -wpisy o ważnych postaciach oraz wydarzeniach historycznych tutaj
          znajdziemy najważniejsze informacje na poszczególne tematy
        </p>
        <br />
        <p className={"text-lg"}>
          -mapki z lokalizacjami konkretnych wydarzeń historycznych dzięki nim
          możemy zobaczyć miejsca wydarzeń, dodatkowo z odwołaniem do ich opisu
        </p>
      </div>
    </div>
  );
};

export default HomePage;
