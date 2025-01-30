import {ReactNode} from "react";

export interface ScreenContainerProps {
  isLoading: boolean;
  children?: ReactNode;
  showFooter?: boolean;
}
