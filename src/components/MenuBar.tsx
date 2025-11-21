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
  onSaveJSON: () => void;
  onLoadJSON: () => void;
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
                                     isTableOpen,

                                     onSaveJSON,
                                     onLoadJSON
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

  return (
    <>
      <div className="menu-bar">

        {/* FILE MENU */}
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

              <Button className="dropdown-item" onClick={onUndo}>
                Undo
              </Button>

              {/* NEW: SAVE JSON */}
              <Button className="dropdown-item" onClick={onSaveJSON}>
                Save JSON
              </Button>

              {/* NEW: LOAD JSON */}
              <Button
                className="dropdown-item"
                onClick={() => {
                  onLoadJSON();
                  closeMenu();
                }}
              >
                Load JSON
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
                onClick={() => {
                  onPointSelect();
                  closeMenu();
                }}
              >
                Point
              </Button>

              <Button
                className={`dropdown-item ${currentTool === 'Line' ? 'selected' : ''}`}
                onClick={() => {
                  onLineSelect();
                  closeMenu();
                }}
              >
                Line
              </Button>

              <Button
                className={`dropdown-item ${currentTool === 'Rectangle' ? 'selected' : ''}`}
                onClick={() => {
                  onRectSelect();
                  closeMenu();
                }}
              >
                Rectangle
              </Button>

              <Button
                className={`dropdown-item ${currentTool === 'Ellipse' ? 'selected' : ''}`}
                onClick={() => {
                  onEllipseSelect();
                  closeMenu();
                }}
              >
                Ellipse
              </Button>

              <Button
                className={`dropdown-item ${currentTool === 'Cube' ? 'selected' : ''}`}
                onClick={() => {
                  onCubeSelect();
                  closeMenu();
                }}
              >
                Cube
              </Button>

              <Button
                className={`dropdown-item ${currentTool === 'LineOO' ? 'selected' : ''}`}
                onClick={() => {
                  onLineOOSelect();
                  closeMenu();
                }}
              >
                LineOO
              </Button>
            </div>
          )}
        </div>

        <div className="menu-item">
          <button
            className={`menu-button ${isTableOpen ? 'active' : ''}`}
            onClick={onTableToggle}
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
              <Button className="dropdown-item" onClick={() => {
                onAbout();
                closeMenu();
              }}>
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
