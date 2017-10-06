import React from 'react'
import styled from 'tachyons-components'

class Currently extends React.Component {

  render() {

    const Offset = styled('p')`
      lh-copy pl4 pl7-ns
    `
    const List = styled('ol')`
      lh-copy pl2 pb3
    `
    const NormalLink = styled('a')`
      black link
    `

    return (
      <div>
        <Offset>Currently:</Offset>
        <List>
          <li>???????? (<NormalLink href="mailto:mail@edouard.us" target="_blank">e-mail me</NormalLink>)</li>
          <li>Cultivating a meta–organization, <NormalLink href="http://learning-gardens.co/" target="_blank">Learning Gardens</NormalLink></li>
        </List>
      </div>
    )
  }
}

export default Currently