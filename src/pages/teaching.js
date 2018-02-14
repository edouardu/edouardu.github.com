import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styling from 'styled-components'

import WorksTeaching from '../components/WorksTeaching'
import Header from '../components/Header'

class Teaching extends React.Component {
  render() {

    const siteTitle = 'Édouard U. — Teaching'

    return (
      <section>
        <Helmet title={`${siteTitle}`} />
        <WorksTeaching />
        <Header />
      </section>
    )
  }
}

export default Teaching