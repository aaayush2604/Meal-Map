import { useState } from "react";
import { useLogin } from "../Hooks/useLogin";

export const Login = () => {
  const {login,IsLoading,error}=useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email,password);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        ></input>
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        ></input>
        <button type="submit" disabled={IsLoading}>Login</button>
        {error && <div>{error}</div>}
      </form>
    </>
  );
};

export default Login;
