import {  Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

export default function Signup() {
  const [name, setName] = useState("Soorya Kriz");
  const [email, setEmail] = useState("soorya@gmail.com");
  const [password, setPassword] = useState("Soorya@123");
  const navigate = useNavigate();
  const { signup, error } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
    navigate("/");
  };
  return (
    <div className="container px-5 md:px-10 lg:px-0  flex item-center justify-center h-full ">
      <form
        className="flex md:max-w-lg bg-white dark:bg-gray-800 shadow border dark:border-gray-700 dark:border-opacity-60 p-10 w-full rounded-md   flex-col gap-4 my-auto "
        onSubmit={handleSubmit}
      >
        <span className="w-full text-center text-slate-800 mb-4 dark:text-slate-100 font-semibold text-2xl">
          Signup
        </span>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            value={name}
            placeholder="Alex"
            required={true}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Your email" />
          </div>
          <TextInput
            id="email"
            type="email"
            value={email}
            placeholder="name@galaxieon.com"
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
