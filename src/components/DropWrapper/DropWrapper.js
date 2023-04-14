import React from "react";
import { useDrop } from "react-dnd";
import { TYPE, statusTasks } from "../../data/types";

const DropWrapper = ({ onDrop, children, status }) => {
    const [{ isOver }, drop] = useDrop({
        accept: TYPE,
        canDrop: (item, monitor) => {
            const itemIndex = statusTasks.findIndex(si => si.status === item.status);
            const statusIndex = statusTasks.findIndex(si => si.status === status);
            return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
        },
        drop: (item, monitor) => {
            onDrop(item, monitor, status);
        },
        collect: monitor => ({
            isOver: monitor.isOver()
        })
    });

    return (
        <div ref={drop} className={"drop-wrapper"}>
            {React.cloneElement(children, { isOver })}
        </div>
    )
};

export default DropWrapper;