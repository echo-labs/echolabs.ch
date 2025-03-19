"use client";

import { Button } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import path from "path";
import { decodeJson } from "../utils";

export default function NamesListPage() {
  const [namesList, setNamesList] = useState<string[]>([]);
  const [pairings, setPairings] = useState({});
  const pathname = usePathname();

  useEffect(() => {
    try {
      const encoded = path.basename(pathname);

      const pairings = decodeJson(encoded);
      setNamesList(Object.keys(pairings));
      setPairings(pairings);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      setError(
        "An error occurred. Please check the link is correct and try again or ask for a new link."
      );
    }
  }, []);

  const [error, setError] = useState<string | null>(null);

  function handleShowName(nameToDelete) {
    alert(`You have to gift to ${pairings[nameToDelete]}`);
  }

  return (
    <>
      <div className="text-3xl font-semibold">🎅🏻 Wichtle</div>
      <div className="py-4 text-sm text-gray-500">
        'Wichtle' is what Secret Santa is called in Swiss German. Just add all
        participants' name and create a link!
      </div>
      <div className="p-2 text-sm font-light">
        See who you was assigned to you by clicking "Show" at your name.
      </div>
      <div className="p-2 text-sm font-bold">Do not look at others!!</div>
      <div className="w-full flex-row items-center justify-center">
        <div className="max-w-md space-y-2 overflow-scroll">
          {error && (
            <div className="p-4 text-red-500 bg-red-100 rounded-xl">
              {error}
            </div>
          )}
          {namesList.map((existingName) => (
            <div
              key={existingName}
              className="flex items-center justify-between rounded bg-gray-100 p-2"
            >
              <span>{existingName}</span>

              <Button className="" onClick={() => handleShowName(existingName)}>
                Show
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
