import { useTheme } from '@/contexts/ThemeContext';
import colors from '@/constants/colors';

/**
 * Returns the design tokens for the current app theme (light by default).
 * Theme is user-controlled and persisted — use ThemeContext to change it.
 */
export function useColors() {
  const { theme } = useTheme();
  const palette =
    theme === 'dark' && 'dark' in colors
      ? (colors as Record<string, typeof colors.light>).dark
      : colors.light;
  return { ...palette, radius: colors.radius };
}
