import React from 'react';

// From https://gist.github.com/AndrewBarba/2c0f6612ceef30f5f55d

const SFPro: React.FC = () => (
  <style jsx global>{`
@font-face {
  font-family: "SF Display";
  font-weight: 900;
  src: url("https://sf.abarba.me/SF-UI-Display-Black.otf");
}

/** Bold */
@font-face {
  font-family: "SF Display";
  font-weight: 700;
  src: url("https://sf.abarba.me/SF-UI-Display-Bold.otf");
}

/** Heavy */
@font-face {
  font-family: "SF Display";
  font-weight: 800;
  src: url("https://sf.abarba.me/SF-UI-Display-Heavy.otf");
}

/** Light */
@font-face {
  font-family: "SF Display";
  font-weight: 200;
  src: url("https://sf.abarba.me/SF-UI-Display-Light.otf");
}

/** Medium */
@font-face {
  font-family: "SF Display";
  font-weight: 500;
  src: url("https://sf.abarba.me/SF-UI-Display-Medium.otf");
}

/** Regular */
@font-face {
  font-family: "SF Display";
  font-weight: 400;
  src: url("https://sf.abarba.me/SF-UI-Display-Regular.otf");
}

/** Semibold */
@font-face {
  font-family: "SF Display";
  font-weight: 600;
  src: url("https://sf.abarba.me/SF-UI-Display-Semibold.otf");
}

/** Thin */
@font-face {
  font-family: "SF Display";
  font-weight: 300;
  src: url("https://sf.abarba.me/SF-UI-Display-Thin.otf");
}

/** Ultralight */
@font-face {
  font-family: "SF Display";
  font-weight: 100;
  src: url("https://sf.abarba.me/SF-UI-Display-Ultralight.otf");
}

/*---------------------------------------------------------------------------*
 * SF UI Text
 *---------------------------------------------------------------------------*/

/** Bold */
@font-face {
  font-family: "SF Text";
  font-weight: 700;
  src: url("https://sf.abarba.me/SF-UI-Text-Bold.otf");
}

/** Bold Italic */
@font-face {
  font-family: "SF Text";
  font-weight: 700;
  font-style: italic;
  src: url("https://sf.abarba.me/SF-UI-Text-BoldItalic.otf");
}

/** Heavy */
@font-face {
  font-family: "SF Text";
  font-weight: 800;
  src: url("https://sf.abarba.me/SF-UI-Text-Heavy.otf");
}

/** Heavy Italic */
@font-face {
  font-family: "SF Text";
  font-weight: 800;
  font-style: italic;
  src: url("https://sf.abarba.me/SF-UI-Text-HeavyItalic.otf");
}

/** Light */
@font-face {
  font-family: "SF Text";
  font-weight: 200;
  src: url("https://sf.abarba.me/SF-UI-Text-Light.otf");
}

/** Light Italic */
@font-face {
  font-family: "SF Text";
  font-weight: 200;
  font-style: italic;
  src: url("https://sf.abarba.me/SF-UI-Text-LightItalic.otf");
}

/** Medium */
@font-face {
  font-family: "SF Text";
  font-weight: 500;
  src: url("https://sf.abarba.me/SF-UI-Text-Medium.otf");
}

/** Medium Italic */
@font-face {
  font-family: "SF Text";
  font-weight: 500;
  font-style: italic;
  src: url("https://sf.abarba.me/SF-UI-Text-MediumItalic.otf");
}

/** Regular */
@font-face {
  font-family: "SF Text";
  font-weight: 400;
  src: url("https://sf.abarba.me/SF-UI-Text-Regular.otf");
}

/** Regular Italic */
@font-face {
  font-family: "SF Text";
  font-weight: 400;
  font-style: italic;
  src: url("https://sf.abarba.me/SF-UI-Text-RegularItalic.otf");
}

/** Semibold */
@font-face {
  font-family: "SF Text";
  font-weight: 600;
  src: url("https://sf.abarba.me/SF-UI-Text-Semibold.otf");
}

/** Semibold Italic */
@font-face {
  font-family: "SF Text";
  font-weight: 600;
  font-style: italic;
  src: url("https://sf.abarba.me/SF-UI-Text-SemiboldItalic.otf");
}

/** Ultrathin */
@font-face {
  font-family: "SF Text";
  font-weight: 100;
  src: url("https://sf.abarba.me/SF-UI-Text-Ultrathin.otf");
}

/** Ultrathin Italic */
@font-face {
  font-family: "SF Text";
  font-weight: 100;
  font-style: italic;
  src: url("https://sf.abarba.me/SF-UI-Text-UltrathinItalic.otf");
}

/*---------------------------------------------------------------------------*
 * SF Mono
 *---------------------------------------------------------------------------*/

/** Bold */
@font-face {
  font-family: "SF Mono";
  font-weight: 700;
  src: url("https://sf.abarba.me/SFMono-Bold.otf");
}

/** Bold Italic */
@font-face {
  font-family: "SF Mono";
  font-weight: 700;
  font-style: italic;
  src: url("https://sf.abarba.me/SFMono-BoldItalic.otf");
}

/** Heavy */
@font-face {
  font-family: "SF Mono";
  font-weight: 800;
  src: url("https://sf.abarba.me/SFMono-Heavy.otf");
}

/** Heavy Italic */
@font-face {
  font-family: "SF Mono";
  font-weight: 800;
  font-style: italic;
  src: url("https://sf.abarba.me/SFMono-HeavyItalic.otf");
}

/** Light */
@font-face {
  font-family: "SF Mono";
  font-weight: 200;
  src: url("https://sf.abarba.me/SFMono-Light.otf");
}

/** Light Italic */
@font-face {
  font-family: "SF Mono";
  font-weight: 200;
  font-style: italic;
  src: url("https://sf.abarba.me/SFMono-LightItalic.otf");
}

/** Medium */
@font-face {
  font-family: "SF Mono";
  font-weight: 500;
  src: url("https://sf.abarba.me/SFMono-Medium.otf");
}

/** Medium Italic */
@font-face {
  font-family: "SF Mono";
  font-weight: 500;
  font-style: italic;
  src: url("https://sf.abarba.me/SFMono-MediumItalic.otf");
}

/** Regular */
@font-face {
  font-family: "SF Mono";
  font-weight: 400;
  src: url("https://sf.abarba.me/SFMono-Regular.otf");
}

/** Regular Italic */
@font-face {
  font-family: "SF Mono";
  font-weight: 400;
  font-style: italic;
  src: url("https://sf.abarba.me/SFMono-RegularItalic.otf");
}

/** Semibold */
@font-face {
  font-family: "SF Mono";
  font-weight: 600;
  src: url("https://sf.abarba.me/SFMono-Semibold.otf");
}

/** Semibold Italic */
@font-face {
  font-family: "SF Mono";
  font-weight: 600;
  font-style: italic;
  src: url("https://sf.abarba.me/SFMono-SemiboldItalic.otf");
}
  `}</style>
);

export default SFPro;
