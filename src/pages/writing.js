import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import styled from 'tachyons-components'

import Header from '../components/Header'

class BlogIndex extends React.Component {
  render() {
    
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    // Misc Components
    const Content = styled('section')`
      center w-80 mw8 mv5 pb5 f6 f3-ns f2-xl
    `
    const Bubble = styled('p')`
      lh-copy ph4 pv3 tc ba br-pill bw1 dib
    `
    const Offset1 = styled('p')`
      lh-copy pl5
    `
    const Offset2 = styled('p')`
      lh-copy pl2
    `
    const Offset3 = styled('p')`
      lh-copy pl4 pl7-ns pb3
    `
    const NormalLink = styled('a')`
      black link underline
    `
    // Blog List Components
    const BlogTitle = styled('p')`
      lh-copy pl2 mb0
    `
    const NiceLink = styled(Link)`
      link georgia silver db;
      transform: scale(1,1.2);
      -webkit-transform: scale(1,1.2);
    `
    const Date = styled('p')`
      lh-copy sans-serif mt0 f6 silver
    `
    const BlogText = styled('p')`
      lh-copy pl2 mt0 f4 measure mid-gray
    `
    return (
      <div>        
        <Content>
        <Bubble>Writing</Bubble>
        <Offset1>On works<span class="serif">,</span> process<span class="serif">,</span> and other movements<span class="serif">.</span></Offset1> 
        <Offset2>To receive updates via email<span class="serif">,</span> <NormalLink href="https://tinyletter.com/edouerd" target="_blank">click here</NormalLink><span class="serif">.</span></Offset2>
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
        </Content>
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