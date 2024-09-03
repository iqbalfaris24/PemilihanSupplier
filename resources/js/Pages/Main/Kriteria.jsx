import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, Link, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import Selects from "@/Components/Selects";

export default function Kriteria({ auth, option }) {
    const [selectedOption, setSelectedOption] = useState(() => {
        const savedOption = sessionStorage.getItem("selectedOption");
        return savedOption ? JSON.parse(savedOption) : null;
    });
    const [openModal, setOpenModal] = useState(false);
    const [kriteriaToEdit, setKriteriaToEdit] = useState(false);
    const { kriteria } = usePage().props;
    const { item } = usePage().props;
    const currentPage = kriteria?.current_page ?? 0;
    const kriteriaPerPage = kriteria?.per_page ?? 0;

    const options = item.map((item) => ({
        value: item.id,
        label: item.nama_item,
    }));

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
        item_id: selectedOption?.value,
        kode_kriteria: "",
        nama_kriteria: "",
        sub_kriteria_status: "Ya",
        sub_kriteria_data: [],
        status: "Benefit",
    });

    const handleSelectChange = (option) => {
        sessionStorage.setItem("selectedOption", JSON.stringify(option)); // Simpan pilihan ke localStorage
        router.visit(`/kriteria?item_id=${option.value}`, {});
    };

    const closeModal = () => {
        setOpenModal(false);
        setKriteriaToEdit("");
        reset();
    };

    const updateKriteria = (e) => {
        e.preventDefault();
        patch(route("kriteria.update", data.id));
        reset();
        closeModal();
    };

    const deleteKriteria = (kriteria) => {
        const confirmation = window.confirm(
            `Apakah Anda yakin ingin menghapus data ${kriteria.nama_kriteria}?`
        );

        if (confirmation) {
            destroy(route("kriteria.destroy", { id: kriteria.id }));
        }
    };

    const addKriteria = (e) => {
        e.preventDefault();
        post(route("kriteria.store"));
        reset();
        closeModal();
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Kriteria
                </h2>
            }
        >
            <Head title="Kriteria" />

            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">
                {/* <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Data Kriteria</h1>
                    <Modal
                        show={openModal}
                        onClose={closeModal}
                        kriteriaToEdit={kriteriaToEdit}
                    >
                        <form className="p-4 border">
                            {kriteriaToEdit
                                ? "UBAH DATA KRITERIA"
                                : "TAMBAH DATA KRITERIA"}
                            <hr className="sidebar-divider" />

                            <div className="form">
                                <div className="mb-2">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Kode Kriteria:
                                    </label>
                                    <input
                                        type="text"
                                        name="kode_kriteria"
                                        placeholder="Kode Kriteria"
                                        value={data.kode_kriteria}
                                        onChange={(e) =>
                                            setData(
                                                "kode_kriteria",
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
                                        Nama Kriteria:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nama Kriteria"
                                        name="nama_kriteria"
                                        value={data.nama_kriteria}
                                        onChange={(e) =>
                                            setData(
                                                "nama_kriteria",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div className="mb-2">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Punya Sub Kriteria:
                                    </label>
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex overflow-hidden border rounded">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        "sub_kriteria_status",
                                                        "Ya"
                                                    )
                                                }
                                                style={{
                                                    backgroundColor:
                                                        data.sub_kriteria_status ===
                                                        "Ya"
                                                            ? "#28a745"
                                                            : "#f8f9fa",

                                                    color:
                                                        data.sub_kriteria_status ===
                                                        "Ya"
                                                            ? "#fff"
                                                            : "#000",
                                                    border: "none",
                                                    padding: "10px 20px",
                                                    cursor: "pointer",
                                                    outline: "none",
                                                }}
                                            >
                                                Ya
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        "sub_kriteria_status",
                                                        null
                                                    )
                                                }
                                                style={{
                                                    backgroundColor:
                                                        data.sub_kriteria_status ===
                                                        null
                                                            ? "#E95C4F"
                                                            : "#ffffff",
                                                    color:
                                                        data.sub_kriteria_status ===
                                                        null
                                                            ? "#fff"
                                                            : "#6c757d",
                                                    border: "none",
                                                    padding: "10px 20px",
                                                    cursor: "pointer",
                                                    outline: "none",
                                                }}
                                            >
                                                Tidak
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Status:
                                    </label>
                                    <div className="d-flex align-items-center">
                                        <div className="d-flex overflow-hidden border rounded">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData("status", "Benefit")
                                                }
                                                style={{
                                                    backgroundColor:
                                                        data.status ===
                                                        "Benefit"
                                                            ? "#28a745"
                                                            : "#f8f9fa",
                                                    color:
                                                        data.status ===
                                                        "Benefit"
                                                            ? "#fff"
                                                            : "#000",
                                                    border: "none",
                                                    padding: "10px 20px",
                                                    cursor: "pointer",
                                                    outline: "none",
                                                }}
                                            >
                                                Benefit
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData("status", "Cost")
                                                }
                                                style={{
                                                    backgroundColor:
                                                        data.status === "Cost"
                                                            ? "#E95C4F"
                                                            : "#ffffff",
                                                    color:
                                                        data.status === "Cost"
                                                            ? "#fff"
                                                            : "#6c757d",
                                                    border: "none",
                                                    padding: "10px 20px",
                                                    cursor: "pointer",
                                                    outline: "none",
                                                }}
                                            >
                                                Cost
                                            </button>
                                        </div>
                                    </div>
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
                                        if (kriteriaToEdit) {
                                            updateKriteria(e, kriteriaToEdit); // Anda perlu membuat fungsi editItem
                                        } else {
                                            addKriteria(e);
                                        }
                                    }}
                                >
                                    {kriteriaToEdit ? "Update" : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </Modal>
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
                            DAFTAR DATA KRITERIA <b>{selectedOption?.label}</b>
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
                                <td>Kode Kriteria</td>
                                <td>Nama Kriteria</td>
                                <td>Sub Kriteria</td>
                                <td>Status</td>
                                <td>Aksi</td>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {kriteria.data} */}
                            {kriteria?.data && kriteria?.data.length != 0 ? (
                                kriteria?.data?.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>
                                            {index +
                                                1 +
                                                (currentPage - 1) *
                                                    kriteriaPerPage}
                                        </td>
                                        <td>{item.kode_kriteria}</td>
                                        <td>{item.nama_kriteria}</td>
                                        <td>
                                            {item.sub_kriteria_status ===
                                            "Ya" ? (
                                                <Link
                                                    className="text-primary"
                                                    href={route(
                                                        "kriteria.show",
                                                        {
                                                            id: item.id,
                                                        }
                                                    )}
                                                >
                                                    <span>
                                                        Kelola Sub Kriteria
                                                    </span>
                                                </Link>
                                            ) : (
                                                <span className="text-danger">
                                                    N/A
                                                </span>
                                            )}
                                        </td>
                                        <td
                                            className={`${
                                                item.status === "Cost"
                                                    ? `text-danger`
                                                    : `text-success`
                                            }`}
                                        >
                                            {item.status}
                                        </td>
                                        <td>
                                            <div className="aksi">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-warning me-3"
                                                    onClick={() => {
                                                        setData(item);
                                                        setKriteriaToEdit(item);
                                                        setOpenModal(true); // Anda perlu membuat fungsi openModal
                                                    }}
                                                >
                                                    <i className="fas fa-pencil-alt mx-2"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() => {
                                                        deleteKriteria(item);
                                                    }}
                                                >
                                                    <i className="fas fa-trash mx-2"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    {kriteria.length === 0 ? (
                                        <td colSpan={6} className="text-center">
                                            <b>Select Item Terlebih Dahulu!</b>
                                        </td>
                                    ) : (
                                        <td colSpan={6} className="text-center">
                                            <b>Data Kriteria Kosong</b>
                                        </td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Navigation */}
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            {/* Previous Link */}
                            {kriteria?.prev_page_url && (
                                <li className="page-item"></li>
                            )}

                            {/* Numbered Links */}
                            {kriteria?.links?.map((link, index) =>
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
                            {kriteria?.next_page_url && (
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
