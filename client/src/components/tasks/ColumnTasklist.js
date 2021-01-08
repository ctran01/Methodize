import React, { useEffect, useState, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Modal, responsiveFontSizes } from "@material-ui/core";
import { useParams } from "react-router-dom";
import AddTaskProjectForm from "../Forms/AddTaskProjectForm";
import ColumnTaskItem from "./ColumnTaskItem";
import apiServer from "../../config/apiServer";
import { Context as TasklistContext } from "../../context/store/TasklistStore";
import { AiOutlineEllipsis } from "react-icons/ai";
import { Menu, MenuItem } from "@material-ui/core";

const ColumnTasklist = ({
  tasklist,
  index,
  setTasklists,
  showSideTaskDetails,
  sideTaskDetails,
  showSideTaskForm,
}) => {
  const { projectId } = useParams();
  const [openTaskProjectForm, setOpenTaskProjectForm] = useState(false);
  // const [tasklistTasks, setTasklistTasks] = useState();
  const [columnTitle, setColumnTitle] = useState(tasklist.name);
  const [titleSelect, setTitleSelect] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [tasklistState, tasklistdispatch] = useContext(TasklistContext);

  const openTaskProjectFormModal = () => {
    setOpenTaskProjectForm(true);
  };

  const closeTaskProjectFormModal = () => {
    setOpenTaskProjectForm(false);
  };

  const handleAddTaskClick = async () => {
    await tasklistdispatch({
      type: "get_selected_tasklist",
      payload: tasklist.id,
    });
    showSideTaskForm();
  };
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTitleChange = (e) => {
    setTitleSelect(true);
  };

  const handleTitleUpdate = (e) => {
    setColumnTitle(e.target.value);
  };

  const handleTasklistDelete = async (e) => {
    // console.log(tasklist.id);
    handleMenuClose();
    await apiServer.delete(`/tasklist/${tasklist.id}`);
    const resp = await apiServer.get(`/project/${projectId}/tasklists`);
    setTasklists(resp.data);
  };

  const updateAndCloseTitle = async (e) => {
    await apiServer.put(`/tasklist/${tasklist.id}/title`, { columnTitle });
    const resp = await apiServer.get(`/project/${projectId}/tasklists`);
    setTasklists(resp.data);
    setTitleSelect(false);
  };

  useEffect(() => {}, [setColumnTitle]);

  return (
    <div key={tasklist.id}>
      <Draggable
        type="tasklist"
        draggableId={`Column-${tasklist.column_index.toString()}`}
        index={index}
        key={`Column-${tasklist.id.toString()}`}
      >
        {(provided) => (
          <div
            className="tasklist-container"
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <div className="tasklist-header">
              <div className="tasklist-title" onClick={handleTitleChange}>
                {titleSelect ? (
                  <form>
                    <textarea
                      className="tasklist-title__textarea"
                      placeholder="Enter column name here.."
                      value={columnTitle}
                      onChange={handleTitleUpdate}
                      onBlur={updateAndCloseTitle}
                      autoFocus
                    ></textarea>
                  </form>
                ) : (
                  tasklist.name
                )}
              </div>

              <div className="tasklist-more-menu" onClick={handleMenuClick}>
                <AiOutlineEllipsis style={{ fontSize: "24px" }} />
              </div>
              <Menu
                style={{}}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleTasklistDelete}>Delete</MenuItem>
              </Menu>
            </div>

            <Droppable
              type="task"
              droppableId={`${tasklist.id.toString()}-${index.toString()}`}
            >
              {(provided) => (
                <div
                  className="tasklist-task--list"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasklist.Tasks.map((task, index) => {
                    return (
                      <ColumnTaskItem
                        key={index}
                        task={task}
                        index={index}
                        showSideTaskDetails={showSideTaskDetails}
                        sideTaskDetails={sideTaskDetails}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <div
              className="tasklist-new-task--button"
              // onClick={openTaskProjectFormModal}
              onClick={handleAddTaskClick}
            >
              + Add task
            </div>
          </div>
        )}
      </Draggable>
      <div>
        {/* <Modal
          className="modal"
          style={{ backgroundColor: "white" }}
          open={openTaskProjectForm}
          onClose={closeTaskProjectFormModal}
        >
          <div className="modal-container">
            <AddTaskProjectForm
              setTasklists={setTasklists}
              // setTasklistTasks={setTasklistTasks}
              tasklistId={tasklist.id}
              projectId={tasklist.project_id}
              clickClose={closeTaskProjectFormModal}
              open={openTaskProjectForm}
            ></AddTaskProjectForm>
          </div>
        </Modal> */}
      </div>
    </div>
  );
};

export default ColumnTasklist;
