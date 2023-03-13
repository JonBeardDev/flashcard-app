import React from "react";

// Function shows the fields for the add/edit card pages. Fields are blank for Add, filled with current info for Edit
function CardForm({ formData, handleChange }) {
  return (
    <form name="card">
      {/* Front of card label and text input. Typing calls handleChange function */}
      <div className="form-group">
        <label>Front</label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          onChange={handleChange}
          value={formData.front}
          placeholder="Front side of card"
          required={true}
          rows="3"
        />
      </div>
      {/* Back of card label and text input. Typing calls handleChange function */}
      <div className="form-group">
        <label>Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          onChange={handleChange}
          value={formData.back}
          placeholder="Back side of card"
          required={true}
          rows="3"
        />
      </div>
    </form>
  );
}

export default CardForm;
