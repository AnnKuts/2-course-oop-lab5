import type {FC} from 'react';
import {useState} from 'react';
import Button from './Button.tsx';

interface MenuBarProps {
  currentTool: string;
  onPointSelect: () => void;
  onLineSelect: () => void;
  onRectSelect: () => void;
  onEllipseSelect: () => void;
  onClear: () => void;
  onAbout: () => void;
  onCubeSelect: () => void;
  onLineOOSelect: () => void;
  onUndo: () => void;
  onTableToggle: () => void;
  isTableOpen: boolean;
}

const MenuBar: FC<MenuBarProps> = ({
                                     currentTool,
                                     onPointSelect,
                                     onLineSelect,
                                     onRectSelect,
                                     onEllipseSelect,
                                     onClear,
                                     onAbout,
                                     onCubeSelect,
                                     onLineOOSelect,
                                     onUndo,
                                     onTableToggle,
                                     isTableOpen
                                   }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleMenuClick = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleMenuMouseEnter = (menu: string) => {
    if (openMenu) {
      setOpenMenu(menu);
    }
  };

  const closeMenu = () => {
    setOpenMenu(null);
  };

  const handleClearClick = () => {
    onClear();
    document.title = 'Graphic editor';
    closeMenu();
  };

  const handlePointClick = () => {
    onPointSelect();
    closeMenu();
  };

  const handleLineClick = () => {
    onLineSelect();
    closeMenu();
  };

  const handleRectClick = () => {
    onRectSelect();
    closeMenu();
  };

  const handleEllipseClick = () => {
    onEllipseSelect();
    closeMenu();
  };

  const handleAboutClick = () => {
    onAbout();
    closeMenu();
  };

  const handleCubeClick = () => {
    onCubeSelect();
    closeMenu();
  };

  const handleLineOOClick = () => {
    onLineOOSelect();
    closeMenu();
  };

  const handleUndoClick = () => {
    onUndo();
    closeMenu();
  };

  const handleViewClick = () => {
    onTableToggle();
  };

  return (
    <>
      <div className="menu-bar">
        <div className="menu-item">
          <button
            className={`menu-button ${openMenu === 'file' ? 'active' : ''}`}
            onClick={() => handleMenuClick('file')}
            onMouseEnter={() => handleMenuMouseEnter('file')}
          >
            File
          </button>
          {openMenu === 'file' && (
            <div className="dropdown">
              <Button className="dropdown-item" onClick={handleClearClick}>
                Clear
              </Button>
              <Button className="dropdown-item" onClick={handleUndoClick}>
                Undo
              </Button>
            </div>
          )}
        </div>

        <div className="menu-item">
          <button
            className={`menu-button ${openMenu === 'objects' ? 'active' : ''}`}
            onClick={() => handleMenuClick('objects')}
            onMouseEnter={() => handleMenuMouseEnter('objects')}
          >
            Objects
          </button>
          {openMenu === 'objects' && (
            <div className="dropdown">
              <Button
                className={`dropdown-item ${currentTool === 'Point' ? 'selected' : ''}`}
                onClick={handlePointClick}
              >
                Point
              </Button>
              <Button
                className={`dropdown-item ${currentTool === 'Line' ? 'selected' : ''}`}
                onClick={handleLineClick}
              >
                Line
              </Button>
              <Button
                className={`dropdown-item ${currentTool === 'Rectangle' ? 'selected' : ''}`}
                onClick={handleRectClick}
              >
                Rectangle
              </Button>
              <Button
                className={`dropdown-item ${currentTool === 'Ellipse' ? 'selected' : ''}`}
                onClick={handleEllipseClick}
              >
                Ellipse
              </Button>
              <Button
                className={`dropdown-item ${currentTool === 'Cube' ? 'selected' : ''}`}
                onClick={handleCubeClick}
              >
                Cube
              </Button>
              <Button
                className={`dropdown-item ${currentTool === 'LineOO' ? 'selected' : ''}`}
                onClick={handleLineOOClick}
              >
                LineOO
              </Button>
            </div>
          )}
        </div>

        <div className="menu-item">
          <button
            className={`menu-button ${isTableOpen ? 'active' : ''}`}
            onClick={handleViewClick}
          >
            View
          </button>
        </div>

        <div className="menu-item">
          <button
            className={`menu-button ${openMenu === 'about' ? 'active' : ''}`}
            onClick={() => handleMenuClick('about')}
            onMouseEnter={() => handleMenuMouseEnter('about')}
          >
            About
          </button>
          {openMenu === 'about' && (
            <div className="dropdown">
              <Button className="dropdown-item" onClick={handleAboutClick}>
                Show info
              </Button>
            </div>
          )}
        </div>
      </div>

      {openMenu && <div className="menu-overlay" onClick={closeMenu}></div>}
    </>
  );
};

export default MenuBar;