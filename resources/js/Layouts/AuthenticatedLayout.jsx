import { useEffect } from "react";
import Profile from "../../img/undraw_profile.svg";
import NavLink from "@/Components/NavLink";
import { Link, usePage } from "@inertiajs/react";

export default function Authenticated({ user, header, children }) {
    const active = header.props.children;
    const { url } = usePage(); // Mendapatkan URL saat ini

    useEffect(() => {
        // Menghapus session jika URL berubah dari halaman "kriteria"
        if (!url.includes("kriteria")) {
            sessionStorage.removeItem("selectedOption");
        }
    }, [url]); // Effect ini akan berjalan setiap kali URL berubah
    return (
        <div id="wrapper">
            {/* <!-- Sidebar --> */}
            <ul
                className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                id="accordionSidebar"
            >
                {/* <!-- Sidebar - Brand --> */}
                <a
                    className="sidebar-brand d-flex align-items-center justify-content-center"
                    href={route("dashboard")}
                >
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">
                        SB Admin <sup>2</sup>
                    </div>
                </a>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/* <!-- Nav Item - Dashboard --> */}
                <li
                    className={`nav-item ${
                        active === "Dashboard" ? "active" : ""
                    }`}
                >
                    <NavLink href={route("dashboard")}>Dashboard</NavLink>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/* <!-- Heading --> */}
                <div className="sidebar-heading">Master Data</div>

                <li className={`nav-item ${active === "Item" ? "active" : ""}`}>
                    <Link className="nav-link" href={route("item")}>
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Kelola Item</span>
                    </Link>
                </li>

                <li
                    className={`nav-item ${
                        active === "Kriteria" || active === "Sub Kriteria"
                            ? "active"
                            : ""
                    }`}
                >
                    <Link className="nav-link" href={route("kriteria")}>
                        <i className="fas fa-fw fa-table"></i>
                        <span>Kelola Kriteria</span>
                    </Link>
                </li>

                <li
                    className={`nav-item ${
                        active === "Alternatif" ? "active" : ""
                    }`}
                >
                    <Link className="nav-link" href={route("alternatif")}>
                        <i className="fas fa-fw fa-table"></i>
                        <span>Kelola Alternatif</span>
                    </Link>
                </li>
                <li
                    className={`nav-item ${
                        active === "Penilaian" ? "active" : ""
                    }`}
                >
                    <Link className="nav-link" href={route("penilaian")}>
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Penilaian</span>
                    </Link>
                </li>

                <li
                    className={`nav-item ${
                        active === "Perhitungan" ? "active" : ""
                    }`}
                >
                    <Link className="nav-link" href={route("perhitungan")}>
                        {" "}
                        <i className="fas fa-fw fa-table"></i>
                        <span>Perhitungan</span>
                    </Link>
                </li>
                <li
                    className={`nav-item ${
                        active === "HasilAkhir" ? "active" : ""
                    }`}
                >
                    <Link className="nav-link" href={route("hasil-akhir")}>
                        {" "}
                        <i className="fas fa-fw fa-chart-area"></i>
                        <span>Hasil Akhir</span>
                    </Link>
                </li>
            </ul>
            {/* <!-- End of Sidebar --> */}

            {/* Content */}
            <div id="content-wrapper" className="d-flex flex-column">
                {/* <!-- Topbar --> */}
                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                    {/* <!-- Sidebar Toggle (Topbar) --> */}
                    <button
                        id="sidebarToggleTop"
                        className="btn btn-link d-md-none rounded-circle mr-3"
                    >
                        <i className="fa fa-bars"></i>
                    </button>

                    {/* <!-- Topbar Navbar --> */}
                    <ul className="navbar-nav ml-auto">
                        <div className="topbar-divider d-none d-sm-block"></div>

                        {/* <!-- Nav Item - User Information --> */}
                        <li className="nav-item dropdown no-arrow">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="userDropdown"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                                    {user.name}
                                </span>
                                <img
                                    className="img-profile rounded-circle"
                                    src={Profile}
                                />
                            </a>
                            {/* <!-- Dropdown - User Information --> */}
                            <div
                                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                aria-labelledby="userDropdown"
                            >
                                <Link
                                    className="dropdown-item"
                                    href={route("profile.edit")}
                                >
                                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                                </Link>
                                <Link
                                    className="dropdown-item"
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                >
                                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                                </Link>
                            </div>
                        </li>
                    </ul>
                </nav>
                {/* <!-- End of Topbar --> */}
                <div id="content">{children}</div>
            </div>
        </div>
    );
}
