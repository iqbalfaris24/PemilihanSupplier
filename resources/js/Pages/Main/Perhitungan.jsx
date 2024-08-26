import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Perhitungan({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Perhitungan
                </h2>
            }
        >
            <Head title="Perhitungan" />

            {/* <!-- Begin Page Content --> */}
            <div>Perhitungan</div>
            {/* <!-- /.container-fluid --> */}
        </AuthenticatedLayout>
    );
}
