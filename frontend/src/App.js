import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "./SocketProvider";
import CommentFeed from "./components/CommentFeed";
import InputForm from "./components/InputForm";
import Header from "./components/Header";
import { useState } from "react";
const queryClient = new QueryClient();

function App() {
  const [newComments, setNewComments] = useState(0);
  return (
    <SocketProvider>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col items-center">
          <Header setNewComments={setNewComments} />
          <main className="sm:w-[500px] w-5/6">
            <InputForm setNewComments={setNewComments} />
            <CommentFeed
              newComments={newComments}
              setNewComments={setNewComments}
            />
          </main>
        </div>
      </QueryClientProvider>
    </SocketProvider>
  );
}
export default App;
