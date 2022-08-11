import React, { useEffect } from "react";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import formatDate from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";
export default function Home() {
  const { workouts, setWorkouts } = useContext(WorkoutContext);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch("http://localhost:4000/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setWorkouts(data);
      }
    };
    if (user) {
      fetchWorkout();
    }
  }, [setWorkouts, user]);

  const deleteWorkout = async (id) => {
    if (!user) return;
    const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      let tempWorkouts = [...workouts];
      setWorkouts(tempWorkouts.filter((workout) => workout._id !== id));
    }
  };
  return (
    <div className="container px-5 md:px-10 lg:px-0 mt-20  bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg">
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Workout name</Table.HeadCell>
          <Table.HeadCell>Load</Table.HeadCell>
          <Table.HeadCell>Reps</Table.HeadCell>
          <Table.HeadCell>Time</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Action</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {workouts?.map((workout, index) => {
            return (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={workout?._id}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {workout?.title}
                </Table.Cell>
                <Table.Cell>{workout?.load} Kg</Table.Cell>
                <Table.Cell>{workout?.reps}</Table.Cell>
                <Table.Cell>
                  {formatDate(new Date(workout?.createdAt), {
                    addSuffix: true,
                  })}
                </Table.Cell>

                <Table.Cell>
                  <Link
                    to={`/edit/${workout?._id}`}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500 mr-5"
                  >
                    Edit
                  </Link>
                  <span
                    onClick={() => deleteWorkout(workout?._id)}
                    className="cursor-pointer font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      {!workouts.length && (
        <span className="dark:text-slate-400 font-semibold text-md w-full h-20 flex items-center justify-center">
          No Workouts
        </span>
      )}
    </div>
  );
}
