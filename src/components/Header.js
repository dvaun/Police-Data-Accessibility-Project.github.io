import React from "react"
import Navbar from "./Navbar"

import headerStyles from "../css/header.module.css"

export default function Header({ pages }) {
  return (
    <header className={headerStyles.header}>
      <span className={headerStyles.header__logo}>PDAP</span>
      <Navbar pages={pages} />
    </header>
  )
}
