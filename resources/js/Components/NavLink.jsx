import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <Link {...props} className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span> {children}</span>
        </Link>
    );
}
