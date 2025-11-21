import {useRef, useEffect, useState} from 'react';
import {Editor} from '../editor/MyEditor';
import {Shape} from '../shapes/Shape';
import {PointShape} from '../shapes/PointShape';
import {LineShape} from '../shapes/LineShape';
import {RectangleShape} from '../shapes/RectangleShape';
import {EllipseShape} from '../shapes/EllipseShape';
import {CubeShape} from '../shapes/CubeShape';
import {LineOOShape} from '../shapes/LineOOShape';
import {MyTable, type ShapeData} from '../editor/MyTable';

import Toolbar from './ToolBar';
import MenuBar from './MenuBar';
import Canvas from './Canvas';
import ModalWindow from './ModalWindow';

const GraphicEditor: React.FC = () => {
  const N = 111;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const myTableRef = useRef(new MyTable());
  const [currentTool, setCurrentTool] = useState<string>('Point');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableOpen, setIsTableOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [currentShapeFactory, setCurrentShapeFactory] = useState<() => Shape>(() => () => new PointShape(0, 0));
  const [strokeColor, setStrokeColor] = useState<string>('#000000');
  const [fillColor, setFillColor] = useState<string>('#ffff00');
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [tableData, setTableData] = useState<ShapeData[]>([]);

  // Dragging and resizing state
  const [tablePosition, setTablePosition] = useState({x: window.innerWidth - 540, y: 140});
  const [tableSize, setTableSize] = useState({width: 500, height: 500});
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({x: 0, y: 0});

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) Editor.setContext(ctx);
    }

    const handleTableUpdate = (shapes: ShapeData[]) => {
      setTableData([...shapes]);
    };

    myTableRef.current.Subscribe(handleTableUpdate);

    Editor.setOnShapeDrawn((name, x1, y1, x2, y2) => {
      myTableRef.current.Add(name, Math.round(x1), Math.round(y1), Math.round(x2), Math.round(y2));
    });

    return () => {
      myTableRef.current.Unsubscribe(handleTableUpdate);
      setIsTableOpen(false);
    };
  }, []);

  // Mouse move and up handlers for dragging/resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setTablePosition({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      } else if (isResizing) {
        const deltaX = e.clientX - dragStart.x;
        const deltaY = e.clientY - dragStart.y;
        setTableSize({
          width: Math.max(300, tableSize.width + deltaX),
          height: Math.max(200, tableSize.height + deltaY)
        });
        setDragStart({x: e.clientX, y: e.clientY});
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, tableSize]);

  const handleTableMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('table-panel-header') ||
      (e.target as HTMLElement).closest('.table-panel-header')) {
      setIsDragging(true);
      setDragStart({x: e.clientX - tablePosition.x, y: e.clientY - tablePosition.y});
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);
    setDragStart({x: e.clientX, y: e.clientY});
  };

  const updateTitle = (shapeName: string) => {
    document.title = shapeName ? `${shapeName}` : 'GraphicEditor';
    setCurrentTool(shapeName);
  };

  const getMouseCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return {x: 0, y: 0};
    const rect = canvasRef.current.getBoundingClientRect();
    return {x: e.clientX - rect.left, y: e.clientY - rect.top};
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const {x, y} = getMouseCoordinates(e);
    const shape = currentShapeFactory();

    shape.setStrokeColor(strokeColor);
    shape.setFillColor(fillColor);
    shape.setFilled(isFilled);

    Editor.start(shape);
    Editor.onLBDown(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const {x, y} = getMouseCoordinates(e);
    Editor.onMouseMove(x, y);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const {x, y} = getMouseCoordinates(e);
    Editor.onLBUp(x, y);
  };

  const handlePointSelect = () => {
    setCurrentShapeFactory(() => () => new PointShape(0, 0));
    updateTitle('Point');
  };

  const handleLineSelect = () => {
    setCurrentShapeFactory(() => () => new LineShape());
    updateTitle('Line');
  };

  const handleRectSelect = () => {
    setCurrentShapeFactory(() => () => new RectangleShape(0, 0, 0, 0));
    updateTitle('Rectangle');
  };

  const handleEllipseSelect = () => {
    setCurrentShapeFactory(() => () => new EllipseShape());
    updateTitle('Ellipse');
  };

  const handleCubeSelect = () => {
    setCurrentShapeFactory(() => () => new CubeShape());
    updateTitle('Cube');
  };

  const handleLineOOSelect = () => {
    setCurrentShapeFactory(() => () => new LineOOShape());
    updateTitle('LineOO');
  };

  const handleClear = () => {
    Editor.clear();
    myTableRef.current.Clear();
  };

  const handleUndo = () => {
    Editor.undo();
    myTableRef.current.RemoveLast();
  };

  const handleTableToggle = () => {
    setIsTableOpen(!isTableOpen);
  };

  const handleAbout = () => {
    const aboutContent = (
      <>
        <h4>Масив</h4>
        <p>динамічний з обмеженням кількості елементів N = {N}</p>
        <h4>Гумовий слід</h4>
        <p>суцільна лінія чорного кольору</p>
        <h4>Прямокутник</h4>
        <p>
          Увід: по двом протилежним кутам<br/>
          Відображення: чорний контур з кольоровим заповненням (жовтий)
        </p>
        <h4>Еліпс</h4>
        <p>
          Увід: від центру до одного з кутів охоплюючого прямокутника<br/>
          Відображення: чорний контур без заповнення
        </p>
        <h4>Позначка поточного типу об'єкту</h4>
        <p>в меню</p>
      </>
    );
    setModalContent(aboutContent);
    setIsModalOpen(true);
  };

  return (
    <div className="editor-container">
      <div className="top-bar">
        <MenuBar
          currentTool={currentTool}
          onPointSelect={handlePointSelect}
          onLineSelect={handleLineSelect}
          onRectSelect={handleRectSelect}
          onEllipseSelect={handleEllipseSelect}
          onClear={handleClear}
          onAbout={handleAbout}
          onCubeSelect={handleCubeSelect}
          onLineOOSelect={handleLineOOSelect}
          onUndo={handleUndo}
          onTableToggle={handleTableToggle}
          isTableOpen={isTableOpen}
        />

        <Toolbar
          onPointSelect={handlePointSelect}
          onLineSelect={handleLineSelect}
          onRectSelect={handleRectSelect}
          onEllipseSelect={handleEllipseSelect}
          onCubeSelect={handleCubeSelect}
          onLineOOSelect={handleLineOOSelect}
          onUndo={handleUndo}
          onClear={handleClear}
          onAbout={handleAbout}
          strokeColor={strokeColor}
          onStrokeColorChange={setStrokeColor}
          fillColor={fillColor}
          onFillColorChange={setFillColor}
          isFilled={isFilled}
          onFilledChange={setIsFilled}
        />
      </div>

      <div className="editor-main">
        <Canvas
          width={900}
          height={700}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          canvasRef={canvasRef}
        />

        {isTableOpen && (
          <div
            className="table-panel"
            style={{
              top: `${tablePosition.y}px`,
              left: `${tablePosition.x}px`,
              width: `${tableSize.width}px`,
              maxHeight: `${tableSize.height}px`,
              right: 'auto'
            }}
            onMouseDown={handleTableMouseDown}
          >
            <div
              className="table-panel-header"
              style={{cursor: isDragging ? 'grabbing' : 'grab'}}
            >
              <h3>Objects Table</h3>
              <button className="close-button" onClick={handleTableToggle}>×</button>
            </div>
            <div className="table-content" style={{maxHeight: `${tableSize.height - 50}px`}}>
              <table>
                <thead>
                <tr>
                  <th>#</th>
                  <th>Shape</th>
                  <th>X1</th>
                  <th>Y1</th>
                  <th>X2</th>
                  <th>Y2</th>
                </tr>
                </thead>
                <tbody>
                {tableData.map((shape: ShapeData, index: number) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{shape.name}</td>
                    <td>{shape.x1}</td>
                    <td>{shape.y1}</td>
                    <td>{shape.x2}</td>
                    <td>{shape.y2}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            <div
              className="resize-handle"
              onMouseDown={handleResizeMouseDown}
            />
          </div>
        )}
      </div>

      <ModalWindow
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Варіант 11"
      >
        {modalContent}
      </ModalWindow>
    </div>
  );
};

export default GraphicEditor;