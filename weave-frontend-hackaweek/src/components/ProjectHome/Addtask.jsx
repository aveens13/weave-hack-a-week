export default function AddTask({ handleAddTask, project }) {
  async function handleCreate(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const circulartoPlain = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(circulartoPlain);
    handleAddTask(formDataJsonString);
  }
  return (
    <div className="login-registration-form">
      <div className="loginSection">
        <div className="login-card signup">
          <div className="top-section">
            <div>
              <h2>Task</h2>
            </div>
            <div className="grey">Add task to your project</div>
          </div>
          <div className="login-form">
            <form action="" onSubmit={handleCreate}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id=""
                placeholder="Title for your task"
              />
              <label htmlFor="info">Description</label>
              <input
                type="text"
                name="info"
                id="info"
                placeholder="Information on your task"
              />
              <label htmlFor="deadline">Deadline</label>
              <input type="date" name="deadline" id="deadline" />
              <div className="select-task">
                <label for="cars">Assign this task:</label>
                <select name="userid" id="name">
                  <option value="" selected>
                    None
                  </option>
                  {project.members.map((member) => (
                    <option value={member.userId}>{member.name}</option>
                  ))}
                </select>
              </div>
              <div className="submitbutton">
                <input
                  className="submitBtn"
                  type="submit"
                  value="Create"
                ></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
