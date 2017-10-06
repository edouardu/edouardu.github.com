import React from 'react'
import styled from 'tachyons-components'

class Bio extends React.Component {

  render() {

    const Bubble = styled('p')`
      lh-copy ph4 pv3 tc ba br-pill bw1 dib
    `
    return (
      <div>
        <Bubble>Ed</Bubble> <Bubble>Future–Optimist</Bubble>
      </div>
    )
  }
}

export default Bio