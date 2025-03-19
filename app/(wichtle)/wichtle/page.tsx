'use client';

import { Button, Input } from '@headlessui/react';
import React, { useState } from 'react';
import { encodeJson, mapToJson, secretSantaPairings } from './utils';

export default function NamesListPage() {
  const [name, setName] = useState('');
  const [namesList, setNamesList] = useState<string[]>([]);

  function onShare() {
    const participants = namesList;
    const pairs = secretSantaPairings(participants);
    const encodedNames = encodeJson(mapToJson(pairs));

    navigator.clipboard.writeText(`${window.location.origin}/wichtle/${encodedNames}`);
    alert('Copied URL path to clipboard!');
  }

  const handleAddName = (e) => {
    e.preventDefault();

    // Trim the name and check if it's not empty
    if (name.trim()) {
      // Check for duplicates
      if (!namesList.includes(name.trim())) {
        setNamesList([...namesList, name.trim()]);
        setName(''); // Clear input after adding
      } else {
        alert('This name is already in the list!');
      }
    }
  };

  const handleDeleteName = (nameToDelete) => {
    setNamesList(namesList.filter((existingName) => existingName !== nameToDelete));
  };

  return (
    <>
      <div className="text-3xl font-semibold">🎅🏻 Wichtle</div>
      <div className="py-4 text-sm text-gray-500">
        'Wichtle' is what Secret Santa is called in Swiss German. Just add all
        participants' name and create a link!
      </div>
      How does it work?
      <div className="pb-4 text-sm text-gray-500">
        Just add all participants' name and create a link to send everybody.
      </div>
      <div className="mt-12">
        <form onSubmit={handleAddName} className="mb-4 flex space-x-2">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
            className="flex-grow border-1 rounded w-full p-2"
          />
          <Button
            type="submit"
            className="rounded bg-gray-700 text-white px-4 py-2 w-36"
          >
            Add Name
          </Button>
        </form>

        {namesList.length > 0 ? (
          <div className="space-y-2">
            {namesList.map((existingName, index) => (
              <div
                key={existingName}
                className="flex items-center justify-between rounded bg-gray-100 p-2"
              >
                <span>
                  {index + 1}. {existingName}
                </span>
                <Button
                  className="hover:bg-white hover:text-red-500 rounded px-2"
                  onClick={() => handleDeleteName(existingName)}
                >
                  Delete
                </Button>
              </div>
            ))}
            <Button
              className="text-center text-green-100 bg-green-800 hover:bg-green-700 rounded mx-auto p-2"
              onClick={onShare}
            >
              Share link
            </Button>
          </div>
        ) : (
          <p className="text-center text-red-500 bg-red-50 rounded mx-auto p-2">
            Add names first!
          </p>
        )}
      </div>
    </>
  );
}
