interface CanvasProps {
  width: number;
  height: number;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

const Canvas: React.FC<CanvasProps> = ({
  width,
  height,
  onMouseDown,
  onMouseUp,
  onMouseMove,
  canvasRef
}) => {
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className="editor-canvas"
    />
  );
};

export default Canvas;
