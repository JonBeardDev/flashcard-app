import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../Home/DeckList";
import Study from "../Decks/Study";
import Deck from "../Decks/Deck";
import CreateDeck from "../Decks/CreateDeck";
import EditDeck from "../Decks/EditDeck";
import AddCard from "../Cards/AddCard";
import EditCard from "../Cards/EditCard";

function Layout() {
  // Display each screen of the app in the space below the app's header
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            {/*Show a card for each deck on the home page*/}
            <DeckList />
          </Route>
          <Route path="/decks/new">
            {/*Show a form to add a new deck when the Create Deck button is selected*/}
            <CreateDeck />
          </Route>
          <Route exact={true} path="/decks/:deckId">
            {/*Show deck details, including cards, when the View button for that deck is selected*/}
            <Deck />
          </Route>
          <Route path="/decks/:deckId/edit">
            {/*Show a form to edit a given deck's name and description, including the current values, when the Edit button is selected*/}
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            {/*Show the study deck screen, including the ability to flip from front to back of each card, when the Study button is selected*/}
            <Study />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            {/*Show a form to add front and back details for a new flashcard for a given deck, when the Add Cards button is selected*/}
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            {/*Show a form to edit front and back details of an existing card in a given deck, when the Edit button is selected*/}
            <EditCard />
          </Route>
          <Route>
            {/*Display a "Not Found" screen when an incorrect url path is entered*/}
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
