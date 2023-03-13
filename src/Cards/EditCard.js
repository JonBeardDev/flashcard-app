import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, readCard, updateCard, deleteCard } from "../utils/api";
import { HouseFill, Trash3Fill } from "react-bootstrap-icons";
import CardForm from "./CardForm";

// Function displays a form allowing user to edit details for the current card in the current deck
function EditCard() {
  // Initialize deck as a blank object
  const [deck, setDeck] = useState({});
  // Initialize card as a blank object
  const [card, setCard] = useState({});
  // Pull deck id and card id from URL parameters
  const { deckId, cardId } = useParams();
  // Pull current page history for later pushes to new pages
  const history = useHistory();

  // Initialize form as a blank object with keys
  const [formData, setFormData] = useState({
    front: "",
    back: "",
    deckId: "",
    id: "",
  });

  // Fetch deck details from data using readDeck API call any time the deckId changes in the URL
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck);

    return () => abortController.abort();
  }, [deckId]);

  // Fetch card details from data using readCard API call any time the cardId changes in the URL
  useEffect(() => {
    const abortController = new AbortController();
    readCard(cardId, abortController.signal).then(setCard);

    return () => abortController.abort();
  }, [cardId]);

  // When the card has been loaded, set the form data to match the details in the card object
  useEffect(() => {
    if (card) {
      setFormData({
        front: card.front,
        back: card.back,
        deckId: Number(deckId),
        id: cardId,
      });
    }
  }, [card, card.front, card.back, deckId, cardId]);

  // As user types into form fields, set values in formData object to match
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  /* Submitting form sends current formData object to updateCard API call to change card in data,
  then sends user to the Deck page for the deck */
  const handleSubmit = async (event) => {
    event.preventDefault();
    updateCard(formData).then(history.push(`/decks/${deckId}`));
  };

  // Handler for deleting the card instead of editing
  const deleteHandler = async (event) => {
    // Confirmation pop-up
    const response = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );
    // If OK is selected, delete card and send user to the current deck's Deck page
    if (response) {
      deleteCard(cardId).then(history.push(`/decks/${deckId}`));
    }
    // If Cancel is selected, close pop-up with no action
  };

  // Display only when form data has been set following the card loading from API
  if (formData.front) {
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
            / Edit Card {cardId}
          </span>
        </nav>
        <section>
          {/* Page title with deck name */}
          <h2 className="my-3" style={{ fontSize: 64 }}>
            {deck.name}: Edit Card
          </h2>
          {/* Display form fields via CardForm page - shares current form data (to show in fields) and change handler */}
          <CardForm formData={formData} handleChange={handleChange} />
          <div className="d-flex">
            {/* Cancel button sends user to current Deck page without saving any changes */}
            <Link to={`/decks/${deckId}`}>
              <button
                type="button"
                className="btn btn-secondary my-2 ms-0 mr-2 col-12"
              >
                Cancel
              </button>
            </Link>
            {/* Submit button calls handleSubmit function with current form data */}
            <button
              type="submit"
              className="btn btn-primary my-2 ml-2 col-1"
              onClick={handleSubmit}
            >
              Save
            </button>
            {/* Delete button, pushed to right side of page, calls deleteHandler */}
            <button
              type="button"
              onClick={deleteHandler}
              className="btn btn-danger col-1 ml-auto m-2"
            >
              <Trash3Fill
                style={{ verticalAlign: -4, width: 20, height: 20 }}
              />
            </button>
          </div>
        </section>
      </div>
    );
  }
  // Show if API call is slow to respond
  return "Loading...";
}

export default EditCard;
