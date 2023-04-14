import React, { useState } from "react";
import Cards from "../components/Cards/Cards";
import Col from "../components/Columns/Col";
import DropWrapper from "../components/DropWrapper/DropWrapper";
import { data } from "../data";
import { statusTasks } from "../data/types";
import styled from "styled-components";
import { RowApp } from "../components/commons/Row";
import { useQuery } from "react-query";
import { getTask } from "../utils/apisTask";

export default function Home() {
  const [items, setItems] = useState(data);

  const { isLoading } = useQuery(["task"], getTask, {
    onSuccess: (data) => {
      setItems(data);
    },
  });

  const onDrop = (item, monitor, status) => {
    setItems((prevState) => {
      const newItems = prevState
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status });
      return [...newItems];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];
    setItems((prevState) => {
      const newItems = prevState.filter((el, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      return [...newItems];
    });
  };

  if (isLoading) {
    <div>Is loading...</div>;
  }

  return (
    <RowApp>
      {statusTasks.map((sts) => {
        return (
          <ColumnWrapper key={sts}>
            <h2 className={"col-header"}>{sts.status}</h2>
            <DropWrapper onDrop={onDrop} status={sts.status}>
              <Col>
                {items
                  .filter((i) => i.status === sts.status)
                  .map((i, idx) => (
                    <Cards
                      key={i.id}
                      item={i}
                      index={idx}
                      moveItem={moveItem}
                      status={sts}
                    />
                  ))}
              </Col>
            </DropWrapper>
          </ColumnWrapper>
        );
      })}
    </RowApp>
  );
}

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 5px;
`;
