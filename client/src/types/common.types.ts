import { ReactNode } from "react";

export interface ChildrenProps {
  children?: ReactNode;
}

export interface ClassNameProps {
  className?: string;
}

export interface BaseComponentProps extends ChildrenProps, ClassNameProps {}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
