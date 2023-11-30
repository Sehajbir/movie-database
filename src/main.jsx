import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import { BrowserRouter } from "react-router-dom"

const theme = extendTheme({
  colors: {
    ytRed: 
    {
      50: '#ffe1e1',
      100: '#ffb1b1',
      200: '#ff7f7f',
      300: '#ff4c4c',
      400: '#ff1a1a',
      500: '#e60000',
      600: '#b40000',
      700: '#810000',
      800: '#500000',
      900: '#210000',
    }
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ChakraProvider>
)
