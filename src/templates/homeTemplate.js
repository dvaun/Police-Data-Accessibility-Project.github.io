import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import homeStyles from "../css/home.module.css"
import BackgroundImage from "gatsby-background-image"

export default function Template(props) {
  const {
    pageContext: { pages, blogposts, events, newsItems },
  } = props
  const { markdownRemark } = props.data
  const { frontmatter, html } = markdownRemark
  const { hero } = frontmatter
  console.log(hero)
  return (
    <Layout pages={pages}>
      <BackgroundImage
        Tag="section"
        className={homeStyles.hero}
        fluid={hero.image.childImageSharp.fluid}
        backgroundColor={`#040e18`}
      >
        {/* <div className={homeStyles.hero}> */}
        <div className={homeStyles.hero__content}>
          <h1 className={homeStyles.hero__title}>{hero.title}</h1>
          <p className={homeStyles.hero__message}>{hero.message}</p>
        </div>
        {/* </div> */}
        <div className={homeStyles.hero__fade}></div>
      </BackgroundImage>
      <section
        className="page__content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        hero {
          title
          message
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
