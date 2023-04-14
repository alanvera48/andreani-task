import React, { Fragment, useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TYPE } from "../../data/types";
import { ModalCard } from "../Modal/Modal";
import styled from "styled-components";

const Cards = ({ item, index, moveItem, status }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: TYPE,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: TYPE,
    item: { type: TYPE, ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [show, setShow] = useState(false);

  const onOpen = () => setShow(true);

  const onClose = () => setShow(false);

  drag(drop(ref));

  return (
    <Fragment>
      <CardContainer
        ref={ref}
        style={{ opacity: isDragging ? 0 : 1 }}
        className={"item"}
        onClick={onOpen}
      >
        <StatusBar backgroundColor={status.color} />
        <p className={"item-title"}>{item.content}</p>
      </CardContainer>
      <ModalCard item={item} onClose={onClose} show={show} />
    </Fragment>
  );
};

const StatusBar = styled.div`
  width: 40px;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.backgroundColor};
`;

const CardContainer = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  z-index: 1;
  background-color: white;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 900px) {
    margin-left: auto;
  }
`;

export default Cards;
