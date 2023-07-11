import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg bg-primary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/main">
          Postgraduate Application
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/currentfcps">
                Current FCPS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/previousfcps">
                Previous FCPS
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/supervisor">
                Supervisor
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/depart">
                Unit
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Reports
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={"/allpgreport"}>
                    All FCPS PG Reports
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Year Wise Reports
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
