import { useState } from "react";

function AddTaskForm({ saveTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    setTitle(title.trim());
    setTitle("");
    setDescription("");
    saveTask(title, description);
  };

  return (
    <form
      className="w-full px-4 pt-2 flex flex-col items-center sm:flex-row sm:items-end sm:justify-center sm:gap-4"
      onSubmit={onSubmit}
      autoComplete="off"
      data-cy-root
    >
      <label className="form-control w-full sm:w-32">
        <div className="label">
          <span className="label-text">Title</span>
        </div>
        <input
          data-cy="title-input"
          type="text"
          placeholder="title"
          className="input input-bordered input-sm"
          required
          minLength={3}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className="form-control w-full sm:w-44">
        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <input
          data-cy="description-input"
          type="text"
          placeholder="description"
          className="input input-bordered input-sm"
          required
          minLength={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <button
        data-cy="add-button"
        className="btn btn-accent btn-sm w-full mt-4 sm:w-32"
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export default AddTaskForm;
