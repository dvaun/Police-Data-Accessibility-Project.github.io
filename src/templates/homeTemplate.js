import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import homeStyles from "../css/home.module.css"
import BackgroundImage from "gatsby-background-image"
import heroImage from "../assets/pdap_logo_final_gray.svg"

export default function Template(props) {
  const {
    pageContext: { pages },
  } = props
  const { markdownRemark } = props.data
  const { frontmatter, html } = markdownRemark
  const { hero, sections } = frontmatter
  return (
    <Layout pages={pages}>
      {/* <BackgroundImage
        Tag="section"
        className={homeStyles.hero}
        fluid={hero.background.childImageSharp.fluid}
        backgroundColor={`#040e18`}
      > */}
      <div className={homeStyles.hero}>
        <img className={homeStyles.hero__image} src={heroImage} alt="" />
        <div className={homeStyles.hero__content}>
          <h1 className={homeStyles.hero__title}>{hero.title}</h1>
          <p className={homeStyles.hero__message}>{hero.message}</p>
          <div className={homeStyles.hero__links}>
            {hero.links.map(link => {
              return (
                <Link className="button" to={link.to}>
                  {link.link}
                </Link>
              )
            })}
          </div>
        </div>
        {/* <div className={homeStyles.hero__fade}></div> */}
      </div>
      {/* </BackgroundImage> */}
      <div className={homeStyles.content}>
        {sections.map(section => {
          return (
            <section
              className={`${homeStyles.section} ${
                homeStyles[`section__${section.columns}`]
              }`}
            >
              <h1 className={homeStyles.section__title}>{section.title}</h1>
              <div className={homeStyles.section__items}>
                {section.items.map(sectionItem => {
                  return (
                    <div className={homeStyles.section__item}>
                      <p className={homeStyles.section__item__content}>
                        {sectionItem.content}
                      </p>
                    </div>
                  )
                })}
              </div>
              {section.links && (
                <div className={homeStyles.section__links}>
                  {section.links.map(link => {
                    return (
                      <Link className="button" to={link.to}>
                        {link.link}
                      </Link>
                    )
                  })}
                </div>
              )}
            </section>
          )
        })}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        sections {
          title
          columns
          items {
            content
          }
          links {
            link
            to
          }
        }
        hero {
          title
          message
          links {
            link
            to
          }
          background {
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
