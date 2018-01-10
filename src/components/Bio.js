import React from 'react'
import styling from 'styled-components'

class Bio extends React.Component {

  render() {

    const Bubble = styling.p `
      display: inline-block;
      padding-left: 2rem; padding-right: 2rem;
      padding-top: 1rem; padding-bottom: 1rem;
      text-align: center;
      border-style: solid; 
      border-width: .09rem;
      @media screen and (min-width: 30em) {
        border-width: .125rem;
      };
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
      text-decoration: underline;
      text-decoration-skip: ink;
      color: black;
    `
    const Serif = styling.span `
      font-family: 'georgia', serif;
    `
    return (
      <div>
        <Bubble>Ed</Bubble> <Bubble>Future–Optimist</Bubble>

        <Offset1>Currently:</Offset1>
        <List>
          <li>???????? (<NormalLink href="mailto:mail@edouard.us" target="_blank">e-mail me</NormalLink>)</li>
          <li>Co-organizing a <NormalLink href="http://newcomputers.group/" target="_blank">New Computer Working Group</NormalLink></li>
          <li>Part-time faculty at <NormalLink href="https://www.newschool.edu/parsons/art-media-technology-school-amt/" target="_blank">Parsons School of Design</NormalLink></li> 
          <li>Offering freelance R&D</li>
          <li>Cultivating a meta–organization, <NormalLink href="http://learning-gardens.co/" target="_blank">Learning Gardens</NormalLink></li>
        </List>
        
        <Offset2>Previously:</Offset2>
        <List start="6">
          <li>Designed a ˗ˏˋdazzlingˎˊ˗ array of digital product experiences for millions of creative people at <NormalLink href="https://www.tumblr.com/" target="_blank">Tumblr</NormalLink></li>
          <li>Built hyper-complex B<Serif>2</Serif>B software and started a popular intra-net radio station with friends at <NormalLink href="https://www.ibm.com/" target="_blank">International Business Machines</NormalLink></li>
        </List>
      </div>
    )
  }
}

export default Bio