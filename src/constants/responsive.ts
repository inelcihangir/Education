import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

export function responsiveWidth(percent: number) {
  return width * percent / 100;
}

export function responsiveHeight(percent: number) {
  return height * percent / 100;
}

export function responsiveFontSize(size: number) {
  // 375 referans alınarak ölçeklenir (iPhone 11)
  const scale = width / 375;
  return Math.round(PixelRatio.roundToNearestPixel(size * scale));
} 