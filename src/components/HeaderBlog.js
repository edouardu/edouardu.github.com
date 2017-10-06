import React from 'react'
import Link from "gatsby-link"
import styled from 'tachyons-components'

class HeaderBlog extends React.Component {

  render() {

    const Nav = styled('nav')`
      center w-80 mb5 mw8 tr f6 f3-ns bottom-0 fixed z-999 
    `
    const NiceLink = styled(Link)`
      black link
    `
    return (
      <Nav>
        <NiceLink to="/writing/">Back 2 Index</NiceLink>
      </Nav>
    )
  }
}

export default HeaderBlog