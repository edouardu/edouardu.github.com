import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'
import styling from 'styled-components'

import HeaderBlog from '../components/HeaderBlog'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    const Wrapper = styling.section `
      max-width: 64rem;
    `
    const PostDate = styling.p `
      opacity: .20;
    `
    const BlogPost = styling.div `
      max-width: 30em;
      font-family: 'georgia';
    `

    return (
      <Wrapper>
        <Helmet title={`${post.frontmatter.title}`} />
        <p>{post.frontmatter.title}</p>
        <PostDate>
          {post.frontmatter.date}
        </PostDate>
        <BlogPost dangerouslySetInnerHTML={{ __html: post.html }} />
      <HeaderBlog />
      </Wrapper>
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
