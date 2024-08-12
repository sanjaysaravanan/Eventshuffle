import React from "react";
import { EventProp } from "../../../../types";

interface ComponentProp extends EventProp {
  clickFunc: () => void;
}

const Event: React.FC<ComponentProp> = ({
  id,
  name,
  clickFunc = () => undefined,
}) => {
  const votedIds = JSON.parse(localStorage.getItem("voted_ids") || "[]");

  return (
    <div
      className="border border-black shadow-lg text-center bg-body border-3 p-4 m-2 rounded d-inline-block"
      style={{
        minHeight: 150,
        width: 300,
      }}
    >
      <h1>{name}</h1>
      <button onClick={clickFunc} className="btn btn-primary fs-4 mt-3">
        {(votedIds as string[]).includes(id)
          ? "View Result"
          : "Select Availability"}
      </button>
    </div>
  );
};

const MemoizedEvent = React.memo(Event);

export default MemoizedEvent;
