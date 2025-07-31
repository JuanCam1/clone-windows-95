import type { ReactNode } from "react";

export interface PositionModel {
  x: number;
  y: number;
}

export interface DesktopIconModel {
  id: string;
  name: string;
  icon: string | ReactNode;
  position: PositionModel;
  app?: string;
  type: "application" | "folder";
  isEditing?: boolean;
}

export interface OpenWindowModel {
  id: string;
  title: string;
  component: ReactNode;
  position: PositionModel;
  size: { width: number; height: number };
  isMinimized: boolean;
  zIndex: number;
}

export interface ContextMenuPropsModel {
  isOpen: boolean;
  position: PositionModel;
  onClose: () => void;
  onArrangeIcons: () => void;
  onRefresh: () => void;
  onNewFolder: () => void;
}

export interface IconContextMenuPropsModel {
  isOpen: boolean;
  position: PositionModel;
  onClose: () => void;
  onRename: () => void;
  onDelete: () => void;
  iconType: "application" | "folder";
}

export interface MenuItemModel {
  id: string;
  label: string;
  icon?: ReactNode;
  action?: () => void;
  submenu?: MenuItemModel[];
}

export interface PersonalInfoModel {
  name: string;
  github: string;
  skills: string;
  bio: string;
  contact: string;
}
