import React from 'react'
import styled from 'tachyons-components'

class Previously extends React.Component {

  render() {

    const Offset = styled('p')`
      lh-copy pl5
    `
    const List = styled('ol')`
      lh-copy pl2 pb3 measure
    `
    const NormalLink = styled('a')`
      black link
    `
    return (
      <div>
        <Offset>Previously:</Offset>
        <List start="3">
          <li>Designed a ˗ˏˋdazzlingˎˊ˗ array of digital product experiences for millions of creative people at <NormalLink href="https://www.tumblr.com/" target="_blank">Tumblr</NormalLink></li>
          <li>Built hyper-complex B2B software and started a popular intra-net radio station with friends at <NormalLink href="https://www.ibm.com/" target="_blank">International Business Machines</NormalLink></li>
        </List>
      </div>
    )
  }
}

export default Previously