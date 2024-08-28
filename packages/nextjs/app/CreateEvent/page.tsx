"use client";

import { useState } from "react";
import { InputBase } from "~~/components/scaffold-eth";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const ViewEvent = () => {
  const [addEvents, setAddEvents] = useState<string>("");

  const { writeContractAsync } = useScaffoldWriteContract("YourContract");

  const handleEventCreation = async () => {
    try {
      const result = await writeContractAsync({
        functionName: "createEvent",
        args: [addEvents],
        value: undefined,
      });
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">View Event</h1>

      <div className="mb-6">
        <label htmlFor="Event Name" className="block text-sm font-medium text-gray-700 mb-2">
          Event Name
        </label>
        <InputBase value={addEvents} onChange={setAddEvents} />
        <button
          onClick={handleEventCreation}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export default ViewEvent;
