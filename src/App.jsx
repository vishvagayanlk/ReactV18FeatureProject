import { createRoot } from "react-dom/client";
import SearchParams from "./SearchParams";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Details from "./Details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AdoptedPetContext from "./AdoptedContextPet";

const queryClient = new QueryClient({
  quries: {
    staleTime: Infinity,
    cahceTime: Infinity,
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <Routes>
            <Route path="/" element={<SearchParams />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </AdoptedPetContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
// accesing browser dom element with id root
const container = document.getElementById("root");
// create link real dom and virtual dom in react
const root = createRoot(container);
// update vitural dom and it caused to render actual dom
root.render(<App />);
