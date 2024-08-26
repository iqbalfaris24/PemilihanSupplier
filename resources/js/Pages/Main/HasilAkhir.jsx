import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function HasilAkhir({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    HasilAkhir
                </h2>
            }
        >
            <Head title="HasilAkhir" />

            {/* <!-- Begin Page Content --> */}
            <div>HasilAkhir</div>
            {/* <!-- /.container-fluid --> */}
        </AuthenticatedLayout>
    );
}
