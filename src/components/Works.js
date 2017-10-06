import React from 'react'
import styled from 'tachyons-components'

import uc from './uc.gif'

class Works extends React.Component {
  render() {

    const Bubble = styled('p')`
      lh-copy ml4 ml7-ns ph4 pv3 tc ba br-pill bw1 dib
    `
    const Offset1 = styled('p')`
      lh-copy pl5
    `
    const Offset2 = styled('p')`
      lh-copy pl2
    `
    const Offset3 = styled('p')`
      lh-copy pl4 pl7-ns mb3
    `
    const NormalLink = styled('a')`
      silver link
    `
    const UnderConstruction = styled('img')`
      w-100 w-40-ns pb3
    `
    return (
      <div>
        <Bubble>Works</Bubble>
        <Offset1>A sampling of works, sketches, and other interfaces.</Offset1>
        <Offset2>Case studies: <NormalLink href="http://ux.edouard.us/" target="_blank">digital product design</NormalLink> ... <NormalLink href="http://id.edouard.us/" target="_blank">industrial design</NormalLink>.</Offset2>
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