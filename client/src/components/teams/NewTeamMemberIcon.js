import React, { useState } from "react";
import "../../css/Navbar.css";
import { FiPlus } from "react-icons/fi";
import { Modal } from "@material-ui/core";
import AddMemberForm from "../Forms/AddMemberForm";

const NewTeamMemberIcon = ({ setTeamUsers, teamId }) => {
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const modalBody = (
    <div className="modal-container">
      <AddMemberForm
        teamId={teamId}
        setTeamUsers={setTeamUsers}
        clickClose={closeModal}
        open={open}
      ></AddMemberForm>
    </div>
  );
  return (
    <div>
      <div
        className="team-member-container"
        onClick={openModal}
        style={{ cursor: "pointer" }}
      >
        <div className="team-member-icon">
          <div className="new-user-avatar">
            <FiPlus className="new-user-avatar--icon" />
          </div>
        </div>
        <div className="team-member-name-container">
          <div className="new-team-member-name">Add Member</div>
        </div>
      </div>
      <Modal open={open} onClose={closeModal}>
        {modalBody}
      </Modal>
    </div>
  );
};

export default NewTeamMemberIcon;
