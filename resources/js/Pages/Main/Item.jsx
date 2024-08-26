import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage, Link } from "@inertiajs/react";
import Modal from "@/Components/Modal";

export default function Item({ auth }) {
    const [openModal, setOpenModal] = useState(false);
    const [itemToEdit, setItemToEdit] = useState("");
    const { items } = usePage().props;
    const currentPage = items.current_page;
    const itemsPerPage = items.per_page;
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
        kode_item: "",
        nama_item: "",
    });

    const closeModal = () => {
        setOpenModal(false);
        setItemToEdit("");
        reset();
    };

    const addItem = (e) => {
        e.preventDefault();
        post(route("item.store"));
        reset();
        closeModal();
    };

    const updateItem = (e) => {
        e.preventDefault();
        patch(route("item.update", itemToEdit.id));
        reset();
        closeModal();
    };

    const deleteItem = (item) => {
        const confirmation = window.confirm(
            `Apakah Anda yakin ingin menghapus data ${item.nama_item}?`
        );

        if (confirmation) {
            destroy(route("item.destroy", { id: item.id }));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Item
                </h2>
            }
        >
            <Head title="Item" />

            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">
                {/* <!-- Page Heading --> */}
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Data Item</h1>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => setOpenModal(true)}
                    >
                        + Tambah Data
                    </button>
                    <Modal
                        show={openModal}
                        onClose={closeModal}
                        itemToEdit={itemToEdit}
                    >
                        <form className="p-4 border">
                            {itemToEdit ? "UBAH DATA ITEM" : "TAMBAH DATA ITEM"}
                            <hr className="sidebar-divider" />

                            <div className="form">
                                <div className="mb-2">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Kode Item
                                    </label>
                                    <input
                                        type="text"
                                        name="kode_item"
                                        placeholder="Kode Item"
                                        value={
                                            data.kode_item ||
                                            (itemToEdit
                                                ? itemToEdit.kode_item
                                                : "")
                                        }
                                        onChange={(e) =>
                                            setData("kode_item", e.target.value)
                                        }
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        htmlFor="exampleFormControlInput1"
                                        className="form-label"
                                    >
                                        Nama Item
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nama Item"
                                        name="nama_item"
                                        value={
                                            data.nama_item ||
                                            (itemToEdit
                                                ? itemToEdit.nama_item
                                                : "")
                                        }
                                        onChange={(e) =>
                                            setData("nama_item", e.target.value)
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
                                        if (itemToEdit) {
                                            updateItem(e, itemToEdit); // Anda perlu membuat fungsi editItem
                                        } else {
                                            addItem(e);
                                        }
                                    }}
                                >
                                    {itemToEdit ? "Update" : "Simpan"}
                                </button>
                            </div>
                        </form>
                    </Modal>
                </div>

                {/* Page Main */}
                <div className=" bg-white p-6">
                    <div className="main-heading">
                        <h6>DAFTAR DATA ITEM</h6>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <td>No</td>
                                <td>Kode</td>
                                <td>Nama Item</td>
                                <td>Aksi</td>
                            </tr>
                        </thead>
                        <tbody>
                            {items.data.map((item, index) => (
                                <tr key={item.id}>
                                    <td>
                                        {index +
                                            1 +
                                            (currentPage - 1) * itemsPerPage}
                                    </td>
                                    <td>{item.kode_item}</td>
                                    <td>{item.nama_item}</td>
                                    <td>
                                        <div className="aksi">
                                            <button
                                                type="button"
                                                className="btn btn-outline-warning me-3"
                                                onClick={() => {
                                                    setItemToEdit(item);
                                                    setOpenModal(true); // Anda perlu membuat fungsi openModal
                                                }}
                                            >
                                                <i className="fas fa-pencil-alt mx-2"></i>
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={() => {
                                                    deleteItem(item);
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
                            {items.prev_page_url && (
                                <li className="page-item"></li>
                            )}

                            {/* Numbered Links */}
                            {items.links.map((link, index) =>
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
                            {items.next_page_url && (
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
