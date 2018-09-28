import React from 'react'
import styling from 'styled-components'

class Context extends React.Component {
  render() {

    const Bubble = styling.p `
      display: inline-block;
      padding-left: 2rem; padding-right: 2rem;
      padding-top: 1rem; padding-bottom: 1rem;
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
    const Offset2 = styling.p `
      max-width: 30em;
    `
    const Offset3 = styling.p `
      @media screen and (min-width: 30em) {
        padding-left: 2rem;
      }
      max-width: 30em;
    `
    const Offset4 = styling.p `
      padding-left: 2rem;
      @media screen and (min-width: 30em) {
        padding-left: 16rem;
      }
    `
    const NormalLink = styling.a `
      color: #231E1E;
      text-decoration: underline;
      text-decoration-skip: ink;
    `
    const Serif = styling.span `
      font-family: 'georgia', serif;
      font-style: italic;
    `
    const ImgInline = styling.img `
      height: 1em;
      width: 1em;
      margin-bottom: -0.2em;
    `
    return (
      <div>
        <Bubble>Personal Context</Bubble>
        <Offset1>Interests and Expertise include</Offset1>
        <Offset2>
          <NormalLink href="https://www.are.na/edouard-u/physical-digital-product-design" target="_blank">Product Design</NormalLink>, <NormalLink href="https://www.are.na/edouard-u/physical-product-design" target="_blank">Industrial Design</NormalLink>, <NormalLink href="https://www.are.na/edouard-u/products-systems" target="_blank">Systems Design</NormalLink>, <NormalLink href="https://www.are.na/edouard-u/organizational-design" target="_blank">Organizational Design</NormalLink>, <NormalLink href="https://www.are.na/edouard-u/mass-manufacture" target="_blank">Mass Manufacture</NormalLink>, and other <NormalLink href="https://www.are.na/edouard-u/after-earth" target="_blank">Large and <Serif>Wicked</Serif> Projects</NormalLink>.
        </Offset2>
        {/* <Offset3>
          I am folding the future into the present. I’d like to spend my life guiding complex product systems towards egalitarian ends. Heritage craft-works and nostalgia are uninteresting to me. New infrastructures and modes of being are very interesting to me.
        </Offset3> */}
        {/* <Offset4>I assemble systems, large or small.</Offset4> */}
        <Offset4>I've been thinking a lot about the future.</Offset4>
        <p>If you’d like, send an <NormalLink href="mailto:mail@edouard.us" target="_blank">e-mail</NormalLink> and/or <NormalLink href="https://twitter.com/edouerd" target="_blank">@</NormalLink> me. Thanks for visiting, stay a while.</p>
      </div>
    )
  }
}

export default Context