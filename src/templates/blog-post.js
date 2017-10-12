import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import styled from 'tachyons-components'

import HeaderBlog from '../components/HeaderBlog'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    const Content = styled('section')`
      center w-80 mw8 mv5 pb5 f6 f3-ns f2-xl
    `
    const BlogTitle = styled('p')`
      lh-copy pl2
    `
    const PostDate = styled('p')`
      lh-copy pl2 silver
    `
    const BlogPost = styled('div')`
      lh-copy measure georgia pl2
    `

    return (
      <Content>
        <Helmet title={`${post.frontmatter.title}`} />
        <BlogTitle>{post.frontmatter.title}</BlogTitle>
        <PostDate>
          {post.frontmatter.date}
        </PostDate>
        <BlogPost dangerouslySetInnerHTML={{ __html: post.html }} />
        <HeaderBlog />
      </Content>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
