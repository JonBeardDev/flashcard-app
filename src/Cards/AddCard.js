import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import { HouseFill } from "react-bootstrap-icons";
import CardForm from "./CardForm";

// Function displays a form allowing user to add details for a new card in the current deck
function AddCard() {
  // Initialize deck as a blank object
  const [deck, setDeck] = useState({});
  // Pull deck id from URL parameters
  const { deckId } = useParams();
  // Initialize form as an object with blank front and back keys, and the deck id from the URL
  const initialFormState = {
    front: "",
    back: "",
    deckId,
  };
  // Initialize formData
  const [formData, setFormData] = useState({ ...initialFormState });

  // Fetch deck details from data using readDeck API call any time the deckId changes in the URL
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck);

    return () => abortController.abort();
  }, [deckId]);

  // As user types into form fields, set values in formData object to match
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  /* Submitting form sends current formData object to createCard API call to add new card to data,
  then clears the fields for the user to add the next card */
  const handleSubmit = async (event) => {
    event.preventDefault();
    createCard(deckId, formData).then(setFormData(initialFormState));
  };

  // Display only when the deck is loaded from API
  if (deck.id) {
    return (
      <div>
        {/* Breadcrumb nav bar */}
        <nav className="row bg-light p-3 align-items-center">
          <Link to="/" className="m-2">
            <HouseFill style={{ verticalAlign: -2, width: 20, height: 20 }} />
            <span style={{ fontSize: 20 }}> Home</span>
          </Link>
          <span className="text-secondary" style={{ fontSize: 20 }}>
            {" "}
            /{" "}
          </span>
          <Link to={`/decks/${deckId}`} className="m-2">
            <span style={{ fontSize: 20 }}> {deck.name} </span>
          </Link>
          <span className="text-secondary" style={{ fontSize: 20 }}>
            {" "}
            / Add Card
          </span>
        </nav>
        <section>
          {/* Page title */}
          <h2 className="my-3" style={{ fontSize: 64 }}>
            Add Card
          </h2>
          {/* Display form via CardForm page - shares form data and change handler */}
          <CardForm formData={formData} handleChange={handleChange} />
          <div>
            {/* Done button sends user to current deck's Deck page */}
            <Link to={`/decks/${deckId}`}>
              <button
                type="button"
                className="btn btn-secondary my-2 ms-0 mr-2"
              >
                Done
              </button>
            </Link>
            {/* Submit button calls handleSubmit function with current form data */}
            <button
              type="submit"
              className="btn btn-primary my-2 ml-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </section>
      </div>
    );
  }
  // Show if API call is slow to respond
  return "Loading...";
}

export default AddCard;
