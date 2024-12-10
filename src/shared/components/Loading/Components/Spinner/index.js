import React from "react";
import './styles.scss'

const Index = () => {
  return (
    <div role="status" aria-live="polite">
      <div className="spinner-container">
        <div className="spinner">
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
          <div className="spinner-item"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
