import React from 'react'
import styled from 'tachyons-components'

class Contact extends React.Component {
  render() {

    const CTA = styled('p')`
      lh-copy pl2
    `
    const NormalLink = styled('a')`
      black link
    `
    return (
        <CTA>If you’d like, send an <NormalLink href="mailto:mail@edouard.us" target="_blank">e-mail</NormalLink> and/or <NormalLink href="https://twitter.com/edouerd" target="_blank">@</NormalLink> me. Thanks for visiting, stay a while.</CTA>
    )
  }
}

export default Contact