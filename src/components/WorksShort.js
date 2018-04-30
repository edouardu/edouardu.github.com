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

    return (
      <div>
        <Bubble>Works</Bubble>
        <Offset1><NormalLink href="https://s3.amazonaws.com/edouard.us/RecentWorks.pdf" target="_blank">RecentWorks.pdf</NormalLink></Offset1>
        <Offset1><NormalLink href="https://www.are.na/edouard-u/sketching" target="_blank">Sketching and In-progress</NormalLink></Offset1>
        <Offset3>2017 — Ongoing</Offset3>
      </div>
    )
  }
}

export default WorksShort 