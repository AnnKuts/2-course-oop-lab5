import { useRef, useEffect, useState } from 'react';
        import { Editor } from '../editor/MyEditor';
        import { Shape } from '../shapes/Shape';
        import { PointShape } from '../shapes/PointShape';
        import { LineShape } from '../shapes/LineShape';
        import { RectangleShape } from '../shapes/RectangleShape';
        import { EllipseShape } from '../shapes/EllipseShape';
        import { CubeShape } from '../shapes/CubeShape';
        import { LineOOShape } from '../shapes/LineOOShape';

        import Toolbar from './ToolBar';
        import MenuBar from './MenuBar';
        import Canvas from './Canvas';
        import ModalWindow from './ModalWindow';

        const GraphicEditor: React.FC = () => {
          const N = 111;
          const canvasRef = useRef<HTMLCanvasElement | null>(null);
          const [currentTool, setCurrentTool] = useState<string>('Point');
          const [isModalOpen, setIsModalOpen] = useState(false);
          const [modalContent, setModalContent] = useState<React.ReactNode>(null);
          const [currentShapeFactory, setCurrentShapeFactory] = useState<() => Shape>(() => () => new PointShape(0, 0));
          const [strokeColor, setStrokeColor] = useState<string>('#000000');
          const [fillColor, setFillColor] = useState<string>('#ffff00');
          const [isFilled, setIsFilled] = useState<boolean>(false);

          useEffect(() => {
            if (canvasRef.current) {
              const ctx = canvasRef.current.getContext('2d');
              if (ctx) Editor.setContext(ctx);
            }
          }, []);

          const updateTitle = (shapeName: string) => {
            document.title = shapeName ? `${shapeName}` : 'GraphicEditor';
            setCurrentTool(shapeName);
          };

          const getMouseCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
            if (!canvasRef.current) return { x: 0, y: 0 };
            const rect = canvasRef.current.getBoundingClientRect();
            return { x: e.clientX - rect.left, y: e.clientY - rect.top };
          };

          const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
            const { x, y } = getMouseCoordinates(e);
            const shape = currentShapeFactory();

            shape.setStrokeColor(strokeColor);
            shape.setFillColor(fillColor);
            shape.setFilled(isFilled);

            Editor.start(shape);
            Editor.onLBDown(x, y);
          };

          const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
            const { x, y } = getMouseCoordinates(e);
            Editor.onMouseMove(x, y);
          };

          const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
            const { x, y } = getMouseCoordinates(e);
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
          };

          const handleUndo = () => {
            Editor.undo();
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
                  Увід: по двом протилежним кутам<br />
                  Відображення: чорний контур з кольоровим заповненням (жовтий)
                </p>
                <h4>Еліпс</h4>
                <p>
                  Увід: від центру до одного з кутів охоплюючого прямокутника<br />
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

              <Canvas
                width={900}
                height={700}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                canvasRef={canvasRef}
              />

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