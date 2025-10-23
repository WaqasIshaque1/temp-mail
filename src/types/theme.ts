import { z } from "zod";

export const themeStylePropsSchema = z.object({
  background: z.string().describe("The default background color, paired with `foreground`."),
  foreground: z.string().describe("Paired with `background`."),
  card: z.string().describe("The background color for cards, paired with `card-foreground`."),
  "card-foreground": z.string().describe("Paired with `card`."),
  popover: z.string().describe("The background color for popovers, paired with `popover-foreground`."),
  "popover-foreground": z.string().describe("Paired with `popover`."),
  primary: z.string().describe("The main color, paired with `primary-foreground`."),
  "primary-foreground": z.string().describe("Paired with `primary`."),
  secondary: z.string().describe("A secondary color, paired with `secondary-foreground`."),
  "secondary-foreground": z.string().describe("Paired with `secondary`."),
  muted: z.string().describe("A muted background color, paired with `muted-foreground`."),
  "muted-foreground": z.string().describe("Paired with `muted`."),
  accent: z.string().describe("Subtle color for hover or highlight, paired with `accent-foreground`."),
  "accent-foreground": z.string().describe("Paired with `accent`."),
  destructive: z.string().describe("Color for destructive actions, paired with `destructive-foreground`."),
  "destructive-foreground": z.string().describe("Paired with `destructive`."),
  border: z.string().describe("The color for borders."),
  input: z.string().describe("The background color for input fields."),
  ring: z.string().describe("The color for focus rings."),
  "chart-1": z.string(),
  "chart-2": z.string(),
  "chart-3": z.string(),
  "chart-4": z.string(),
  "chart-5": z.string(),
  radius: z.string().describe("The global border-radius for components. Use 0rem for sharp corners."),
});

export const themeStylesSchema = z.object({
  light: themeStylePropsSchema,
  dark: themeStylePropsSchema,
});

export type ThemeStyleProps = z.infer<typeof themeStylePropsSchema>;
export type ThemeStyles = z.infer<typeof themeStylesSchema>;

export type ThemePreset = {
  source?: "SAVED" | "BUILT_IN";
  createdAt?: string;
  label?: string;
  styles: {
    light: Partial<ThemeStyleProps>;
    dark: Partial<ThemeStyleProps>;
  };
};