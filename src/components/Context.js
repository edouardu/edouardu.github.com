import React from 'react'
import styled from 'tachyons-components'

class Context extends React.Component {
  render() {

    const Bubble = styled('p')`
      lh-copy ml2 ml5-ns ph4 pv3 tc ba br-pill bw1 dib
    `
    const Offset1 = styled('p')`
      lh-copy pl5
    `
    const Offset2 = styled('p')`
      lh-copy pl2 measure
    `
    const Offset3 = styled('p')`
      lh-copy ph2 pl4-ns measure
    `
    const Offset4 = styled('p')`
      lh-copy pl4 pl7-ns
    `
    const NormalLink = styled('a')`
      silver link
    `
    return (
      <div>
        <Bubble>Context</Bubble>
        <Offset1>Interests and Expertise include:</Offset1>
        <Offset2>
          <NormalLink href="https://www.are.na/edouard-u/digital-product-design" target="_blank">Product Design</NormalLink>, <NormalLink href="https://www.are.na/edouard-u/physical-product-design" target="_blank">Industrial Design</NormalLink>, <NormalLink href="https://www.are.na/edouard-u/products-systems" target="_blank">Systems Design</NormalLink>, <NormalLink href="https://www.are.na/edouard-u/organizational-design" target="_blank">Organizational Design</NormalLink>, <NormalLink href="https://www.are.na/edouard-u/mass-manufacture" target="_blank">Mass Manufacture</NormalLink>, and other <NormalLink href="https://www.are.na/edouard-u/after-earth" target="_blank">Large and <span>Wicked</span> Projects</NormalLink>.
        </Offset2>
        <Offset3>
          I am oriented towards the future. I’d like to spend my life guiding complex product systems towards egalitarian ends. Heritage craft-works and nostalgia are uninteresting to me. New infrastructures and modes of being are very interesting to me.
        </Offset3>
        <Offset4>I can build any system, large or small.</Offset4>
      </div>
    )
  }
}

export default Context