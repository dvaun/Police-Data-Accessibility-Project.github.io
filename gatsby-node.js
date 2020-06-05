exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const pageTemplate = require.resolve(`./src/templates/pageTemplate.js`)
  const eventTemplate = require.resolve(`./src/templates/eventTemplate.js`)
  const newsItemTemplate = require.resolve(
    `./src/templates/newsItemTemplate.js`
  )
  const blogpostTemplate = require.resolve(
    `./src/templates/blogpostTemplate.js`
  )

  // get pages and blog posts
  const result = await graphql(`
    {
      pages: allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___order] }
        limit: 1000
        filter: { frontmatter: { type: { eq: "page" } } }
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
            }
          }
        }
      }
      blogposts: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
        filter: { frontmatter: { type: { eq: "blogpost" } } }
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
            }
          }
        }
      }
      events: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
        filter: { frontmatter: { type: { eq: "event" } } }
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
            }
          }
        }
      }
      newsItems: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
        filter: { frontmatter: { type: { eq: "news-item" } } }
      ) {
        edges {
          node {
            frontmatter {
              slug
              title
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // page array for nav
  const pages = result.data.pages.edges.map(({ node }) => {
    return { path: node.frontmatter.slug, title: node.frontmatter.title }
  })

  // blogpost array for blog post nav
  const blogposts = result.data.blogposts.edges.map(({ node }) => {
    return { path: node.frontmatter.slug, title: node.frontmatter.title }
  })

  // events array for event nav
  const events = result.data.events.edges.map(({ node }) => {
    return { path: node.frontmatter.slug, title: node.frontmatter.title }
  })

  // news items array for news nav
  const newsItems = result.data.newsItems.edges.map(({ node }) => {
    return { path: node.frontmatter.slug, title: node.frontmatter.title }
  })

  // build pages
  result.data.pages.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: pageTemplate,
      context: {
        slug: node.frontmatter.slug,
        pages,
        blogposts,
        events,
        newsItems,
      },
    })
  })

  // build blog posts
  result.data.blogposts.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: blogpostTemplate,
      context: {
        slug: node.frontmatter.slug,
        pages,
        blogposts,
      },
    })
  })

  // build events
  result.data.events.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: eventTemplate,
      context: {
        slug: node.frontmatter.slug,
        pages,
        events,
      },
    })
  })

  // build news items
  result.data.newsItems.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: newsItemTemplate,
      context: {
        slug: node.frontmatter.slug,
        pages,
        newsItems,
      },
    })
  })
}
