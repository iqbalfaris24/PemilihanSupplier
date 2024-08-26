import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
export default function Alternatif({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Alternatif
                </h2>
            }
        >
            <Head title="Alternatif" />

            {/* <!-- Begin Page Content --> */}
            <div>Alternatif</div>
            {/* <!-- /.container-fluid --> */}
        </AuthenticatedLayout>
    );
}
