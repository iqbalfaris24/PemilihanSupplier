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

    const { items, alternatif, kriteria } = usePage().props;
    const options = items.map((item) => ({
        value: item.id,
        label: item.nama_item,
    }));

    const handleSelectChange = (option) => {
        sessionStorage.setItem("selectedOption", JSON.stringify(option)); // Simpan pilihan ke localStorage
        router.visit(`/penilaian?item_id=${option.value}`, {});
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
                    <h1 className="h3 mb-0 text-gray-800">Data Penilaian</h1>
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
                            DAFTAR DATA PERHITUNGAN{" "}
                            <b>{selectedOption?.label}</b>
                        </h6>
                        <h1></h1>
                    </div>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td>Nama Alternatif</td>
                                {kriteria?.map((kriteria) => (
                                    <td key={kriteria.id}>
                                        ({kriteria.kode_kriteria} )
                                        {kriteria.nama_kriteria}
                                    </td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {alternatif?.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        ({item.kode_alternatif}){" "}
                                        {item.nama_alternatif}
                                    </td>
                                    {kriteria?.map((kriteria, index) =>
                                        kriteria.sub_kriteria_status ===
                                        "Ya" ? (
                                            <td>
                                                <select
                                                    key={kriteria.id}
                                                    name={
                                                        kriteria.nama_kriteria
                                                    }
                                                    id=""
                                                >
                                                    {kriteria.sub_kriteria_data.map(
                                                        (subkriteria) => (
                                                            <option
                                                                value={
                                                                    subkriteria.nilai_subKriteria
                                                                }
                                                            >
                                                                {
                                                                    subkriteria.nama_subKriteria
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </td>
                                        ) : (
                                            <td>
                                                <input
                                                    type="text"
                                                    name=""
                                                    id=""
                                                />
                                            </td>
                                        )
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <!-- /.container-fluid --> */}
        </AuthenticatedLayout>
    );
}
