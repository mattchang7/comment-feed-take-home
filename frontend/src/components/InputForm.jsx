import { useState } from "react";
import { useAddComment } from "../hooks/useComments";

const InputForm = ({ setNewComments }) => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState({
    name: false,
    message: false,
  });
  const { mutate } = useAddComment();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (name !== "" && message !== "") {
          mutate({
            name,
            message,
          });
          setNewComments(0);
          setMessage("");
          setName("");
        } else {
          setError({
            name: name === "",
            message: message === "",
          });
        }
      }}
      className="flex flex-col items-center"
    >
      <label htmlFor="name" className="sr-only">
        Name
      </label>
      <input
        id="name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError({
            ...error,
            name: false,
          });
        }}
        placeholder="Please enter your name"
        className={
          error.name
            ? "text-zinc-900 border-2 border-red-500 outline-none p-2 mb-2 h-10 w-full rounded-lg"
            : "text-zinc-900 outline-none p-2 mb-2 h-10 w-full rounded-lg"
        }
      />
      <label htmlFor="message" className="sr-only">
        Message
      </label>
      <textarea
        id="message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
          setError({
            ...error,
            message: false,
          });
        }}
        placeholder="Type your comment here..."
        className={
          error.message
            ? "text-zinc-900 border-2 border-red-500 outline-none resize-none p-2 mb-2 h-40 w-full rounded-lg"
            : "text-zinc-900 outline-none resize-none p-2 mb-2 h-40 w-full rounded-lg"
        }
      />
      <button
        type="submit"
        className="flex flex-row justify-between w-32 p-2 hover:text-zinc-400 mb-4"
      >
        Comment
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>
      </button>
    </form>
  );
};

export default InputForm;
