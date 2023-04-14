import React from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { ModalContainer } from "../commons/Row";

Modal.setAppElement("#root");

export const ModalCard = ({ show, onClose, item }) => {
  return (
    <ModalContainer
      isOpen={show}
      onRequestClose={onClose}
      overlayClassName={"overlay"}
    >
      <div className="close-btn-container">
        <div style={{ display: "flex" }}>
          <div>
            <h1 style={{ display: "flex" }}>Titulo</h1>
            <p>{item.title}</p>
          </div>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>

        <div>
          <h2 style={{ fontSize: "16px" }}>Description</h2>
          <p>{item.content}</p>
          <h2 style={{ fontSize: "16px" }}>Status</h2>
          <p>{`${item.status.charAt(0).toUpperCase()}${item.status.slice(
            1
          )}`}</p>
        </div>
      </div>
    </ModalContainer>
  );
};
