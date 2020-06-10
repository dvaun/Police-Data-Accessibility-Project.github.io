import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/Layout"

export default function Template(props) {
  const {
    pageContext: { pages, newsItems },
  } = props
  const { markdownRemark } = props.data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout pages={pages}>
      <div className="event">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <section
          className="news-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        {frontmatter.slug.includes("/news") && (
          <>
            <h2>News</h2>
            <nav>
              {newsItems.map(event => {
                return (
                  <Link key={event.path} to={event.path}>
                    {event.title}
                  </Link>
                )
              })}
            </nav>
          </>
        )}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`
