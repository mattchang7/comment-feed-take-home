import { useState, useEffect, useContext } from "react";
import { useComments } from "../hooks/useComments";
import { SocketContext } from "../SocketProvider";
import Comment from "./Comment";
import { useQueryClient } from "@tanstack/react-query";

const CommentFeed = ({ newComments, setNewComments }) => {
  const [comments, setComments] = useState([]);

  const { data } = useComments();
  const queryClient = useQueryClient();

  const socket = useContext(SocketContext);

  socket.on("connect", () => {
    console.log("You are connected with ID ", socket.id);
  });

  socket.on("receive-comment", (socketId) => {
    queryClient.invalidateQueries(["comments"]);
    if (socketId !== socket.id) {
      console.log(socketId);
      setNewComments(newComments + 1);
    }
  });

  socket.on("clear-comments", () =>
    queryClient.invalidateQueries(["comments"])
  );

  useEffect(() => {
    if (data !== undefined) setComments(data);
  }, [data]);

  return (
    <div
      className={
        comments.length > 0 ? "border border-zinc-600 rounded-md" : "opacity-0"
      }
    >
      {newComments > 0 && (
        <div className="px-3 pt-2 pb-1 w-full flex flex-row justify-center bg-zinc-500 rounded-t-md">{`${newComments} new ${
          newComments === 1 ? "comment" : "comments"
        }`}</div>
      )}
      <div className="max-h-[50vh] overflow-y-scroll">
        {comments.map((c, i) => (
          <Comment comment={c} key={c.id} last={i === comments.length - 1} />
        ))}
      </div>
    </div>
  );
};

export default CommentFeed;
