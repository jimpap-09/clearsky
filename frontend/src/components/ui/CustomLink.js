import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function CustomLink({ to, children }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <Link to={to} className={isActive ? "active" : ""}>
      {children}
    </Link>
  )
}