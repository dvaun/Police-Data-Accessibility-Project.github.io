import React from "react"
import Header from "../components/Header"
import "../css/main.css"
import { StaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

export default function Layout(props) {
  return (
    <StaticQuery
      query={graphql`
        query siteMetadata {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{data.site.siteMetadata.title}</title>
          </Helmet>
          <Header pages={props.pages} />
          <main className="container">{props.children}</main>
        </div>
      )}
    />
  )
}

Layout.defaultProps = {
  pages: [],
  title: "Title",
  children: null,
}
