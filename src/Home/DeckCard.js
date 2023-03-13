import React from "react";
import { Link } from "react-router-dom";
import {
  EyeFill,
  JournalBookmarkFill,
  Trash3Fill,
} from "react-bootstrap-icons";
import { deleteDeck } from "../utils/api";

// Function creates a card for a deck to display in the home page list
export const DeckCard = ({ deck, setDecks }) => {
  // Handler for deleting a deck with the delete button.
  const deleteHandler = async (event) => {
    // Confirmation pop-up
    const response = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    // If "Ok" is selected, delete the deck from the data
    if (response) {
      deleteDeck(deck.id);
      // Filter out the deleted deck from the current decks so that display is automatically updated
      setDecks((currentDecks) =>
        currentDecks.filter((currentDeck) => currentDeck.id !== deck.id)
      );
    }
    // "Cancel" closes the pop-up with no action
  };

  // Show card. On large screens display in pairs, on smaller screens display individually in a column
  return (
    <article className="col-12 col-lg-6 my-2 p-2 align-self-stretch">
      <div className="border p-4 h-100 d-flex flex-column justify-content-between">
        {/* Show deck title on left and number of cards on right of card */}
        <div className="d-flex p-0 align-items-center">
          <h2 className="font-weight-lighter flex-fill">{deck.name}</h2>
          <p className="ml-auto">{deck.cards.length} cards</p>
        </div>
        {/* Show deck description in middle of card */}
        <p>{deck.description}</p>
        <div className="d-flex p-0">
          {/* View button - links to Deck page */}
          <Link to={`decks/${deck.id}`}>
            <button
              type="button"
              className="btn btn-secondary my-2 ms-0"
              style={{ width: 120 }}
            >
              <EyeFill style={{ verticalAlign: -4, width: 20, height: 20 }} />{" "}
              View
            </button>
          </Link>
          {/* Study button - links to Study page */}
          <Link to={`/decks/${deck.id}/study`}>
            <button
              type="button"
              className="btn btn-primary m-2"
              style={{ width: 120 }}
            >
              <JournalBookmarkFill
                style={{ verticalAlign: -4, width: 20, height: 20 }}
              />{" "}
              Study
            </button>
          </Link>
          {/* Delete button, pushed to right side of card - calls deleteHandler */}
          <button
            type="button"
            onClick={deleteHandler}
            className="btn btn-danger m-2 col-2 ml-auto"
          >
            <Trash3Fill style={{ verticalAlign: -4, width: 20, height: 20 }} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default DeckCard;
