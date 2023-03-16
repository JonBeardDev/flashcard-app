import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api";
import DeckCard from "./DeckCard";
import { PlusCircle } from "react-bootstrap-icons";

// Function displays a card for each existing deck, including the name, number of cards, description, and action buttons
function DeckList() {
  // Set initial decks state to a blank array
  const [decks, setDecks] = useState([]);

  // On page load, fetch deck details from Data API using listDecks
  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then(setDecks);

    return () => abortController.abort();
  }, []);

  // Map each existing to deck to a Deck Card - shares deck object and setDecks function (for deleting)
  const deckList = decks.map((deck) => (
    <DeckCard key={deck.id} deck={deck} setDecks={setDecks} />
  ));

  if (decks.length !== 0) {
    return (
      <div className="container">
        {/* Display a "Create Deck" button at the top of the page that links to the CreateDeck page */}
        <Link to="/decks/new">
          <button type="button" className="btn btn-secondary btn-lg m-2">
            <PlusCircle style={{ verticalAlign: -3 }} /> Create Deck
          </button>
        </Link>
        <div className="container">
          {/* Displays all cards for existing decks*/}
          <div className="row">{deckList}</div>
        </div>
      </div>
    );
  }
  return "Loading...";
}

export default DeckList;
