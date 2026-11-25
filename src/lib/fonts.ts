import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

/** Texte et titres : grotesque nette et moderne. */
export const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

/** Petites étiquettes « code » (numéros de section, extraits Liquid). */
export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/** Mots mis en avant dans les titres, en italique. */
export const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
