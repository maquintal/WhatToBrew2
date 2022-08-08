import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Drawer from "@components/layout/drawer"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

interface ThemeInterface {
  colors: {
    primary: string
  }
}

const theme: ThemeInterface = {
  colors: {
    primary: '#0070f3',
  },
}

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Drawer>
          <Component {...pageProps} />
        </Drawer>
      </ThemeProvider>
    </>
  )
}