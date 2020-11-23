import React from "react";
import moment from "moment";
//Task item list for home and task page

const TaskItem = ({ task }) => {
  const date = moment(
    task.createdAt.substring(0, 10).replace("-", ""),
    "YYYYMMDD"
  );
  const todaysDate = moment(new Date());
  return (
    <li className="task-home-item">
      <div>
        <p>{task.name}</p>
      </div>
      {date.format("MMM D")}
      {/* {todaysDate.format("M D YYYY")} */}
    </li>
  );
};

export default TaskItem;
