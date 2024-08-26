import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import Modal from "@/Components/Modal";

export default function SubKriteria({ auth }) {
    const [openModal, setOpenModal] = useState(false);
    const [subKriteriaToEdit, setSubKriteriaToEdit] = useState(false);
    const { kriteria } = usePage().props;
    const { subKriteria } = usePage().props;
    const currentPage = subKriteria.current_page;
    const subKriteriaPerPage = subKriteria.per_page;

    const {
        data,
        setData,
        post,
        patch,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        kriteria_id: kriteria.id,
        nama_subKriteria: "",
        nilai_subKriteria: "",
    });

    const closeModal = () => {
        setOpenModal(false);
        setSubKriteriaToEdit("");
        reset();
    };

    const addSubKriteria = (e) => {
        e.preventDefault();
        post(route("subKriteria.store"));
        reset();
        closeModal();
    };

    const updateSubKriteria = (e) => {
        e.preventDefault();
        patch(route("subKriteria.update", data.id));
        reset();
        closeModal();
    };

    const deleteSubKriteria = (subKriteria) => {
        const confirmation = window.confirm(
            `Apakah Anda yakin ingin menghapus data ${subKriteria.nama_subKriteria}?`
        );

        if (confirmation) {
            destroy(route("subKriteria.destroy", { id: subKriteria.id }));
        }
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
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => setOpenModal(true)}
                    >
                        + Tambah Sub Kriteria
                    </button>
                    <Modal
                        show={openModal}
                        onClose={closeModal}
                        subKriteriaToEdit={subKriteriaToEdit}
                    >
                        <form className="p-4 border">
                            {subKriteriaToEdit
                                ? "UBAH DATA SUB KRITERIA"
                                : "TAMBAH DATA SUB KRITERIA"}
                            <hr className="sidebar-divider" />

                            <div className="form">
                                <div className="mb-2">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Nama Sub Kriteria:
                                    </label>
                                    <input
                                        type="text"
                                        name="nama_subKriteria"
                                        placeholder="Nama Sub Kriteria"
                                        value={data.nama_subKriteria}
                                        onChange={(e) =>
                                            setData(
                                                "nama_subKriteria",
                                                e.target.value
                                            )
                                        }
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Nilai Sub Kriteria:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nilai Sub Kriteria"
                                        name="nilai_subKriteria"
                                        value={data.nilai_subKriteria}
                                        onChange={(e) =>
                                            setData(
                                                "nilai_subKriteria",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="button d-flex justify-content-end gap-4">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger"
                                    onClick={() => closeModal()}
                                >
                                    Tutup
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-success"
                                    onClick={(e) => {
                                        if (subKriteriaToEdit) {
                                            updateSubKriteria(
                                                e,
                                                subKriteriaToEdit
                                            ); // Anda perlu membuat fungsi editItem
                                        } else {
                                            addSubKriteria(e);
                                        }
                                    }}
                                >
                                    {subKriteriaToEdit ? "Update" : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </Modal>
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
                                <td>Aksi</td>
                            </tr>
                        </thead>
                        <tbody>
                            {subKriteria.data.map((item, index) => (
                                <tr key={item.id}>
                                    <td>
                                        {index +
                                            1 +
                                            (currentPage - 1) *
                                                subKriteriaPerPage}
                                    </td>
                                    <td>{item.nama_subKriteria}</td>
                                    <td>{item.nilai_subKriteria}</td>
                                    <td>
                                        <div className="aksi">
                                            <button
                                                type="button"
                                                className="btn btn-outline-warning me-3"
                                                onClick={() => {
                                                    setData(item);
                                                    setSubKriteriaToEdit(item);
                                                    setOpenModal(true); // Anda perlu membuat fungsi openModal
                                                }}
                                            >
                                                <i className="fas fa-pencil-alt mx-2"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={() => {
                                                    deleteSubKriteria(item);
                                                }}
                                            >
                                                <i className="fas fa-trash mx-2"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Navigation */}
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            {/* Previous Link */}
                            {subKriteria.prev_page_url && (
                                <li className="page-item"></li>
                            )}

                            {/* Numbered Links */}
                            {subKriteria.links.map((link, index) =>
                                link.url ? (
                                    <li
                                        key={index}
                                        className={`page-item ${
                                            link.active ? "active" : ""
                                        }`}
                                    >
                                        <Link
                                            className="page-link"
                                            href={link.url}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    </li>
                                ) : null
                            )}

                            {/* Next Link */}
                            {subKriteria.next_page_url && (
                                <li className="page-item"></li>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
            {/* <!-- /.container-fluid --> */}
        </AuthenticatedLayout>
    );
}
