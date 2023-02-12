import React from "react"
import { Route } from "react-router-dom"
import NavigationBar from "../NavigationBar"

export default function PublicRoute({ component: Component, ...rest }) {
  return (
    <>
      <NavigationBar />
      <Route
        {...rest}
        render={props => {
          return <Component {...props} />
        }}
      ></Route>
    </>
  )
}
