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

    const ProjectOne = styling.div `
      margin-top: 2rem;
      width: 100%;
      @media screen and (min-width: 30em) {
        margin-top: 4rem;
        width: 70%;
        margin-left: 16rem;
      };
    `
    const ProjectTwo = styling.div `
      margin-top: 2rem;
      width: 100%;
      @media screen and (min-width: 30em) {
        margin-top: 8rem;
        width: 70%;
        margin-left: 4rem;
      };
    `
    const ProjectThree = styling.div `
      margin-top: 2rem;
      width: 100%;
      @media screen and (min-width: 30em) {
        margin-top: 8rem;
        width: 70%;
      };
    `
    const ProjectFour = styling.div `
      margin-top: 2rem;
      margin-bottom: 1rem;
      width: 100%;
      @media screen and (min-width: 30em) {
        margin-top: 4rem;
        margin-bottom: 2rem;
        width: 70%;
        margin-left: 16rem;
      };
    `

    const ProjectImage = styling.img `
      display: block;
      width: 100%;
      margin-top: 2rem;
      border-radius: .25rem;
      filter: grayscale(100%);
      transition: filter .2s cubic-bezier(.55, .085, .68, .53);
      &:hover {
        filter: none;
      }
    `
    const ProjectImageSm = styling.img `
      display: inline-block;
      width: 50%;
      margin-top: 2rem;
      border-radius: .25rem;
      filter: grayscale(100%);
      transition: filter .2s cubic-bezier(.55, .085, .68, .53);
      &:hover {
        filter: none;
      }
    `
    const ProjectTitle = styling.a `
      display: inline-block;
      padding-top: 1rem;
      font-size: .875rem;
      @media screen and (min-width: 30em) {
        font-size: 1rem;
      };
      text-decoration: none;
      line-height: 1.25;
      color: black;
    `
    const ProjectDescription = styling.small `
      display: block;
      font-size: .875rem;
      color: DarkGray;
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
          <li>Text Adventures</li>
          <li>Difference and Repetition</li>
          <li>Little Free Network</li>
          <li>Human–Computer Interfaces</li>
        </ListOffset3>

        <Bubble>Workshops</Bubble>
        <ul>
          <li>Being a Body, <CollabText>with <NormalLink href="https://callil.com/">Cal</NormalLink> and <NormalLink href="https://sarahhamerman.com/">Sarah</NormalLink></CollabText></li>
          <li>Sightseeing Interfaces</li>
          <li>Dream Studio</li>
        </ul>

        <Bubble3>Courses</Bubble3>
        <Offset1>Current</Offset1>
          <ListOffset1>
            <li>Spring 2018, <NormalLink href="https://csi-18.glitch.me/" target="_blank">Core Studio Interaction</NormalLink>, Parsons</li>
          </ListOffset1>
        <Offset1>Past</Offset1>
          <ListOffset1>
            <li>Prototyping/Design Thinking <NormalLink href="https://www.youtube.com/watch?v=WwfC11NRPfQ" target="_blank">Workshop(s)</NormalLink>, IBM</li>
          </ListOffset1>
      </div>
    )
  }
}

export default WorksTeaching