import React from "react";
import { PlusCircle } from "react-bootstrap-icons";

// Function displays a message when the user tries to study from a deck with <3 cards
function NotEnough({ cards }) {
  // Set message (ensures correct grammar is used for 0, 1, and 2 cards in deck)
  let howManyCards = "";
  if (cards === 1) howManyCards = "There is 1 card";
  else howManyCards = `There are ${cards} cards`;

  return (
    <div>
      <div>
        {/* Displays message */}
        <h3>Not enough cards.</h3>
        <p style={{ fontSize: 20 }}>
          You need at least 3 cards to study. {howManyCards} in this deck.
        </p>
      </div>
      <div>
        {/* Add Cards button sends user to AddCard page for this deck */}
        <button className="btn btn-lg btn-primary">
          <PlusCircle style={{ verticalAlign: -3 }} /> Add Cards
        </button>
      </div>
    </div>
  );
}

export default NotEnough;
