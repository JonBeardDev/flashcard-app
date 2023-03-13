import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory, useRouteMatch } from "react-router-dom";
import { readDeck } from "../utils/api";
import {
  HouseFill,
  PencilFill,
  JournalBookmarkFill,
  Trash3Fill,
  PlusCircle,
} from "react-bootstrap-icons";
import { deleteDeck } from "../utils/api";
import CardView from "../Cards/CardView";

// Function displays all deck details for a given deck, including action buttons and details cards for each card in the deck
function Deck() {
  // Initialize deck state as a blank object with a blank cards key
  const [deck, setDeck] = useState({ cards: [] });
  // Initialize cards state as a blank array
  const [cards, setCards] = useState([]);
  // Pull deckId from URL parameters
  const { deckId } = useParams();
  // Pull current URL
  const { url } = useRouteMatch();
  // Pull current page history for later pushes to new pages
  const history = useHistory();

  // Fetch deck details from data using readDeck API call any time the deckId changes in the URL
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck);

    return () => abortController.abort();
  }, [deckId]);

  // Set the cards array to be the same as the array of cards in the deck object (needed for deleting a card)
  // Re-renders when cards change
  useEffect(() => {
    setCards(deck.cards);
  }, [deck.cards]);

  // Map each card in the array to a details card. Shares card details and setCards function for deleting a card
  const cardViews = cards.map((card) => (
    <CardView key={card.id} card={card} setCards={setCards} />
  ));

  // Handler for deleting a deck with the delete button.
  const deleteHandler = async (event) => {
    // Confirmation pop-up
    const response = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (response) {
      // If "Ok" is selected, delete the deck from the data and send user to home page
      deleteDeck(deck.id).then(history.push("/"));
    }
    // If cancel is pressed, pop-up closes with no action
  };

  // Render only when the deck has been pulled from API
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
            / {deck.name}
          </span>
        </nav>
        <div className="d-flex p-0 my-2">
          {/* Display deck title at top of page */}
          <h2 className="font-weight-lighter flex-fill">{deck.name}</h2>
        </div>
        {/* Display deck description text */}
        <p>{deck.description}</p>
        {/* Action buttons */}
        <div className="d-flex p-0">
          {/* Edit button sends user to EditDeck page */}
          <Link to={`${url}/edit`}>
            <button
              type="button"
              className="btn btn-secondary my-2 ms-0 mr-2"
              style={{ width: 150 }}
            >
              <PencilFill
                style={{ verticalAlign: -4, width: 20, height: 20 }}
              />{" "}
              Edit
            </button>
          </Link>
          {/* Study button sends user to Study page */}
          <Link to={`${url}/study`}>
            <button
              type="button"
              className="btn btn-primary m-2"
              style={{ width: 150 }}
            >
              <JournalBookmarkFill
                style={{ verticalAlign: -4, width: 20, height: 20 }}
              />{" "}
              Study
            </button>
          </Link>
          {/* Add Cards button sends user to AddCard page */}
          <Link to={`${url}/cards/new`}>
            <button
              type="button"
              className="btn btn-primary m-2"
              style={{ width: 150 }}
            >
              <PlusCircle
                style={{ verticalAlign: -4, width: 20, height: 20 }}
              />{" "}
              Add Cards
            </button>
          </Link>
          {/* Delete button (pushed to right side) calls deleteHandler */}
          <button
            type="button"
            onClick={deleteHandler}
            className="btn btn-danger m-2 col-1 ml-auto"
          >
            <Trash3Fill style={{ verticalAlign: -4, width: 20, height: 20 }} />
          </button>
        </div>
        {/* Display cards for each card in the deck */}
        <div className="mt-4">
          <h2 className="font-weight-lighter flex-fill">Cards</h2>
          <div className="row">{cardViews}</div>
        </div>
      </div>
    );
  }
  // Show if API call is slow to respond
  return "Loading...";
}

export default Deck;
