const Comment = ({ comment, last }) => {
  // Dates are created as DateTime strings in UTC+00:00, so that must be accounted for when creating the date in the client
  const date = new Date(comment.created + " GMT+00:00");
  return (
    <div
      key={comment.id}
      className="w-full flex flex-col items-center px-3"
      data-testid={`comment-${comment.id}`}
    >
      <div className="w-full my-2">
        <div className="text-zinc-400">
          {comment.name[0].toUpperCase() + comment.name.slice(1)} on{" "}
          {`${date.toLocaleString(undefined, {
            month: "short",
            day: "numeric",
          })} at ${
            date.getHours() > 12
              ? `${date.getHours() - 12}:${
                  date.getMinutes() < 10
                    ? "0" + date.getMinutes()
                    : date.getMinutes()
                } PM`
              : `${date.getHours()}:${
                  date.getMinutes() < 10
                    ? "0" + date.getMinutes()
                    : date.getMinutes()
                } AM`
          }`}
        </div>
        <div>{comment.message}</div>
      </div>
      {!last && <div className="h-[1px] bg-zinc-600 w-full" />}
    </div>
  );
};

export default Comment;
