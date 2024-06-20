import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if(data.errors) {
        setErrorMsg(data.errors[0].msg)
      }
      else if(data.errorMsg) {
        setErrorMsg(data.errorMsg);
      }
      if (response.ok) {
        navigate("/");
      }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-700">
      <div className="bg-slate-800 w-11/12 h-5/6 md:w-3/4 md:h-3/4 lg:w-1/2 lg:h-1/2 text-white p-8 font-mono ml-auto mr-auto mt-10">
        <h1 className="font-mono text-center text-2xl font-bold">
          Sign up to Anime-Predictor
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center w-full"
        >
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            className="rounded w-full mt-4 text-white bg-slate-700 p-2"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="rounded w-full mt-4 text-white bg-slate-700 p-2"
            onChange={handleChange}
          />
          <button type="submit" className="rounded p-2 bg-cyan-400 mt-5 w-100">
            Login
          </button>
          <h1 className="text-red-700 mt-5">{errorMsg}</h1>
        </form>
      </div>
    </div>
  );
}
