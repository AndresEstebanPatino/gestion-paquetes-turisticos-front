import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
        <nav>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li> <Link to="/usuarios">Usuarios</Link> </li>
                <li> <Link to="/destinos">Destinos</Link> </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header