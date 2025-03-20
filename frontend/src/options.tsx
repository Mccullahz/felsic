import React from "react";
// currently nothing happening here, no submission of data
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
      ({/* TODO: setup save such that it sends to conf.json*/})
      <button onClick = {() => {alert("Settings saved!")}}>Save Settings</button>
    </div>
  );
};

export default Options;

