import React from 'react'
import styling from 'styled-components'

class Bio2 extends React.Component {

  render() {
    const Offset1 = styling.p `
      padding-left: 2rem;
      @media screen and (min-width: 30em) {
        padding-left: 16rem;
      };
    `
    const Offset2 = styling.p `
      padding-left: 4rem;
    `
    const NormalLink = styling.a `
      text-decoration: none;
      text-decoration-skip: ink;
      color: #231E1E;
    `
    const Serif = styling.span `
      font-family: 'times', 'times new roman', serif;
      font-style: italic;
    `
    const Encircle = styling.div `
      max-width: 20em;
      border-style: solid; border-width: 1px;
      border-radius: 100%;
      @media screen and (min-width: 30em) {
        padding: 3em 3em;
      };
      padding: 4em 3em;
      margin-right:auto;
      margin-left:auto;
    `
    const CenterText = styling.p `
      text-align: center;
      padding-right: 10em;
    `

    return (
      <div>
        <Serif>
        <CenterText>É. Urcades —</CenterText>
        <Encircle>
          <Offset2>“No brand, quality infrastructure”</Offset2>
          <Offset1>and</Offset1>
          <Offset2>“Lived Outcomes”</Offset2>
          <p>I've been thinking a lot about the future.</p>
          <p>Send news: <NormalLink href="mailto:mail@edouard.us" target="_blank">mail@edouard.us</NormalLink></p>
          <Offset2><NormalLink href="https://news.edouard.us/" target="_blank">Newsletter</NormalLink></Offset2>
          <Offset1><NormalLink href="#" target="_blank">Works</NormalLink></Offset1>
        </Encircle>
        </Serif>
      </div>
    )
  }
}

export default Bio2