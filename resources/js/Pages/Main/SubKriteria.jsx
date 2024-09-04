import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import { Inertia } from "@inertiajs/inertia";

export default function SubKriteria({ auth }) {
    const { kriteria } = usePage().props;
    const { subKriteria } = usePage().props;
    console.log(subKriteria);

    const [subKriteriaData, setSubKriteriaData] = useState(subKriteria);

    const addSubKriteria = () => {
        const newSubKriteria = {
            nama_subKriteria: "",
            nilai_subKriteria: "",
        };

        setSubKriteriaData([...subKriteriaData, newSubKriteria]);
    };

    const handleInputChange = (index, field, value) => {
        const updatedData = subKriteriaData.map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setSubKriteriaData(updatedData);
    };

    const saveSubKriteria = (e) => {
        Inertia.patch(route("kriteria.update", kriteria.id), {
            id: kriteria.id,
            sub_kriteria_data: subKriteriaData,
        });
    };

    const deleteSubKriteria = (indexToDelete) => {
        setSubKriteriaData(
            subKriteriaData.filter((_, index) => index !== indexToDelete)
        );
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Sub Kriteria
                </h2>
            }
        >
            <Head title="Sub Kriteria" />

            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">
                {/* <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <button
                        className="nav-link"
                        onClick={() => window.history.back()}
                    >
                        <i className="fas fa-chevron-left"></i>
                        <span> Back</span>
                    </button>
                    <h1 className="h3 mb-0 text-gray-800">
                        Data Sub Kriteria <b>{kriteria.nama_kriteria}</b>
                    </h1>
                    <h1>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => {
                                saveSubKriteria();
                            }}
                        >
                            <i className="fas fa-save mx-2"></i>
                        </button>
                    </h1>
                </div>

                {/* Page Main */}
                <div className=" bg-white p-6">
                    <div className="main-heading">
                        <h6>DAFTAR DATA SUB KRITERIA</h6>
                    </div>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td>No</td>
                                <td>Nama Sub Kriteria</td>
                                <td>Nilai Sub Kriteria</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {subKriteriaData?.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.nama_subKriteria || ""}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "nama_subKriteria",
                                                    e.target.value
                                                )
                                            }
                                        />{" "}
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={item.nilai_subKriteria || ""}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "nilai_subKriteria",
                                                    e.target.value
                                                )
                                            }
                                        />{" "}
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            onClick={() => {
                                                deleteSubKriteria(index);
                                            }}
                                        >
                                            <i className="fas fa-trash mx-2"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan={4} className="text-center">
                                    <button
                                        type="button"
                                        className="btn btn-success"
                                        onClick={() => addSubKriteria()}
                                    >
                                        + Tambah Data
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <!-- /.container-fluid --> */}
        </AuthenticatedLayout>
    );
}
