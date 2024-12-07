import React from "react";
import './styles.scss'

const Index = () => {
  return (
    <div role="status" aria-live="polite">
      <div class="spinner-container">
        <div class="spinner">
          <div class="spinner-item"></div>
          <div class="spinner-item"></div>
          <div class="spinner-item"></div>
          <div class="spinner-item"></div>
          <div class="spinner-item"></div>
        </div>
      </div>
    </div>
  );
};

export default Index;
