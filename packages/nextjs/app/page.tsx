"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAccount } = useAccount();
  const { data: eventCount } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "eventCount",
  });

  const { data: getEvents } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getEvents",
  });

  const { data: getImagesCountForAllEvents } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "getImagesCountForAllEvents",
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-end">
        <button className="btn btn-primary ">
          <Link href="/CreateEvent">Create Event</Link>
        </button>
      </div>
      <div className="mb-8 flex gap-4">
        <p className="mb-4 text-gray-800">
          Connected Address: <span className="font-semibold">{connectedAccount}</span>
        </p>
        <p className="text-2xl font-bold text-gray-900">
          Total Events Created: <span className="text-blue-600">{Number(eventCount)}</span>
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 text-center">List of Events Created</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Event Name
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Image Count
                </th>
              </tr>
            </thead>
            <tbody>
              {getEvents?.map((event, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">{event.name}</td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">{event.owner}</td>
                  <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-700">
                    {getImagesCountForAllEvents ? getImagesCountForAllEvents[index].toString() : "Loading..."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
