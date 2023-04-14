import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { postNewTask } from "../../utils/apisTask";
import { ModalContainer } from "../commons/Row";

export default function FormToCreate({ show, onClose }) {
  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);
  const initialValue = {
    id: small_id,
    title: "",
    content: "",
    status: "Sin realizar",
  };
  const [values, getValues] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState({
    error: "",
    show: false,
  });
  const [message, setMessage] = useState(false);

  const handleChange = (e) => {
    getValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const usePostTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data) => postNewTask(data),
      onSuccess: () => {
        queryClient.invalidateQueries("task");
        setMessage(true);
        getValues(initialValue);
        onClose();
      },
    });
  };

  const { mutate: mutateTask } = usePostTask();

  const onSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = Object.values(values).some((el) => el === "");
    if (!isEmpty) {
      mutateTask(values);
    } else {
      setErrorMessage({
        error: "Todos los campos son requeridos",
        show: true,
      });
    }
  };

  return (
    <ModalContainer
      isOpen={show}
      onRequestClose={onClose}
      overlayClassName={"overlay"}
    >
      <form className="form-new-publication">
        <h1>Crear Nueva Tarea</h1>
        <label className="add_label">Titulo:</label>
        <input
          className="add_input"
          id="title"
          value={values.title}
          name="title"
          onChange={(value) => handleChange(value)}
        />
        <label className="add_label">Descripcion:</label>
        <input
          className="add_post"
          id="content"
          name="content"
          value={values.content}
          onChange={(value) => handleChange(value)}
        />
        {message && (
          <div className="success-message">
            Publication successfully created!
          </div>
        )}
        {errorMessage.show && (
          <div className="error-message">{errorMessage.error}</div>
        )}
        <Button onClick={(e) => onSubmit(e)}>Crear</Button>
      </form>
    </ModalContainer>
  );
}

const Button = styled.button`
  background-color: rgb(206, 1, 31);
  border-radius: 5px;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 10px;
`;
