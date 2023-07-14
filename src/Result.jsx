import { useMemo, useState } from "react";
import Pet from "./Pet";

const Results = ({ pets }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    if (!pets?.length) return;
    return Math.ceil(pets?.length / itemsPerPage);
  }, [pets]);

  const currentPageData = useMemo(() => {
    if (!pets?.length) return;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = pets.slice(startIndex, endIndex);
    return currentPageData;
  }, [currentPage, pets]);

  if (!pets?.length) {
    return <h1>No Pets Found</h1>;
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className="search">
      <div>
        {currentPageData.map(
          ({ name, breed, animal, id, images, city, state }) => (
            <Pet
              name={name}
              animal={animal}
              breed={breed}
              location={`${city}, ${state}`}
              images={images}
              id={id}
              key={id}
            />
          ),
        )}
        <div>
          <button
            name="next"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            name="previous"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </div>
      </div>
    </div>
  );
};
export default Results;
