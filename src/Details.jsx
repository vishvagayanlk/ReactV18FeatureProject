import { useNavigate, useParams } from "react-router-dom";
import fetchPet from "./fetchPet";
import { useQuery } from "@tanstack/react-query";
import Carousel from "./carousel";
import ErrorBoundary from "./ErrorBoundries";
import { useContext, useState } from "react";
import Modal from "./Modal";
import AdoptedPetContext from "./AdoptedContextPet";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [, setAdoptedPet] = useContext(AdoptedPetContext);
  const results = useQuery(["details", id], fetchPet);
  const handleOnclick = () => {
    setShowModal(true);
  };
  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }
  if (results.isError) {
    return <div>Error occured while fetching...</div>;
  }
  const {
    data: {
      pets: [pet],
    },
  } = results;
  return (
    <div className="details">
      {showModal ? (
        <Modal>
          <div>
            <h1>Would you like to adopt {pet.name}?</h1>
            <div className="buttons">
              <button
                onClick={() => {
                  setAdoptedPet(pet);
                  navigate("/");
                }}
              >
                Yes
              </button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </Modal>
      ) : null}
      <Carousel images={pet.images} />;
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} — {pet.city} — {pet.state}
          <button onClick={handleOnclick}>Adopt {pet.name}</button>
        </h2>
        <p>{pet.description}</p>
      </div>
    </div>
  );
};

const DetailsErrorBoundries = (props) => {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
};

export default DetailsErrorBoundries;
