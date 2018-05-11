import React from 'react'
import Link from 'gatsby-link'
import styling from 'styled-components'

class Template extends React.Component {
  render() {

    const { location, children } = this.props

    const Wrapper = styling.section `
    margin-right: auto;
    margin-left: auto;
    width: 80%;
    max-width: 64rem;
    margin-top: 4rem; 
    margin-bottom: 4rem;
    padding-bottom: 4rem;
    font-size: .875rem;
    @media screen and (min-width: 30em) {
      font-size: 1.5rem;
    }
    color: #231E1E;
    font-family: 'Arial', 'Helvetica', sans-serif;
    line-height: 1.5;
    `

    return (
      <Wrapper>
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