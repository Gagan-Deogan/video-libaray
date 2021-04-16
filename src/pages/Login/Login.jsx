import React, { useState } from "react";
import { useAuthContext } from "../../Context";
import { useLocation } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { handleLogin } = useAuthContext();
  const { state } = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password, state ? state.from : "/");
  };
  return (
    <section className="column justify-center align-center">
      <h3 className="margin-t-32">Login to Roots</h3>
      <div className="card padding-64 bor-rad-8 box-shd margin-t-32">
        <form className="column" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}></input>
          <input
            type="password"
            placeholder="Password"
            className="margin-t-32 "
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}></input>
          <div className="text-help">Help text</div>
          <button className="btn-pry-fil margin-t-32 w12">Login</button>
        </form>
      </div>
    </section>
  );
};
