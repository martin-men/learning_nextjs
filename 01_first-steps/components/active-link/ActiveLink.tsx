'use client'

import Link from "next/link"
import style from "./ActiveLink.module.css"
import { usePathname } from "next/navigation"

interface props {
  path: string,
  label: string
}

export const ActiveLink = ({ path, label }: props) => {

  const pathname = usePathname()

  return (
    <Link key={path} href={path} className={style.link + ' ' + (pathname === path ? style['active-link'] : '')}>{label}</Link>
  )
}
