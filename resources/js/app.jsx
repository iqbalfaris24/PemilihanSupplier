import "../vendor/jquery/jquery";
import "./bootstrap";
import "../css/sb-admin-2.min.css";
import "../vendor/fontawesome-free/css/all.min.css";
import "../vendor/bootstrap/js/bootstrap.bundle";
import "../js/Depedencies/sb-admin-2.min.js";
import "../css/app.css";
import "../css/custom.css";

import $ from "jquery"; // Import jQuery

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
