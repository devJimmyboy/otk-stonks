import '@mui/lab/themeAugmentation'

import { createTheme } from '@mui/material/styles'

const twitchColors = {
  main: '#9146FF',
  muted: {
    ice: '#F0F0FF',
    jiggle: '#FAB4FF',
    worm: '#FACDCD',
    isabelle: '#FEEE85',
    droid: '#BEFAE1',
    wipeout: '#00C8AF',
    smoke: '#D2D2E6',
    widow: '#BFABFF',
    peach: '#FC6675',
    pacman: '#FFCA5F',
    felicia: '#57BEE6',
    sonic: '#0014A5',
  },
  accent: {
    dragon: '#8205B4',
    cuddle: '#FA1ED2',
    bandit: '#FF6905',
    lightning: '#FAFA19',
    ko: '#BEFF00',
    mega: '#00FAFA',
    nights: '#41145F',
    osu: '#BE0078',
    sniper: '#FA2828',
    egg: '#00FA05',
    legend: '#69FFC3',
    zero: '#1E69FF',
  },
}

// Create a theme instance.
const theme = createTheme({
  typography: {
    button: {
      fontWeight: 900,
      fontFamily: 'DM Sans',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffc31f',
    },
    secondary: {
      main: '#21bbff',
    },
    info: {
      main: '#16BAC5',
    },
    green: {
      main: '#24D896',
    },
    red: {
      main: '#FE6B8B',
    },
    twitch: twitchColors,
    background: {
      default: '#222228',
      paper: '#141b22',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        },
      },
    },
  },
})

export default theme

declare module '@mui/material/styles' {
  interface Palette {
    green: Palette['primary']
    red: Palette['primary']
    twitch: typeof twitchColors
  }
  interface PaletteOptions {
    green: PaletteOptions['primary']
    red: PaletteOptions['primary']
    twitch: typeof twitchColors
  }
}
