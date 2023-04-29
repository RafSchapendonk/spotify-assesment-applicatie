const multiplier = {
  none: 1,
  md: 0.9,
  lg: 0.8,
  xl: 0.7,
  xxl: 0.6,
}

const fontSizesList = [
  {
    name: "default", fontSize: 19, lineHeight: 22, multiplier: multiplier.md
  },
  {
    name: "h1", fontSize: 50, lineHeight: 48, multiplier: multiplier.xxl
  },
  {
    name: "h2", fontSize: 40, lineHeight: 44, multiplier: multiplier.xxl
  },
  {
    name: "h3", fontSize: 30, lineHeight: 40, multiplier: multiplier.lg
  },
  {
    name: "h4", fontSize: 24, lineHeight: 32, multiplier: multiplier.lg
  },
  {
    name: "h5", fontSize: 22, lineHeight: 31, multiplier: multiplier.lg
  },
];

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      // '2xl': null, 
      // Null value causes error.
      'xl': '1177px',
      'lg': { 'max': '1176px' },
      'md': { 'max': '900px' },
      'sm': { 'max': '768px' },
      'mob': { 'max': '600px' },
      'xs': { 'max': '500px' },
    },
    extend: {
      margin: {
        'xs': '6px',
        'sm': '12px',
        'mob': '18px',
        'def': '24px',
        '30': '30px',
        'md': '36px',
        'lg': '48px',
        'xl': '60px',
        '2xl': '72px',
        '3xl': '96px',
        '1-col': 'calc(100% / 12)',
        '2-col': 'calc(100% / 12 * 2)'
      },
      padding: {
        'xs': '6px',
        'sm': '12px',
        'mob': '18px',
        'def': '24px',
        '30': '30px',
        'md': '36px',
        'lg': '48px',
        'xl': '60px',
        '2xl': '72px',
        '3xl': '96px',
        '1-col': 'calc(100% / 12)',
        '2-col': 'calc(100% / 12 * 2)'
      },
      inset: {
        'xs': '6px',
        'sm': '12px',
        'mob': '18px',
        'def': '24px',
        'md': '36px',
        'lg': '48px',
        'xl': '60px',
        '2xl': '72px',
        '3xl': '96px',
        '1-col': 'calc(100% / 12)',
        '2-col': 'calc(100% / 12 * 2)'
      },
      borderRadius: {
        '8': '8px',
        '24': '24px',
        '35': '35px'
      },
      zIndex: {
        "-1": "-1",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        "99": "99",
        "999": "999",
      },
      gap: {
        'xs': '6px',
        'sm': '12px',
        'mob': '18px',
        'def': '24px',
        'md': '36px',
        'lg': '48px',
        'xl': '60px',
      },
      height: {
        'xs': '6px',
        'sm': '12px',
        'mob': '18px',
        'def': '24px',
        'md': '36px',
        'lg': '48px',
        'xl': '60px',
        '2xl': '72px',
        '3xl': '96px'
      },
      width: {
        'xs': '6px',
        'sm': '12px',
        'mob': '18px',
        'def': '24px',
        'md': '36px',
        'lg': '48px',
        'xl': '60px',
        '2xl': '72px',
        '3xl': '96px'
      },
      fontSize: loadFontSizes(fontSizesList),
    },
  },
  plugins: [],
}

function loadFontSizes(fontList) {
  var response = {};
  fontList.forEach((element) => {
    response[element.name] = fontClamp(
      element.fontSize,
      element.lineHeight,
      element.multiplier,
      element.fontSizeMob,
      element.lineHeightMob
    );
  });

  return response;
}

function fontClamp(
  fontsize,
  lineheight,
  multiplier = null,
  fontsizeMob = 0,
  lineheightMob = 0
) {
  var useMultiplier = multiplier != null ? multiplier : 1;
  var useFontSize = fontsize;
  var useFontSizeMob =
    fontsizeMob > 0 ? fontsizeMob : useFontSize * useMultiplier;
  var useLineHeight = lineheight;
  var useLineHeightMob =
    lineheightMob > 0 ? lineheightMob : useLineHeight * useMultiplier;

  return [
    `clamp(${useFontSizeMob}px, calc(${useFontSizeMob}px + ((${fontsize} - ${useFontSizeMob}) * ((100vw - 360px) / (1230 - 360)))), ${useFontSize}px)`,
    {
      lineHeight: `clamp(${useLineHeightMob}px, calc(${useLineHeightMob}px + ((${lineheight} - ${useLineHeightMob}) * ((100vw - 360px) / (1230 - 360)))), ${useLineHeight}px)`,
    },
  ];
}
