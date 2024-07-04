import LoginForm from "../components/Login/LoginForm";

const Login = () => {
  return (
    <div className="h-full w-full flex justify-center items-center flex-grow">
      <div className="border w-1/3 shadow-lg text-center p-8 rounded-xl md:w-3/4">
        <h1 className="font-bold text-2xl">Zaloguj się</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
