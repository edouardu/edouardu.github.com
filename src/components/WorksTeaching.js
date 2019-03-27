import React from 'react'
import styling from 'styled-components'

class WorksTeaching extends React.Component {
  render() {

    const Bubble = styling.p `
      display: inline-block;
      padding-left: 2rem; padding-right: 2rem;
      padding-top: 1rem; padding-bottom: 1rem;
      text-align: center;
      border-style: solid;
      border-radius: 9999px;
      border-width: .09rem;
      @media screen and (min-width: 30em) {
        border-width: .125rem;
      };
    `
    const Bubble2 = Bubble.extend `
      margin-left: 2rem;
      @media screen and (min-width: 30em) {
        margin-left: 16rem;
      }
    `
    const Bubble3 = Bubble.extend `
        margin-left: 2rem;
        @media screen and (min-width: 30em) {
          margin-left: 4rem;
      }
    `

    const Offset1 = styling.p `
      padding-left: 4rem;
    `
    const Offset3 = styling.p `
      padding-left: 2rem;
      @media screen and (min-width: 30em) {
        padding-left: 16rem;
      };
      margin-bottom: 1rem;
    `
    const ListOffset3 = styling.ul `
      padding-left: 2rem;
      @media screen and (min-width: 30em) {
        padding-left: 18rem;
      };
      margin-bottom: 1rem;
    `
    const ListOffset1 = styling.ul `
      padding-left: 2rem;
      @media screen and (min-width: 30em) {
        padding-left: 6rem;
      };
      margin-bottom: 1rem;
    `
    const NormalLink = styling.a `
      text-decoration: underline;
      text-decoration-skip: ink;
      color: black;
    `

    const CollabText = styling.span`
      font-family: 'Georgia', serif;
      font-size: .8rem;
      font-style: italic;
    `

    return (
      <div>
        <Bubble>Teaching</Bubble>
        <Offset1>Archive of Educational Works, Workshops, and Exercises.</Offset1>
        <Offset3>2018 — Ongoing</Offset3>
        
        <Bubble2>Projects</Bubble2>
        <ListOffset3>
          <li>Text Adventures <CollabText>Documentation Soon!</CollabText></li>
          <li>Difference and Repetition <CollabText>Documentation Soon!</CollabText></li>
          <li>Little Free Networks <CollabText>Documentation Soon!</CollabText></li>
          <li>Human–Computer Interfaces <CollabText>Documentation Soon!</CollabText></li>
        </ListOffset3>

        <Bubble>Workshops</Bubble>
        <ul>
          <li><NormalLink href="https://www.are.na/edouard-u/being-a-body-infrastructure" target="_blank">Being a Body</NormalLink>, <CollabText>with <NormalLink href="https://callil.com/" target="_blank">Cal</NormalLink> and <NormalLink href="https://sarahhamerman.com/" target="_blank">Sarah</NormalLink></CollabText></li>
          <li><NormalLink href="https://www.are.na/block/1678076" target="_blank">Sightseeing Interfaces</NormalLink></li>
          <li><NormalLink href="https://www.are.na/edouard-u/dream-studio" target="_blank">Dream Studio</NormalLink></li>
        </ul>

        <Bubble3>Courses</Bubble3>
        <Offset1>Someday</Offset1>
          <ListOffset1>
            <li>20XX, <NormalLink href="https://products-systems.glitch.me/" target="_blank">Products, Systems</NormalLink>, Online</li>
          </ListOffset1>
        <Offset1>Current</Offset1>
          <ListOffset1>
            <li>Spring 2018, <NormalLink href="https://csi-18.glitch.me/" target="_blank">Core Studio Interaction</NormalLink>, Parsons</li>
          </ListOffset1>
        <Offset1>Past</Offset1>
          <ListOffset1>
            <li>2014–2015, Prototyping/Design Thinking <NormalLink href="https://www.youtube.com/watch?v=WwfC11NRPfQ" target="_blank">Workshop(s)</NormalLink>, IBM</li>
          </ListOffset1>
      </div>
    )
  }
}

export default WorksTeaching