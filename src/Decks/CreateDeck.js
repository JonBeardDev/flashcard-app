import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { HouseFill } from "react-bootstrap-icons";
import { createDeck } from "../utils/api";

// Function displays a form to allow users to add a new deck to the data
function CreateDeck() {
  // Add history variable for later push to another page
  const history = useHistory();
  // Set form as blank initially
  const initialFormState = {
    name: "",
    description: "",
  };

  // Set formData as blank initially
  const [formData, setFormData] = useState({ ...initialFormState });

  // As user types into form fields, set values in formData object to match
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  /* Submitting form sends current formData object to createDeck API call to add new deck to data,
  then sends user to the View page for the new deck */
  const handleSubmit = async (event) => {
    event.preventDefault();
    createDeck(formData).then((data) => history.push(`/decks/${data.id}`));
  };

  return (
    <div>
      {/* Breadcrumb Nav bar at top of page */}
      <nav className="row bg-light p-3 align-items-center">
        <Link to="/" className="m-2">
          <HouseFill style={{ verticalAlign: -2, width: 20, height: 20 }} />
          <span style={{ fontSize: 20 }}> Home</span>
        </Link>
        <span className="text-secondary" style={{ fontSize: 20 }}>
          {" "}
          / Create Deck
        </span>
      </nav>
      <section>
        {/* Page title */}
        <h2 className="my-3" style={{ fontSize: 64 }}>
          Create Deck
        </h2>
        <form name="create">
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
            <button
              type="submit"
              className="btn btn-primary my-2 ml-2"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default CreateDeck;
