import { useContext, useState } from "react";
import useBreadList from "./useBreadList";
import Results from "./Result";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedContextPet";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [reqeustParams, setReqestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreadList(animal);
  const results = useQuery(["searchParams", reqeustParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  const onChangeAnimal = (e) => {
    setAnimal(e.target.value);
  };
  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setReqestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input name="location" id="location" placeholder="Location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select id="animal" value={animal} onChange={onChangeAnimal}>
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="animal">
          Breeds
          <select id="breed" name="breed">
            <option />
            {breeds?.length
              ? breeds.map((breed) => <option key={breed}>{breed}</option>)
              : null}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
