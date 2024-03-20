import { useMutation, useQuery } from "@tanstack/react-query";
import { getComments, postComment, deleteComments } from "../services/comments";
import { SocketContext } from "../SocketProvider.jsx";
import { useContext } from "react";

export const useComments = () =>
  useQuery({
    queryKey: ["comments"],
    queryFn: () => getComments(),
  });

export const useAddComment = () => {
  let message = "";
  const socket = useContext(SocketContext);
  return useMutation({
    mutationFn: (body) => {
      message = body;
      return postComment(body);
    },
    onSuccess: () => {
      socket.emit("send-comment", message);
    },
  });
};

export const useDeleteComments = () => {
  const socket = useContext(SocketContext);
  return useMutation({
    mutationFn: () => deleteComments(),
    onSuccess: () => {
      socket.emit("delete-comments");
    },
  });
};
