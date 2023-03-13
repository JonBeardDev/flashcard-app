import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function StudyCard({ cards }) {
  // Initialize index of array to 0 (i.e first card in deck)
  const [index, setIndex] = useState(0);
  // Initialize as first card
  const [card, setCard] = useState(cards[0]);
  // Initialize front of card
  const [isFront, setIsFront] = useState(true);
  // Pull current page history for later pushes to new pages
  const history = useHistory();

  // When flip button is selected, flips card from front to back and vice versa
  const flipHandler = (event) => {
    event.preventDefault();
    setIsFront(!isFront);
  };

  // Moves to next card when Next button is selected
  const nextHandler = (event) => {
    event.preventDefault();
    // If the next index exists in the array (i.e there is at least one more card)...
    if (index + 1 < cards.length) {
      // Increase the index by one
      setIndex((currentIndex) => currentIndex + 1);
      // Move to next card in array
      setCard(cards[index + 1]);
      // Set card to front side
      setIsFront(true);
    }
    // Otherwise, if current card is last in deck...
    else {
      if (
        // Confirmation pop-up
        window.confirm(
          "Restart cards?\n\nClick 'Cancel' to return to the home page."
        )
      ) {
        // If "Ok" is selected, reset index, card, and front to initial states
        setIndex(0);
        setCard(cards[0]);
        setIsFront(true);
      }
      // Otherwise, if "Cancel" is selected, send user to home page
      else {
        history.push("/");
      }
    }
  };

  // Determine card info and correct buttons to show (initialize as blank)
  let cardInfo = "";
  let buttons;
  // If the front of the card is to be shown...
  if (isFront) {
    // Show the text on the front of the card
    cardInfo = card.front;
    // Show the Flip button which calls the flipHandler function
    buttons = (
      <div>
        <button onClick={flipHandler} className="btn btn-secondary btn-lg">
          Flip
        </button>
      </div>
    );
  }
  // If the back of the card is to be shown...
  else {
    // Show the text on the back of the card
    cardInfo = card.back;
    // Show the Flip button which calls the flipHandler function AND the Next buton which calls the nextHandler function
    buttons = (
      <div>
        <button onClick={flipHandler} className="btn btn-secondary btn-lg mr-2">
          Flip
        </button>
        <button onClick={nextHandler} className="btn btn-primary btn-lg ml-2">
          Next
        </button>
      </div>
    );
  }

  // Display card across the width of the page
  return (
    <article className="col-12 my-2 p-2 align-self-stretch">
      <div className="border p-4 h-100 d-flex flex-column">
        <div className="d-flex p-0">
          {/* Show card number and number of cards in deck */}
          <h3>
            Card {index + 1} of {cards.length}
          </h3>
        </div>
        <div>
          {/* Show card text and buttons */}
          <p style={{ fontSize: 20 }}>{cardInfo}</p>
        </div>
        <div>{buttons}</div>
      </div>
    </article>
  );
}

export default StudyCard;
