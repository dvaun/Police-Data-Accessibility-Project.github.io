import React from "react"
import Navbar from "./Navbar"
import { Link } from "gatsby"
import headerStyles from "../css/header.module.css"

export default function Header({ pages }) {
  return (
    <header className={headerStyles.header}>
      <Link to="/" className={headerStyles.header__logo}>
        PDAP
      </Link>
      <Navbar pages={pages} />
    </header>
  )
}

Header.defaultProps = {
  pages: [],
}
