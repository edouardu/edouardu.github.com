import React from 'react'
import Link from "gatsby-link"
import styling from 'styled-components'

class HeaderBlog extends React.Component {

  render() {

    const Nav = styling.nav `
      margin-right: auto;
      margin-left: auto;
      margin-bottom: 4rem;
      width: 80%;
      max-width: 64rem; 
      text-align: right;
      bottom: 0;
      position: fixed;
      z-index: 999;
    `
    const NiceLink = styling(Link) `
      text-decoration: none;
      color: black;
    `

    return (
      <Nav>
        <NiceLink to="/writing/">Back 2 Index</NiceLink>
      </Nav>
    )
  }
}

export default HeaderBlog