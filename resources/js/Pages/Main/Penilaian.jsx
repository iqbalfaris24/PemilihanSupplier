import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Penilaian({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Penilaian
                </h2>
            }
        >
            <Head title="Penilaian" />

            {/* <!-- Begin Page Content --> */}
            <div>Penilaian</div>
            {/* <!-- /.container-fluid --> */}
        </AuthenticatedLayout>
    );
}
