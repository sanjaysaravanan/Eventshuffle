import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center min-vw-100 position-fixed top-0 start-0 bg-dark bg-gradient bg-opacity-50">
      <i className="fa-solid fa-spin fa-spinner fa-4x"></i>
    </div>
  );
};

export default Loader;
