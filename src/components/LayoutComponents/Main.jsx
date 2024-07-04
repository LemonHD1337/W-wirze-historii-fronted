import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "../shared/Loading";
const HomePage = lazy(() => import("../../pages/HomePage"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const EventsMaps = lazy(() => import("../../pages/EventsMaps"));
const GuessDate = lazy(() => import("../../pages/GuessDate"));
const Events = lazy(() => import("../../pages/Events"));
const Event = lazy(() => import("../../pages/Event"));
const HistoricalFigures = lazy(() => import("../../pages/HistoricalFigures"));
const HistoricalFigure = lazy(() => import("../../pages/HistoricalFigure"));
const UserSettings = lazy(() => import("../../pages/UserSettings"));
const AddContent = lazy(() => import("../../pages/AddContent"));
const Logout = lazy(() => import("../../pages/Logout"));
const Contact = lazy(() => import("../../pages/Contact"));
const Authors = lazy(() => import("../../pages/Authors"));
const PasswordReset = lazy(() => import("../../pages/PasswordReset"));
const VerifyCode = lazy(() => import("../../pages/VerifyCode"));
const CreateNewPassword = lazy(() => import("../../pages/CreateNewPassword"));

const Main = () => {
  return (
    <main id="main" className="w-full flex flex-col h-full flex-1">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/eventsMaps" element={<EventsMaps />} />
          <Route path="/games/guessDate" element={<GuessDate />} />
          <Route path="/all/events" element={<Events />} />
          <Route path="/all/events/:id" element={<Event />} />
          <Route
            path="/all/historicalFigures"
            element={<HistoricalFigures />}
          />
          <Route
            path="/all/historicalFigures/:id"
            element={<HistoricalFigure />}
          />
          <Route path="/user/settings" element={<UserSettings />} />
          <Route path="/user/addContent" element={<AddContent />} />
          <Route path="/user/logout" element={<Logout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/authors" element={<Authors />} />
          <Route path={"/password/reset"} element={<PasswordReset />} />
          <Route path={"/password/reset/verify/:id"} element={<VerifyCode />} />
          <Route
            path={"/password/reset/verified/:id"}
            element={<CreateNewPassword />}
          />
        </Routes>
      </Suspense>
    </main>
  );
};

export default Main;
