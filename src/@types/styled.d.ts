import 'styled-components';
import { defaultTheme } from '../styles/themes/Default';

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType{}
}