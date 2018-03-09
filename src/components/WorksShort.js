import React from 'react'
import styling from 'styled-components'

class WorksShort extends React.Component {
  render() {

    const Bubble = styling.p `
      display: inline-block;
      padding-left: 2rem; padding-right: 2rem;
      padding-top: 1rem; padding-bottom: 1rem;
      margin-left: 2rem;
      @media screen and (min-width: 30em) {
        margin-left: 16rem;
      }
      text-align: center;
      border-style: solid; 
      border-width: .09rem;
      @media screen and (min-width: 30em) {
        border-width: .125rem;
      };
      border-radius: 9999px;
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

    return (
      <div>
        <Bubble>Works</Bubble>
        <Offset1><NormalLink href="https://s3.amazonaws.com/edouard.us/RecentWorks.pdf" target="_blank">RecentWorks.pdf</NormalLink></Offset1>
        <Offset1><NormalLink href="https://www.are.na/edouard-u/sketching" target="_blank">Sketching</NormalLink></Offset1>
        <Offset3>2017 — Ongoing</Offset3>
      </div>
    )
  }
}

export default WorksShort 