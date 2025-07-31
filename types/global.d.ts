import {
  PositionModel,
  ContextMenuPropsModel,
  IconContextMenuPropsModel,
  MenuItemModel,
  DesktopIconModel,
  OpenWindowModel,
  type PersonalInfoModel,
} from "./types.model";

declare global {
  type PositionModelI = PositionModel;
  type ContextMenuPropsModelI = ContextMenuPropsModel;
  type IconContextMenuPropsModelI = IconContextMenuPropsModel;
  type MenuItemModelI = MenuItemModel;
  type DesktopIconModelI = DesktopIconModel;
  type OpenWindowModelI = OpenWindowModel;
  type PersonalInfoModelI = PersonalInfoModel;
}
