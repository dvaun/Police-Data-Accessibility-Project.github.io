import React from "react"
import { Link } from "gatsby"

import navStyles from "../css/nav.module.css"

export default function Navbar({ pages }) {
  return (
    <nav className={navStyles.nav}>
      <ul className={navStyles.nav__menu}>
        {pages
          // .filter(pageToFilter => pageToFilter.path !== "/")
          .map(page => {
            return (
              <li key={page.path} className={navStyles.nav__item}>
                <Link
                  activeClassName={navStyles.nav__link__active}
                  partiallyActive={page.path !== "/" ? true : false}
                  className={navStyles.nav__link}
                  to={page.path}
                >
                  {page.title}
                </Link>
              </li>
            )
          })}
      </ul>
    </nav>
  )
}

Navbar.defaultProps = {
  pages: [],
}
