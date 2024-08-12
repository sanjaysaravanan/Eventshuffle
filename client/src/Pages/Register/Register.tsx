import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { EventsContext } from "../../store";
import { registerUser } from "../../apis/auth";

const Register: React.FC = () => {
  const authenticated = Boolean(localStorage.getItem("token"));
  const [, dispatch] = useContext(EventsContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Add your registration logic here
    try {
      dispatch({ type: "toggle_loading", payload: true });
      // Add your login logic here
      const response = await registerUser({
        email,
        password,
      });
      alert(response.msg);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      alert((err as Error).message);
    } finally {
      dispatch({ type: "toggle_loading", payload: false });
    }
  };

  if (authenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Link to="/login">Go to Login</Link>
            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
