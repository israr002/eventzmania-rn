import {moderateScale} from "utils/scaleUnits";

export const Metrics = {
  xTiny: moderateScale(5),
  tiny: moderateScale(8),
  xxSmall: moderateScale(12),
  xSmall: moderateScale(16),
  small: moderateScale(18),
  medium: moderateScale(20),
  base: moderateScale(24),
  large: moderateScale(32),
  xLarge: moderateScale(40),
  padding: {
    xTiny: moderateScale(5),
    tiny: moderateScale(8),
    xxSmall: moderateScale(12),
    xSmall: moderateScale(16),
    small: moderateScale(18),
    medium: moderateScale(20),
    base: moderateScale(24),
    large: moderateScale(32),
    xLarge: moderateScale(40)
  },
  margin: {
    xTiny: moderateScale(5),
    tiny: moderateScale(8),
    xxSmall: moderateScale(12),
    xSmall: moderateScale(16),
    small: moderateScale(18),
    medium: moderateScale(20),
    base: moderateScale(24),
    large: moderateScale(32),
    xLarge: moderateScale(40)
  },
  radius: {
    tiny: moderateScale(5),
    small: moderateScale(8),
    base: moderateScale(12),
    medium: moderateScale(16),
    large: moderateScale(24),
    xLarge: moderateScale(32)
  }
};
