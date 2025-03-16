import React from "react";

const Options: React.FC = () => {
  return (
    <div className="options-menu">
      <h2>Settings</h2>
      <div>
        <label>GitHub Repository URL:</label>
        <input type="text" placeholder="Enter repository URL" />
      </div>
      <div>
        <label>Branch:</label>
        <input type="text" placeholder="Enter branch name" />
      </div>
      <div>
        <label>MongoDB URI:</label>
        <input type="text" placeholder="Enter MongoDB connection string" />
      </div>
      <button>Save Settings</button>
    </div>
  );
};

export default Options;

