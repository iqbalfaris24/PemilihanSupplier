import React, { useState } from "react";
import { Head, useForm, usePage, Link, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import Selects from "@/Components/Selects";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Penilaian({ auth }) {
    const [selectedOption, setSelectedOption] = useState(() => {
        const savedOption = sessionStorage.getItem("selectedOption");
        return savedOption ? JSON.parse(savedOption) : null;
    });

    const { items } = usePage().props;
    // console.log(usePage().props);

    const options = items.map((item) => ({
        value: item.id,
        label: item.nama_item,
    }));

    const handleSelectChange = (option) => {
        sessionStorage.setItem("selectedOption", JSON.stringify(option)); // Simpan pilihan ke localStorage
        router.visit(`/penilaian?item_id=${option.value}`, {});
        console.log(usePage().props);
    };

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
            <div className="container-fluid">
                {/* <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Data Alternatif</h1>
                </div>
                <div className="col-3 mb-4 p-0">
                    <Selects
                        placeholder="Pilih Item"
                        options={options}
                        onChange={handleSelectChange}
                        defaultValue={selectedOption}
                    ></Selects>
                </div>
                {/* Page Main */}
                <div className=" bg-white p-6">
                    <div className="main-heading d-flex justify-content-between mb-3">
                        <h6 className="text-uppercase">
                            DAFTAR DATA ALTERNATIF{" "}
                            <b>{selectedOption?.label}</b>
                        </h6>
                        {selectedOption != null && (
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => setOpenModal(true)}
                            >
                                + Tambah Data
                            </button>
                        )}
                    </div>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td>No</td>
                                <td>Kode Alternatif</td>
                                <td>Nama Alternatif</td>
                                <td>Telepon</td>
                                <td>Alamat</td>
                                <td>Aksi</td>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            {/* <!-- /.container-fluid --> */}
        </AuthenticatedLayout>
    );
}
