import { useState, useEffect, useRef } from 'react';
import logo from './assets/images/logo-universal.png';
import './styles/App.css';


function App() {
  const [resultText, setResultText] = useState("Please enter your name below 👇");
  const [name, setName] = useState('');
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  // New state to toggle between viewports: 'markdown' or 'graphical'
  const [viewMode, setViewMode] = useState<'markdown' | 'graphical'>('markdown');

  // Refs to store initial mouse position and sidebar width at drag start.
  const initialXRef = useRef(0);
  const initialWidthRef = useRef(sidebarWidth);

  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
  const updateResultText = (result: string) => setResultText(result);

  function greet() {
    Greet(name).then(updateResultText);
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent text selection
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    setIsResizing(true);
    initialXRef.current = e.clientX;
    initialWidthRef.current = sidebarWidth;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    const dx = e.clientX - initialXRef.current;
    let newWidth = initialWidthRef.current + dx;
    const minWidth = 50;
    const maxWidth = 500;
    if (newWidth < minWidth) newWidth = minWidth;
    if (newWidth > maxWidth) newWidth = maxWidth;
    setSidebarWidth(newWidth);
  };

  const handleMouseUp = () => {
    if (isResizing) {
      setIsResizing(false);
      if (sidebarWidth <= 60) {
        setIsCollapsed(true);
      }
    }
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'auto';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'auto';
    };
  }, [isResizing, sidebarWidth]);

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
          <li>Options</li>
        </ul>
        <button
          className="toggle-button"
          onClick={() => setIsCollapsed(prev => !prev)}
        >
          {isCollapsed ? 'Expand' : 'Collapse'}
        </button>
        <div className="resizer" onMouseDown={handleMouseDown} />
      </nav>

      {/* MAIN CONTENT */}
      <main className="content-area">
        <div className="header">
          <img src={logo} id="logo" alt="logo" />
          {/* slider-style toggle for switching viewports */}
          <div className="view-toggle">
            <label className="switch">
              <input
                type="checkbox"
                checked={viewMode === 'graphical'}
                onChange={() =>
                  setViewMode(viewMode === 'markdown' ? 'graphical' : 'markdown')
                }
              />
              <span className="slider"></span>
            </label>
            <span className="toggle-label">
              {viewMode === 'markdown' ? 'Markdown' : 'Graphical'}
            </span>
          </div>
        </div>
        {/* conditionally render the viewport based on the selected mode */}
        <div className="viewport">
          {viewMode === 'markdown' ? (
            <div className="markdown-view">
              <p>This is the Markdown Viewer.</p>
              {/* replace with md viewer component */}
            </div>
          ) : (
            <div className="graphical-view">
              <p>This is the Graphical Viewer.</p>
              {/* replace with graphical view component */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
