import { Platform, Dimensions } from 'react-native';

const dm = Dimensions.get('screen');

const ThemeStyle = {
  NavbarHeight: 44,
  ContainerPadding: dm.width * 0.05
};

export default ThemeStyle;
