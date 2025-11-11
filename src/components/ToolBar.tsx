import Button from './Button.tsx';
import Tooltip from './ToolTip.tsx';

interface ToolbarProps {
  onPointSelect: () => void;
  onLineSelect: () => void;
  onRectSelect: () => void;
  onEllipseSelect: () => void;
  onClear: () => void;
  onAbout: () => void;
  onCubeSelect: () => void;
  onLineOOSelect: () => void;
  onUndo: () => void;
  strokeColor?: string;
  onStrokeColorChange?: (color: string) => void;
  fillColor?: string;
  onFillColorChange?: (color: string) => void;
  isFilled?: boolean;
  onFilledChange?: (filled: boolean) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onPointSelect,
  onLineSelect,
  onRectSelect,
  onEllipseSelect,
  onCubeSelect,
  onLineOOSelect,
  onUndo,
  onClear,
  strokeColor,
  onStrokeColorChange,
  fillColor,
  onFillColorChange,
  isFilled,
  onFilledChange
}) => {
  return (
    <div className="toolbar">
      {onStrokeColorChange && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 8 }}>
          <label style={{ fontSize: 12 }}>Stroke:</label>
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => onStrokeColorChange(e.target.value)}
            aria-label="Stroke color"
          />
        </div>
      )}
      {onFillColorChange && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingRight: 8 }}>
          <label style={{ fontSize: 12 }}>Fill:</label>
          <input
            type="color"
            value={fillColor}
            onChange={(e) => onFillColorChange(e.target.value)}
            aria-label="Fill color"
          />
        </div>
      )}
      {onFilledChange && (
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, paddingRight: 8 }}>
          <input
            type="checkbox"
            checked={isFilled}
            onChange={(e) => onFilledChange(e.target.checked)}
          />
          Fill
        </label>
      )}
      <Tooltip text="Point">
        <Button onClick={onPointSelect}>
          <img src="/point.png" alt="Point" />
        </Button>
      </Tooltip>
      <Tooltip text="Line">
        <Button onClick={onLineSelect}>
          <img src="/line.png" alt="Line" />
        </Button>
      </Tooltip>
      <Tooltip text="Rectangle">
        <Button onClick={onRectSelect}>
          <img src="/rect.png" alt="Rectangle" />
        </Button>
      </Tooltip>
      <Tooltip text="Ellipse">
        <Button onClick={onEllipseSelect}>
          <img src="/ellipse.png" alt="Ellipse" />
        </Button>
      </Tooltip>
      <Tooltip text="Cube">
        <Button onClick={onCubeSelect}>
          <img src="/cube.png" alt="Cube" />
        </Button>
      </Tooltip>
      <Tooltip text="LineOO">
        <Button onClick={onLineOOSelect}>
          <img src="/lineOO.png" alt="LineOO" />
        </Button>
      </Tooltip>
      <Tooltip text="Undo">
        <Button onClick={onUndo}>
          <img src="/back.png" alt="Clear" />
        </Button>
      </Tooltip>
      <Tooltip text="Clear">
        <Button onClick={onClear}>
<img src="/clear.png" alt="Clear" />
        </Button>
      </Tooltip>
    </div>
  );
};

export default Toolbar;
