import React from 'react'

import { Navbar } from 'responsive-navbar-react'
import 'responsive-navbar-react/dist/index.css'

const NavBar = () => {
  const props = {
    items: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Register',
        link: '/register'
      },
      {
        text: 'Login',
        link: '/login'
      }
    ],
    logo: {
      text: 'THF Bank',
      link: '/'
    },
    style: {
      barStyles: {
        background: '#444',
        fontFamily: "'Lato', sans-serif",
      },
      sidebarStyles: {
        background: '#222',
        buttonColor: 'white'
      }
    }
  }
  return <Navbar {...props} />
}

export default NavBar;