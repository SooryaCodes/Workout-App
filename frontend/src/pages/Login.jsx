import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("soorya@gmail.com");
  const [password, setPassword] = useState("Soorya@123");
  const { login, error } = useLogin();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/");
  };
  return (
    <div className="container px-5 md:px-10 lg:px-0  flex item-center justify-center h-full ">
      <form
        className="flex md:max-w-lg bg-white dark:bg-gray-800 shadow border dark:border-gray-700 dark:border-opacity-60 p-10 w-full rounded-md   flex-col gap-4 my-auto "
        onSubmit={handleSubmit}
      >
        <span className="w-full text-center text-slate-800 mb-4 dark:text-slate-100 font-semibold text-2xl">
          Login
        </span>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            value={email}
            placeholder="name@flowbite.com"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>

          <TextInput
            id="password"
            type="password"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="">
          <Label htmlFor="agree">
            New to FitEx ?
            <Link
              to="/signup"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              &nbsp; Signup now
            </Link>
          </Label>
        </div>{" "}
        {error && (
          <span className="flex items-center justify-start px-4 py-6 mt-2 text-sm font-light  w-full h-10 border border-red-500 border-opacity-30 rounded-md text-red-400 bg-red-500 bg-opacity-20">
            {error}
          </span>
        )}
        <span className="mb-2"></span>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
