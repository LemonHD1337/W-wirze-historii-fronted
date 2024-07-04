import RegisterForm from "../components/Register/RegisterForm";

const Register = () => {
  return (
    <div className="w-full h-full flex justify-center items-center flex-grow">
      <div className="w-1/3 text-center border border-bor shadow-lg p-5 rounded-xl md:w-3/4">
        <h1 className="font-bold text-2xl">Utwórz konto</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
