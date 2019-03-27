import React from "react";
import styling from "styled-components";

class Bio extends React.Component {
  render() {
    const Bubble = styling.p`
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
    `;
    const Offset1 = styling.p`
      padding-left: 2rem;
      @media screen and (min-width: 30em) {
        padding-left: 16rem;
      };
    `;
    const Offset2 = styling.p`
      padding-left: 4rem;
    `;
    const List = styling.ol`
      padding-left: 0;
      padding-bottom: 1rem;
      max-width: 34em;
    `;
    const NormalLink = styling.a`
      text-decoration: underline;
      text-decoration-skip: ink;
<<<<<<< HEAD
      color: #231E1E;
    `;
    const Serif = styling.span`
=======
      color: black;
    `
    const Serif = styling.span `
>>>>>>> parent of 446c311... remove useless images, add other shit
      font-family: 'georgia', serif;
    `;
    return (
      <div>
        <Bubble>Ed</Bubble> <Bubble>Future–Optimist</Bubble>
<<<<<<< HEAD
        <Offset1>Currently</Offset1>
        <List>
          <li>
            Co-organizing a{" "}
            <NormalLink href="http://newcomputers.group/" target="_blank">
              New Computer Working Group
            </NormalLink>
          </li>
          <li>
            Part-time faculty at{" "}
            <NormalLink
              href="https://www.newschool.edu/parsons/art-media-technology-school-amt/"
              target="_blank"
            >
              Parsons School of Design
            </NormalLink>
          </li>
          <li>
            Distributing{" "}
            <NormalLink href="http://learning-gardens.co/" target="_blank">
              Learning Gardens
            </NormalLink>
          </li>
        </List>
        <Offset2>Previously</Offset2>
=======

        <Offset1>Currently:</Offset1>
        <List>
          <li>Wandering designer —</li>
            <ol type="a">
              {/* <li>New computers, with <NormalLink href="http://urbit.org/" target="_blank">Urbit</NormalLink></li> */}
              <li>Futures of trust, hospitality, and well-being, with <NormalLink href="https://samara.com/" target="_blank">Samara</NormalLink></li>
              <li><NormalLink href="https://blockfront.github.io/" target="_blank">Blockfront</NormalLink>, with <em>Other</em> Internet</li>
              <li>New Maps, Points of Interest, with <NormalLink href="https://foam.space/" target="_blank">FOAM</NormalLink></li>
            </ol>
          <li>Co-organizing a <NormalLink href="http://newcomputers.group/" target="_blank">New Computer Working Group</NormalLink></li>
          <li>Part-time faculty at <NormalLink href="https://www.newschool.edu/parsons/art-media-technology-school-amt/" target="_blank">Parsons School of Design</NormalLink></li>
          <li>Custodian for <NormalLink href="http://learning-gardens.co/" target="_blank">Learning Gardens</NormalLink></li>
        </List>
        
        <Offset2>Previously:</Offset2>
>>>>>>> parent of 446c311... remove useless images, add other shit
        <List start="5">
          <li>
            Futures of trust, hospitality, sharing, etc., with{" "}
            <NormalLink href="https://samara.com/" target="_blank">
              Samara
            </NormalLink>
          </li>
          {/* <li>
            <NormalLink href="http://ei3p.org/">
              EI<Serif>3</Serif>P
            </NormalLink>, with Other Internet
          </li> */}
          <li>
            New Maps, Points of Interest, with{" "}
            <NormalLink href="https://foam.space/" target="_blank">
              FOAM
            </NormalLink>
          </li>
          <li>
            Designed a ˗ˏˋdazzlingˎˊ˗ array of digital product experiences for
            millions of creative people at{" "}
            <NormalLink href="https://www.tumblr.com/" target="_blank">
              Tumblr
            </NormalLink>
          </li>
          <li>
            Built hyper-complex B<Serif>2</Serif>B software and started a
            popular intra-net radio station with friends at{" "}
            <NormalLink href="https://www.ibm.com/" target="_blank">
              International Business Machines
            </NormalLink>
          </li>
        </List>
<<<<<<< HEAD
        {/* <Offset2>Maybe</Offset2>
        <List start="5">
          <li>
            <NormalLink href="http://maybe.clothing/" target="_blank">
              Clothing
            </NormalLink>
          </li>
=======

        <Offset1>Maybe:</Offset1>
        <List start="7">
          <li><NormalLink href="http://maybe.clothing/" target="_blank">Clothing</NormalLink></li>
>>>>>>> parent of 446c311... remove useless images, add other shit
          <li>We can think about the future...</li>
        </List> */}
      </div>
    );
  }
}

export default Bio;
