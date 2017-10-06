import React from 'react'
import Link from "gatsby-link"
import styled from 'tachyons-components'

class More extends React.Component {
  render() {

    const Bubble = styled('p')`
      lh-copy ml4 ml5-ns ph4 pv3 tc ba br-pill bw1 dib
    `
    const List = styled('ol')`
      lh-copy pl2 pb3
    `
    const NormalLink = styled('a')`
      silver link
    `
    const NiceLink = styled(Link)`
      silver link
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