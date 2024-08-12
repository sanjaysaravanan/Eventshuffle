import React, { Suspense, lazy, useReducer } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loader from "./common/Loader";
import { eventReducer, EventsContext, initialState } from "../src/store";

const Events = lazy(() => import("./Pages/Events/Events"));
const Login = lazy(() => import("./Pages/Login/Login"));
const Register = lazy(() => import("./Pages/Register/Register"));

const ProtectedRoute: React.FC<{ component: React.ReactNode }> = ({
  component,
}) => {
  const authenticated = Boolean(localStorage.getItem("token"));

  if (authenticated) {
    return component;
  }

  return <Navigate to="/login" />;
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(eventReducer, initialState);

  return (
    <Suspense fallback={<Loader />}>
      <EventsContext.Provider value={[state, dispatch]}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoute component={<Events />} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
        {state.isLoading && (
          <div className="min-vh-100 d-flex align-items-center justify-content-center min-vw-100 position-fixed top-0 start-0 bg-dark bg-gradient bg-opacity-50">
            <i className="fa-solid fa-spin fa-spinner fa-4x"></i>
          </div>
        )}
      </EventsContext.Provider>
    </Suspense>
  );
};

export default App;
