import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import { HouseFill } from "react-bootstrap-icons";

// Function allows user to edit name and description of an existing deck, shows current info in fields on load
function EditDeck() {
  // Initialize deck as blank object
  const [deck, setDeck] = useState({});
  // Pull deck id from URL parameters
  const { deckId } = useParams();
  // Pull current page history for later pushes to new pages
  const history = useHistory();
  // Set form as blank initially
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    id: "",
  });

  // Fetch deck details from data using readDeck API call any time the deckId changes in the URL
  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal).then(setDeck);

    return () => abortController.abort();
  }, [deckId]);

  // When deck is loaded from API, set form data to existing deck details
  useEffect(() => {
    if (deck) {
      setFormData({
        name: deck.name,
        description: deck.description,
        id: deck.id,
      });
    }
  }, [deck, deck.name, deck.description, deck.id]);

  // As user types into form fields, set values in formData object to match
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: [target.value] });
  };

  /* Submitting form sends current formData object to updateDeck API call to change deck in data,
  then sends user to the View page for the deck */
  const handleSubmit = async (event) => {
    event.preventDefault();
    updateDeck(formData).then((data) => history.push(`/decks/${data.id}`));
  };

  // Display only when the form data has been set from the deck API call
  if (formData.name) {
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
            / Edit Deck
          </span>
        </nav>
        <section>
          {/* Page title */}
          <h2 className="my-3" style={{ fontSize: 64 }}>
            Edit Deck
          </h2>
          <form name="editDeck" onSubmit={handleSubmit}>
            {/* Deck Name label and text input. Typing calls handleChange function */}
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                id="name"
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
                placeholder="Deck Name"
                required={true}
              />
            </div>
            {/* Deck description label and input. Typing calls handleChange function */}
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                onChange={handleChange}
                value={formData.description}
                placeholder="Brief description of the deck"
                required={true}
                rows="4"
              />
            </div>
            <div>
              {/* Cancel button returns user to home page*/}
              <Link to="/">
                <button
                  type="button"
                  className="btn btn-secondary my-2 ms-0 mr-2"
                >
                  Cancel
                </button>
              </Link>
              {/* Call handleSubmit function with current form data*/}
              <button type="submit" className="btn btn-primary my-2 ml-2">
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    );
  }
  // Show if API call is slow to respond
  return "Loading...";
}

export default EditDeck;
