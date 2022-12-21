
const theme = createMuiTheme({
  typography: {
    fontFamily: "Abel,serif",
    color: "#909090",
    h4: {
      fontFamily: "Bitter, serif",
      fontWeight: 700,
      fontSize:'1.9rem'
    },
    button: {
      fontFamily: "Libre Franklin",
    },
    subtitle2: {
      fontWeight: "bold",
      fontFamily: "Bitter, serif",
    },
    body2: {
      color: "#909090",
    },
  },
  shape: 0,
  palette: {
    primary: {
      main: "#231F20",
    },
    secondary: {
        main: "#333333",
      },
    },
    overrides: {
        MuiTextField: {
          root: {
            borderColor: "#909090",
          },
        },
      },
      props: {
        MuiLink: {
          underline: "none",
          color: "secondary",
          fontFamily: "Libre Franklin",
        }
    }
})
