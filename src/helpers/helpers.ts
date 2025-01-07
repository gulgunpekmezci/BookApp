import { Dimensions, PixelRatio, Platform } from "react-native";

const BASE_IMAGE_URL = 'https://covers.openlibrary.org/b/olid/';
const PLACEHOLDER_IMAGE = 'path/to/placeholder-image.png';

// Image Url Helper
export const getImageUrl = (editionKey?: string, size: 'S' | 'L' = 'S') =>
    editionKey ? `${BASE_IMAGE_URL}${editionKey}-${size}.jpg?default=false` : PLACEHOLDER_IMAGE;


// Constants
const {width: SCREEN_WIDTH} = Dimensions.get('window');

// Normalize function for responsive font sizes
const scale = SCREEN_WIDTH / 320;

export const normalize = (size: number) => {
  const newSize = size * scale;
  return Platform.OS === 'ios'
    ? Math.round(PixelRatio.roundToNearestPixel(newSize))
    : Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};