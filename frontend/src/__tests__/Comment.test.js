import { render, screen, cleanup } from "@testing-library/react";
import Comment from "../components/Comment";

afterEach(() => {
  cleanup();
});

test("Should render comment with correctly formatted name, date, and message", () => {
  // starting name lowercase and time with timestamp to test that name becomes capitalized and time is converted correctly
  const comment = {
    name: "lee",
    message: "Hello, world!",
    created: "2024-03-19 22:36:04",
    id: 1,
  };
  render(<Comment comment={comment} />);
  const commentElement = screen.getByTestId(`comment-${comment.id}`);
  expect(commentElement).toBeInTheDocument();
  expect(commentElement).toHaveTextContent("Lee");
  expect(commentElement).toHaveTextContent("Hello, world!");
  expect(commentElement).toHaveTextContent("on Mar 19 at 6:36 PM");
});
