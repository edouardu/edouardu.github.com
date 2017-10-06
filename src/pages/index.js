import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from 'tachyons-components'

import Bio from '../components/Bio'
import Currently from '../components/Currently'
import Previously from '../components/Previously'
import Works from '../components/Works'
import More from '../components/More'
import Context from '../components/Context'
import Contact from '../components/Contact'

class Front extends React.Component {
  render() {

    const Content = styled('section')`
      center w-80 mw8 mv5 pb5 f6 f3-ns f2-xl
    `
    return (
      <Content>
        <Bio />
        <Currently />
        <Previously />
        <Works />
        <More />
        <Context />
        <Contact />
      </Content>
    )
  }
}

export default Front
