import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../api";
import CustomInput from "../../components/customInput";
import CustomButton from "../../components/customButton";
import "./login.css";
import { useAuth } from "../../components/context/authContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(username, password);

    try {
      const response = await api.post("/auth/login", { username, password });
      console.log(response);
      navigate("/");
      login(response.data.token);
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <h1 className="header">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <CustomInput label="username" setValue={setUsername} />
        <CustomInput label="password" setValue={setPassword} />

        <CustomButton
          type="submit"
          label="Login"
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
