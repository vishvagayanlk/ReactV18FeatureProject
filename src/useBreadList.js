import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreadList";

const useBreadList = (animal) => {
  const results = useQuery(["breeds", animal], fetchBreedList);
  return [results?.data?.breeds, results.status];
};

export default useBreadList;
