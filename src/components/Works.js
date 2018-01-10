import React from 'react'
import styling from 'styled-components'

import uc from './uc.gif'
import tba from './tba.svg'
import urb1 from './urb1.png'
import urb2 from './urb2.png'
import urb3 from './urb3.png'
import arena1 from './arena1.png'
import samara from './samara.svg'
import lg0 from './lg0.svg'
import lg1 from './lg1.jpg'
import lg2 from './lg2.png'
import t1 from './t1.png'
import t3 from './t3.png'
import t4 from './t4.png'
import t5 from './t5.png'


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
      border-style: solid; 
      border-width: .09rem;
      @media screen and (min-width: 30em) {
        border-width: .125rem;
      };
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
      text-decoration: underline;
      text-decoration-skip: ink;
      color: black;
    `

    const ProjectOne = styling.div `
      margin-top: 2rem;
      width: 100%;
      @media screen and (min-width: 30em) {
        margin-top: 4rem;
        width: 70%;
        margin-left: 16rem;
      };
    `
    const ProjectTwo = styling.div `
      margin-top: 2rem;
      width: 100%;
      @media screen and (min-width: 30em) {
        margin-top: 8rem;
        width: 70%;
        margin-left: 4rem;
      };
    `
    const ProjectThree = styling.div `
      margin-top: 2rem;
      width: 100%;
      @media screen and (min-width: 30em) {
        margin-top: 8rem;
        width: 70%;
      };
    `
    const ProjectFour = styling.div `
      margin-top: 2rem;
      margin-bottom: 1rem;
      width: 100%;
      @media screen and (min-width: 30em) {
        margin-top: 4rem;
        margin-bottom: 2rem;
        width: 70%;
        margin-left: 16rem;
      };
    `

    const ProjectImage = styling.img `
      display: block;
      width: 100%;
      margin-top: 2rem;
      border-radius: .25rem;
      filter: grayscale(100%);
      transition: filter .2s cubic-bezier(.55, .085, .68, .53);
      &:hover {
        filter: none;
      }
    `
    const ProjectImageSm = styling.img `
      display: inline-block;
      width: 50%;
      margin-top: 2rem;
      border-radius: .25rem;
      filter: grayscale(100%);
      transition: filter .2s cubic-bezier(.55, .085, .68, .53);
      &:hover {
        filter: none;
      }
    `
    const ProjectTitle = styling.a `
      display: inline-block;
      padding-top: 1rem;
      font-size: .875rem;
      @media screen and (min-width: 30em) {
        font-size: 1rem;
      };
      text-decoration: none;
      line-height: 1.25;
      color: black;
    `
    const ProjectDescription = styling.small `
      display: block;
      font-size: .875rem;
      color: DarkGray;
    `

    return (
      <div>
        <Bubble>Works</Bubble>
        <Offset1>A sampling of works, sketches, and other interfaces.</Offset1>
        <Offset3>2017 — Ongoing</Offset3>
        
        <ProjectOne>
          <ProjectImage
            src={urb1}
            alt={`Urbit Wallet App`}
          />
          <ProjectTitle href="https://www.figma.com/file/BhEQXxk5FfbszWE4qLD2SFC8/Urbit" target="_blank">Urbit — Crypto wallet spec/flow</ProjectTitle>
          <ProjectDescription>Open-source/unsolicited design works...</ProjectDescription>
          
          <ProjectImage
            src={urb3}
            alt={`Urbit Friendly Console 1`}
          />
          <ProjectImage
            src={urb2}
            alt={`Urbit Friendly Console 2`}
          />
          <ProjectTitle href="https://www.figma.com/file/BhEQXxk5FfbszWE4qLD2SFC8/Urbit?node-id=103%3A0" target="_blank">Urbit — Friendly Console/Input concepting</ProjectTitle>
          <ProjectDescription>...easier-to-use patterns...</ProjectDescription>

          <ProjectImage
            src={arena1}
            alt={`Are.na mobile app sketch`}
          />
          <ProjectTitle href="https://www.figma.com/file/FqZGeDLINIaBP9D3mXy3SfKI/Are.na" target="_blank">Are.na — Mobile app concepting</ProjectTitle>
          <ProjectDescription>...speculative interfaces.</ProjectDescription>
        </ProjectOne>

        <ProjectTwo>
          <ProjectImage
            src={tba}
            alt={`TBA`}
          />
          <ProjectTitle>TBA</ProjectTitle>
          <ProjectDescription>Moonlighting, Freelance, etc.</ProjectDescription>
        </ProjectTwo>

        <ProjectThree>
          <ProjectImageSm
            src={lg1}
            alt={`Learning Gardens Materia`}
          />
          <ProjectImage
            src={lg2}
            alt={`Learning Gardens Materia`}
          />
          <ProjectTitle>Learning Gardens Things</ProjectTitle>
          <ProjectDescription>Art and materials and website for Learning Gardens.</ProjectDescription>
        </ProjectThree>

        <ProjectFour>
          <ProjectImage
            src={t1}
            alt={`Urbit Wallet App`}
          />
          <ProjectImage
            src={tba}
            alt={`Urbit Wallet App`}
          />
          <ProjectTitle>Tumblr Apps</ProjectTitle>
          <ProjectDescription>Many, many app experiences and interfaces...</ProjectDescription>
          
          <ProjectImage
            src={t3}
            alt={`Urbit Friendly Console`}
          />

          <ProjectImageSm
            src={t4}
            alt={`Tumblr`}
          />
          <ProjectImageSm
            src={t5}
            alt={`Tumblr`}
          />
          <ProjectTitle>Tumblr Extracurricular</ProjectTitle>
          <ProjectDescription>... and websites for Tumblr.</ProjectDescription>
        </ProjectFour>

      </div>
    )
  }
}

export default Works