import React from 'react'
import Link from "gatsby-link"
import styling from 'styled-components'

class More extends React.Component {
  render() {

    const Bubble = styling.p `
      display: inline-block;
      padding-left: 2rem; padding-right: 2rem;
      padding-top: 1rem; padding-bottom: 1rem;
      margin-left: 2rem;
      @media screen and (min-width: 30em) {
        margin-left: 4rem;
      }
      text-align: center;
      border-style: solid; 
      border-width: .09rem;
      @media screen and (min-width: 30em) {
        border-width: .125rem;
      };
      border-radius: 9999px;
    `
    const List = styling.ol `
      padding-left: 0;
      padding-bottom: 1rem;
      max-width: 34em;
    `
    const NormalLink = styling.a `
      text-decoration: underline;
      text-decoration-skip: ink;
      color: black;
    `
    const NiceLink = styling(Link) `
      text-decoration: underline;
      text-decoration-skip: ink;
      color: black;
    `
    return (
      <div>
        <Bubble>More</Bubble>
        <List>
          <li>Writing in my <NiceLink to="/writing/">writing directory</NiceLink></li>
          <li>Open sourcing projects on <NormalLink href="https://github.com/edouerd" target="_blank">Github</NormalLink></li>
          <li>Hyperlinking and researching on <NormalLink href="https://www.are.na/edouard-u/index" target="_blank">Are.na</NormalLink></li>
        </List>
      </div>
    )
  }
}

export default More