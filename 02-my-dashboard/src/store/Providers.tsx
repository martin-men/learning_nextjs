'use client'

import { Provider } from "react-redux"
import { store } from "./"

interface props {
  children: React.ReactNode
}

export const Providers = ({ children }: props) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
