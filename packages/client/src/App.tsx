import { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createWSClient, httpBatchLink, splitLink, wsLink } from "@trpc/client";
import { trpc } from "./utils/trpc";
import Welcome from "./components/Welcome";
import "./App.css";
import RandomNumber from "./components/RandomNumber";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  // https://github.com/trpc/trpc/discussions/1903 - Solution by jlalmes with changes
  const [trpcClient] = useState(() => {
    const wsClient = createWSClient({ url: "ws://localhost:4000/trpc" });
    return trpc.createClient({
      links: [
        splitLink({
          condition: (op) => op.type === "subscription",
          true: wsLink({ client: wsClient }),
          false: httpBatchLink({ url: "http://localhost:4000/trpc" }),
        }),
      ],
    });
  });

  // No websockets
  // const [trpcClient] = useState(() =>
  //   trpc.createClient({
  //     links: [
  //       httpBatchLink({
  //         url: "http://localhost:4000/trpc",
  //       }),
  //     ],
  //   })
  // );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <div>
            <a href="https://trpc.io/v" target="_blank">
              <img src="/trpc.svg" className="logo" alt="tRPC logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src="/react.svg" className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>tRPC + React</h1>
          <div className="card">
            <Welcome name="Liran" />
          </div>
          <div className="card">
            <RandomNumber />
          </div>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
