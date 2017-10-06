import React from 'react'
import Link from 'gatsby-link'
import styled from "styled-components"
import { color } from 'styled-system'

class Template extends React.Component {
  render() {

    const { location, children } = this.props

    const Wrapper = styled.section  `
    ${color}
    font-family: 'Arial', 'Helvetica', sans-serif;
    `

    return (
      <Wrapper
      color='black'
      >
        {children()}
      </Wrapper>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.func,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template