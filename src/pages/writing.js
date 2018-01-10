import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styling from 'styled-components'

import Header from '../components/Header'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = 'Édouard U. — Writing'
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

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
    `
    const Offset1 = styling.p`
      padding-left: 4rem;
    `
    const Offset3 = styling.p`
      padding-left: 2rem;
      @media screen and (min-width: 30em) {
        padding-left: 16rem;
      }
      padding-bottom: 1rem;
    `
    const NormalLink = styling.a`
      color: black;
      text-decoration: underline;
      text-decoration-skip: ink;
    `

    const BlogTitle = styling.p`
      margin-bottom: 0;
    `
    const NiceLink = styling(Link)`
      display: block;
      text-decoration: none;
      color: DarkGray;
      font-family: 'georgia';
      transform: scale(1,1.2);
      -webkit-transform: scale(1,1.2);
    `
    const Date = styling.p`
      font-family: 'arial';
      margin-top: 0;
      font-size: .875rem;
      color: DarkGray;
    `
    const BlogText = styling.p`
      margin-top: 0;
      font-size: 1.25rem;
      max-width: 30em;
      color: DarkGray;
    `

    return (
      <div>        
        <section>
          <Helmet title={`${siteTitle}`} />
          <Bubble>Writing</Bubble>
          <Offset1>On works, process, and other movements.</Offset1> 
          <p>To receive updates via email, <NormalLink href="https://tinyletter.com/edouerd" target="_blank">click here</NormalLink>.</p>
          <Offset3>2016 — Ongoing</Offset3>

          {posts.map(post => {
            if (post.node.path !== '/404/') {
              const title = get(post, 'node.frontmatter.title') || post.node.path
              return (
                <div key={post.node.frontmatter.path}>
                  <BlogTitle>
                    <NiceLink to={post.node.frontmatter.path}>
                      {post.node.frontmatter.title}
                      <Date>{post.node.frontmatter.date}</Date>
                    </NiceLink>
                  </BlogTitle>
                  
                  {/* <BlogText dangerouslySetInnerHTML={{ __html: post.node.excerpt }} /> */}
                </div>
              )
            }
          })}
        <Header />
        </section>
      </div>
    )
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
}

export default BlogIndex
export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`