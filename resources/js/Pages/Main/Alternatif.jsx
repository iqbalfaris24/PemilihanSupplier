import React, { useEffect, useState } from "react";
import { Head, useForm, usePage, Link, router } from "@inertiajs/react";
import Modal from "@/Components/Modal";
import Selects from "@/Components/Selects";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Alternatif({ auth }) {
    const [selectedOption, setSelectedOption] = useState(() => {
        const savedOption = sessionStorage.getItem("selectedOption");
        return savedOption ? JSON.parse(savedOption) : null;
    });
    const [openModal, setOpenModal] = useState(false);
    const [alternatifToEdit, setAlternatifToEdit] = useState(false);
    const { alternatif } = usePage().props;
    const { item } = usePage().props;
    const currentPage = alternatif?.current_page ?? 0;
    const alternatifPerPage = alternatif?.per_page ?? 0;

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
        kode_alternatif: "",
        nama_alternatif: "",
        telepon: "",
        alamat: "",
    });

    const handleSelectChange = (option) => {
        sessionStorage.setItem("selectedOption", JSON.stringify(option)); // Simpan pilihan ke localStorage
        router.visit(`/alternatif?item_id=${option.value}`, {});
    };

    const closeModal = () => {
        setOpenModal(false);
        setAlternatifToEdit("");
        reset();
    };

    const updateAlternatif = (e) => {
        e.preventDefault();
        patch(route("alternatif.update", data.id));
        reset();
        closeModal();
    };

    const deleteAlternatif = (alternatif) => {
        const confirmation = window.confirm(
            `Apakah Anda yakin ingin menghapus data ${alternatif.nama_alternatif}?`
        );

        if (confirmation) {
            destroy(route("alternatif.destroy", { id: alternatif.id }));
        }
    };

    const addAlternatif = (e) => {
        e.preventDefault();
        post(route("alternatif.store"));
        reset();
        closeModal();
    };
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
            <div className="container-fluid">
                {/* <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Data Alternatif</h1>
                    <Modal
                        show={openModal}
                        onClose={closeModal}
                        alternatifToEdit={alternatifToEdit}
                    >
                        <form className="p-4 border">
                            {alternatifToEdit
                                ? "UBAH DATA ALTERNATIF"
                                : "TAMBAH DATA ALTERNATIF"}
                            <hr className="sidebar-divider" />

                            <div className="form">
                                <div className="mb-2">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Kode Alternatif:
                                    </label>
                                    <input
                                        type="text"
                                        name="kode_alternatif"
                                        placeholder="Kode Alternatif"
                                        value={data.kode_alternatif}
                                        onChange={(e) =>
                                            setData(
                                                "kode_alternatif",
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
                                        Nama Alternatif:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nama Alternatif"
                                        name="nama_alternatif"
                                        value={data.nama_alternatif}
                                        onChange={(e) =>
                                            setData(
                                                "nama_alternatif",
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
                                        Telepon:
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Telepon"
                                        name="telepon"
                                        value={data.telepon}
                                        onChange={(e) =>
                                            setData("telepon", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="mb-2">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Status:
                                    </label>
                                    <textarea
                                        type="text"
                                        className="form-control"
                                        placeholder="Alamat"
                                        name="alamat"
                                        value={data.alamat}
                                        onChange={(e) =>
                                            setData("alamat", e.target.value)
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
                                        if (alternatifToEdit) {
                                            updateAlternatif(
                                                e,
                                                alternatifToEdit
                                            ); // Anda perlu membuat fungsi editItem
                                        } else {
                                            addAlternatif(e);
                                        }
                                    }}
                                >
                                    {alternatifToEdit ? "Update" : "Simpan"}
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
                        <tbody>
                            {/* {alternatif.data} */}
                            {alternatif?.data &&
                            alternatif?.data.length != 0 ? (
                                alternatif?.data?.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>
                                            {index +
                                                1 +
                                                (currentPage - 1) *
                                                    alternatifPerPage}
                                        </td>
                                        <td>{item.kode_alternatif}</td>
                                        <td>{item.nama_alternatif}</td>
                                        <td>{item.telepon}</td>
                                        <td>{item.alamat}</td>
                                        <td>
                                            <div className="aksi">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-warning me-3"
                                                    onClick={() => {
                                                        setData(item);
                                                        setAlternatifToEdit(
                                                            item
                                                        );
                                                        setOpenModal(true); // Anda perlu membuat fungsi openModal
                                                    }}
                                                >
                                                    <i className="fas fa-pencil-alt mx-2"></i>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger"
                                                    onClick={() => {
                                                        deleteAlternatif(item);
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
                                    {alternatif.length === 0 ? (
                                        <td colSpan={6} className="text-center">
                                            <b>Select Item Terlebih Dahulu!</b>
                                        </td>
                                    ) : (
                                        <td colSpan={6} className="text-center">
                                            <b>Data Alternatif Kosong</b>
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
                            {alternatif?.prev_page_url && (
                                <li className="page-item"></li>
                            )}

                            {/* Numbered Links */}
                            {alternatif?.links?.map((link, index) =>
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
                            {alternatif?.next_page_url && (
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
