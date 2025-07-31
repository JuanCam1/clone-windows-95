import {
  PositionModel,
  ContextMenuPropsModel,
  IconContextMenuPropsModel,
  MenuItemModel,
  DesktopIconModel,
  OpenWindowModel,
} from "./types.model";

declare global {
  type PositionModelI = PositionModel;
  type ContextMenuPropsModelI = ContextMenuPropsModel;
  type IconContextMenuPropsModelI = IconContextMenuPropsModel;
  type MenuItemModelI = MenuItemModel;
  type DesktopIconModelI = DesktopIconModel;
  type OpenWindowModelI = OpenWindowModel;
}
