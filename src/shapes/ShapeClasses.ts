import { Shape } from "./Shape";
import { PointShape } from "./PointShape";
import { LineShape } from "./LineShape";
import { RectangleShape } from "./RectangleShape";
import { EllipseShape } from "./EllipseShape";
import { CubeShape } from "./CubeShape";
import { LineOOShape } from "./LineOOShape";

export const ShapeClasses: Record<string, typeof Shape> = {
  Point: PointShape,
  Line: LineShape,
  Rectangle: RectangleShape,
  Ellipse: EllipseShape,
  Cube: CubeShape,
  LineOO: LineOOShape,
};
