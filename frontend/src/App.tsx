import { useState, useEffect, useRef } from 'react';
import logo from './assets/images/logo-universal.png';
import './styles/App.css';
import { Greet } from '../wailsjs/go/main/App';

function App() {
  const [resultText, setResultText] = useState("Please enter your name below 👇");
  const [name, setName] = useState('');
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Refs to store the initial mouse X position and sidebar width at the start of a drag
  const initialXRef = useRef(0);
  const initialWidthRef = useRef(sidebarWidth);

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const updateResultText = (result: string) => setResultText(result);

  function greet() {
    Greet(name).then(updateResultText);
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevents text selection and other default behaviors
    // If the sidebar is collapsed, expand it on drag start.
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    setIsResizing(true);
    // Store the initial values for the drag calculation.
    initialXRef.current = e.clientX;
    initialWidthRef.current = sidebarWidth;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    // Calculate the change in the X position.
    const dx = e.clientX - initialXRef.current;
    let newWidth = initialWidthRef.current + dx;
    // Define minimum and maximum sidebar widths.
    const minWidth = 50;
    const maxWidth = 500;
    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;
    setSidebarWidth(newWidth);
  };

  const handleMouseUp = () => {
    if (isResizing) {
      setIsResizing(false);
      // Optionally collapse if the sidebar is dragged to nearly the minimum width.
      if (sidebarWidth <= 60) {
        setIsCollapsed(true);
      }
    }
  };

  // Add global mouse event listeners when resizing is active.
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // Disable text selection during the drag.
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'auto';
    }
    // Cleanup in case the component unmounts.
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'auto';
    };
  }, [isResizing, sidebarWidth]);

  // If the sidebar is collapsed, force its width to a small fixed value.
  const sidebarStyle = {
    width: isCollapsed ? '50px' : `${sidebarWidth}px`
  };

  return (
    <div id="App" className="app-container">
      {/* SIDEBAR */}
      <nav className="sidebar" style={sidebarStyle}>
        <ul>
          <li>Home</li>
          <li>Notes</li>
          <li>Projects</li>
          <li>Settings</li>
        </ul>
        {/* Toggle button to collapse/expand the sidebar */}
        <button
          className="toggle-button"
          onClick={() => setIsCollapsed(prev => !prev)}
        >
          {isCollapsed ? 'Expand' : 'Collapse'}
        </button>
        {/* Draggable resizer handle on the right edge */}
        <div className="resizer" onMouseDown={handleMouseDown} />
      </nav>

      {/* MAIN CONTENT */}
      <main className="content-area">
        <div className="header">
          <img src={logo} id="logo" alt="logo" />
        </div>
        <div id="result" className="result">
          {resultText}
        </div>
        <div id="input" className="input-box">
          <input
            id="name"
            className="input"
            onChange={updateName}
            autoComplete="off"
            name="input"
            type="text"
          />
          <button className="btn" onClick={greet}>
            Greet
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
