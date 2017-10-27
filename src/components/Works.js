import React from 'react'
import styling from 'styled-components'

import uc from './uc.gif'

class Works extends React.Component {
  render() {

    const Bubble = styling.p `
      display: inline-block;
      padding-left: 2rem; padding-right: 2rem;
      padding-top: 1rem; padding-bottom: 1rem;
      margin-left: 2rem;
      @media screen and (min-width: 30em) {
        margin-left: 16rem;
      }
      text-align: center;
      border-style: solid; border-width: 1px;
      border-width: .125rem;
      border-radius: 9999px;
    `
    const Offset1 = styling.p `
      padding-left: 4rem;
    `
    const Offset3 = styling.p `
      padding-left: 2rem;
      @media screen and (min-width: 30em) {
        padding-left: 16rem;
      };
      margin-bottom: 1rem;
    `
    const NormalLink = styling.a `
      text-decoration: none;
      color: DarkGray;
    `
    const UnderConstruction = styling.img `
      width: 100%;
      @media screen and (min-width: 30em) {
        width:  40%;
      }
      margin-bottom: 1rem;
    `
    return (
      <div>
        <Bubble>Works</Bubble>
        <Offset1>A sampling of works, sketches, and other interfaces.</Offset1>
        <p>Case studies: <NormalLink href="http://ux.edouard.us/" target="_blank">digital product design</NormalLink> ... <NormalLink href="http://id.edouard.us/" target="_blank">industrial design</NormalLink>.</p>
        <Offset3>2017 — Ongoing</Offset3>
        <UnderConstruction
          src={uc}
          alt={`Under Construction`}
        />
      </div>
    )
  }
}

export default Works