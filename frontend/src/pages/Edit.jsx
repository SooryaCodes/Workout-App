import React, { useEffect } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
export default function Edit() {
  const [title, setTitle] = useState(null);
  const [load, setLoad] = useState(10);
  const [reps, setReps] = useState(30);
  const [error, setError] = useState();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const workout = { title, load, reps };
    const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch(`http://localhost:4000/api/workouts/${id}`,{
        headers:{
        Authorization: `Bearer ${user.token}`,

        }
      });
      const { title, load, reps } = await response.json();

      if (response.ok) {
        console.log(title,load,reps)
        setTitle(title);
        setLoad(load);
        setReps(reps);
      }
    };

    fetchWorkout();
  }, [id]);

  return (
    <div className="container px-5 md:px-10 mt-20">
      <h1 className="font-bold text-2xl mb-5 dark:text-white">Edit workout</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="base" value="Title" />
          </div>
          <TextInput
            id="base"
            type="text"
            sizing="md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="w-full flex items-center justify-between gap-5">
          <div className="w-1/2">
            <div className="mb-2 ">
              <Label htmlFor="base" value="Load" />
            </div>
            <TextInput
              id="base"
              type="number"
              sizing="md"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
            />
          </div>
          <div className="w-1/2">
            <div className="mb-2 ">
              <Label htmlFor="base" value="Reps" />
            </div>
            <TextInput
              id="base"
              type="number"
              sizing="md"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
          </div>
        </div>
        {error && (
          <React.Fragment>
            <span className="text-red-500 text-sm">{error}</span>
          </React.Fragment>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
