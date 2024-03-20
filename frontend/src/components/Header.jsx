import { useState } from "react";
import { useDeleteComments } from "../hooks/useComments";
import OverflowMenu from "./OverflowMenu";

export default function Header({ setNewComments }) {
  const [devTools, setDevTools] = useState(false);
  const { mutate: deleteComments } = useDeleteComments();

  return (
    <header className="flex flex-row justify-between w-full text-xl font-bold py-5">
      <span className="opacity-0 w-6" />
      Comments
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 mr-8 hover:stroke-zinc-400"
        onClick={() => setDevTools(true)}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
        />
      </svg>
      {devTools && (
        <OverflowMenu
          aria-hidden="true"
          items={[
            {
              name: "Delete comments",
              action: () => {
                deleteComments();
                setDevTools(false);
                setNewComments(0);
              },
            },
          ]}
          isOpen={devTools}
          toggle={setDevTools}
        />
      )}
    </header>
  );
}
