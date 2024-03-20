export const getComments = async () => {
  const res = await fetch("http://localhost:3001/getComments");
  const data = await res.json();
  return data.reverse();
};

export const postComment = async (body) => {
  const res = await fetch("http://localhost:3001/createComment", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};

export const deleteComments = async () => {
  const res = await fetch("http://localhost:3001/deleteComments", {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
