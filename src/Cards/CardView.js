import React from "react";
import { PencilFill, Trash3Fill } from "react-bootstrap-icons";
import { useRouteMatch, Link } from "react-router-dom";
import { deleteCard } from "../utils/api";

// Function displays a card on the Deck page for each card in the current deck
function CardView({ card, setCards }) {
  // Pull current URL
  const { url } = useRouteMatch();

  // Handler for deleting the card
  const deleteHandler = async (event) => {
    // Confirmation pop-up
    const response = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );
    // If OK is selected, delete card from the data
    if (response) {
      deleteCard(card.id);
      // Filter out the deleted card from the current cards so that display is automatically updated
      setCards((currentCards) =>
        currentCards.filter((currentCard) => currentCard.id !== card.id)
      );
    }
    // If Cancel is selected, close pop-up with no action
  };

  // Display only when cards have been loaded from API on Deck page
  if (card.id) {
    // Show card. On large screens display in pairs, on smaller screens display individually in a column
    return (
      <article className="col-12 col-lg-6 my-2 p-2 align-self-stretch">
        {/* Justify content ensures that buttons are always at the bottom of the card, regardless of text length */}
        <div className="border p-3 h-100 d-flex flex-column justify-content-between">
          {/* Display front text on left and back text on right side of card */}
          <div className="d-flex flex-row">
            <div className="col-6 m-2 text-secondary">
              <p>{card.front}</p>
            </div>
            <div className="col-6 m-2 text-secondary">
              <p>{card.back}</p>
            </div>
          </div>
          {/* Push buttons to right side of card */}
          <div className="d-flex flex=row justify-content-end">
            <div>
              {/* Edit button sends user to EditCard page for the given card */}
              <Link to={`${url}/cards/${card.id}/edit`}>
                <button type="button" className="btn btn-secondary m-2">
                  <PencilFill
                    style={{ verticalAlign: -4, width: 20, height: 20 }}
                  />{" "}
                  Edit
                </button>
              </Link>
              {/* Delete button calls deleteHandler for the current card */}
              <button
                type="button"
                className="btn btn-danger m-2"
                onClick={deleteHandler}
              >
                <Trash3Fill
                  style={{ verticalAlign: -4, width: 20, height: 20 }}
                />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }
  // Show if API call is slow to respond
  return "Loading...";
}

export default CardView;
