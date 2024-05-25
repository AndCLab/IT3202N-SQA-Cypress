import { useEffect, useState } from "react";

function EditTaskModal({ selectedTask, updateTask }) {
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    updateTask(selectedTask.id, editTitle.trim(), editDescription.trim())
    document.getElementById("my_modal_2")?.close();
  };

  useEffect(() => {
    if (selectedTask) {
      setEditTitle(selectedTask.title);
      setEditDescription(selectedTask.description);
    }
  }, [selectedTask]);
  return (
    <>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          {/* Content */}
          <form
            className="w-full px-4 pt-2 flex flex-col items-center justify-center"
            onSubmit={onSubmit}
          >
            <h1>Edit Task</h1>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Title</span>
              </div>
              <input
                data-cy="edit-title"
                type="text"
                placeholder="title"
                className="input input-bordered input-sm"
                required
                minLength={3}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <input
                data-cy="edit-description"
                type="text"
                placeholder="description"
                className="input input-bordered input-sm"
                required
                minLength={3}
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </label>

            <button data-cy="edit-button" className="btn btn-accent btn-sm w-full mt-4" type="submit">
              Edit
            </button>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button data-cy="close-button" className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default EditTaskModal;
