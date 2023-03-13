import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";
import { readDeck } from "../utils/api";
import StudyCard from "./StudyCard";
import NotEnough from "./NotEnough";

// Function alternately displays front and back of cards allowing user to "study" questions/answers
function Study() {
  // Initialize deck as blank object with blank cards key
  const [deck, setDeck] = useState({ cards: [] });
  // Pull deck id from URL parameters
  const { deckId } = useParams();

  // Fetch deck details from data using readDeck API call any time the deckId changes in the URL
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck);

    return () => abortController.abort();
  }, [deckId]);

  // In return statement, either display NotEnough page when fewer than 3 cards, or display StudyCard page
  let cardSpace;
  if (deck.cards.length < 3) {
    // Shares number of cards, so correct grammar is used in message
    cardSpace = <NotEnough cards={deck.cards.length} />;
  } else {
    // Shares the cards array
    cardSpace = (
      <div>
        <StudyCard cards={deck.cards} />
      </div>
    );
  }

  // Display only when deck is loaded from API
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
            / Study
          </span>
        </nav>
        <section>
          {/* Page title */}
          <h2 className="my-3" style={{ fontSize: 64 }}>
            {deck.name}: Study
          </h2>
          {/* Show either "not enough" message or cards to study from */}
          {cardSpace}
        </section>
      </div>
    );
  }
  // Display if API call is slow
  return "Loading...";
}

export default Study;
