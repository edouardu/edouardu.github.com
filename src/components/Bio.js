import React from 'react'
import styling from 'styled-components'

class Bio extends React.Component {

  render() {

    const Bubble = styling.p `
      display: inline-block;
      padding-left: 2rem; padding-right: 2rem;
      padding-top: 1rem; padding-bottom: 1rem;
      text-align: center;
      border-style: solid; border-width: 1px;
      border-width: .125rem;
      border-radius: 9999px;
    `
    const Offset1 = styling.p `
      padding-left: 2rem;
      @media screen and (min-width: 30em) {
        padding-left: 16rem;
      };
    `
    const Offset2 = styling.p `
      padding-left: 4rem;
    `
    const List = styling.ol `
      padding-left: 0;
      padding-bottom: 1rem;
      max-width: 34em;
    `
    const NormalLink = styling.a `
      text-decoration: none;
      color: black;
    `
    return (
      <div>
        <Bubble>Ed</Bubble> <Bubble>Future–Optimist</Bubble>

        <Offset1>Currently:</Offset1>
        <List>
          <li>???????? (<NormalLink href="mailto:mail@edouard.us" target="_blank">e-mail me</NormalLink>)</li>
          <li>Cultivating a meta–organization, <NormalLink href="http://learning-gardens.co/" target="_blank">Learning Gardens</NormalLink></li>
        </List>
        
        <Offset2>Previously:</Offset2>
        <List start="3">
          <li>Designed a ˗ˏˋdazzlingˎˊ˗ array of digital product experiences for millions of creative people at <NormalLink href="https://www.tumblr.com/" target="_blank">Tumblr</NormalLink></li>
          <li>Built hyper-complex B2B software and started a popular intra-net radio station with friends at <NormalLink href="https://www.ibm.com/" target="_blank">International Business Machines</NormalLink></li>
        </List>
      </div>
    )
  }
}

export default Bio