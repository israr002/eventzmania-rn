import {ImageData} from "types";

export interface ImageSelectorProps {
  imageData: ImageData | null;
  setImageData: (data: ImageData) => void;
}
