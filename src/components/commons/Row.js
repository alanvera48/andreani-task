import styled from "styled-components";
import Modal from "react-modal";



export const RowApp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const HeaderApp = styled.div`
  background-color: #282b33;
  padding: 20px;
  color: white;
  font-size: 25px;
  font-family: "Muli", "Noto Sans", sans-serif;
  flex: 1 100%;
  margin-top: 0;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled(Modal)`
  background-color: #f4f5f7;
  border-radius: 2px;
  margin: 48px 0 80px;
  min-height: 450px;
  outline: none;
  padding: 20px;
`;