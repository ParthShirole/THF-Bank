import React from 'react'

import { Navbar } from 'responsive-navbar-react'
import 'responsive-navbar-react/dist/index.css'

const NavBarLoggedIn = () => {
  const props = {
    items: [
      {
        text: 'Profile',
        link: '/profile'
      },
      {
        text: 'Transfer',
        link: '/transfer'
      },
      {
        text: 'Your Transactions',
        link: '/transactions'
      },
      {
        text: 'Fixed Deposit',
        link: '/fixeddeposit'
      },
      {
        text: 'Logout',
        link: '/'
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

export default NavBarLoggedIn;