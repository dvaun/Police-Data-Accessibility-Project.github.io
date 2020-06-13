import React from "react"
import Navbar from "./Navbar"
import { Link } from "gatsby"
import headerStyles from "../css/header.module.css"
import logo from "../assets/pdap_full_lockup_final.svg"

export default function Header({ pages }) {
  return (
    <header className={headerStyles.header}>
      <Link to="/" className={headerStyles.header__logo}>
        <img className={headerStyles.header__logo__image} src={logo} alt="" />
      </Link>
      <Navbar pages={pages} />
    </header>
  )
}

Header.defaultProps = {
  pages: [],
}
