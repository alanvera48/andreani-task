import React, { useState } from "react";
import { HeaderApp } from "../commons/Row";
import styled from "styled-components";
import FormToCreate from "../FormToCreate/FormToCreate";

export default function Header() {
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  console.log(show);

  return (
    <>
      <HeaderApp>
        <p style={{ marginLeft: "auto" }}>Tablero Kanban</p>
        <Button onClick={() => setShow(true)}>Crear Tarea</Button>
      </HeaderApp>
      <FormToCreate show={show} onClose={onClose} />
    </>
  );
}

const Button = styled.button`
  background-color: rgb(206, 1, 31);
  border-radius: 5px;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 10px;
  margin-right: auto;
  margin-left: 100px;
`;
