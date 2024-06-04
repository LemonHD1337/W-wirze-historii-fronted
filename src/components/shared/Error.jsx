const Error = ({ error = null }) => {
  if (error) console.log(error);

  return (
    <div>
      <p>Błąd</p>
    </div>
  );
};

export default Error;
