import React from 'react'
import TextButton from './TextButton'
import DataTable from 'react-data-table-component'
import { Link, router } from '@inertiajs/react';
import DataTableCustomStyles from './DataTableCustomStyles';
import Card from './Card';
import { useEffect } from 'react';
import { useState } from 'react';
import SweetAlert2 from 'react-sweetalert2';

const DataTableComponent = ({ hideActionButtons = false, addBtnText = "Create New", selectableRows = true, hideDeleteBtn = false, columns = [], data = [], headerControls = true, className = '', createButtonLink = "", onDeleteBtnClicked, expandableRows = false, expandableRowsComponent, style = null, additionalButtons = null, pagination = true }) => {
    const [swalProps, setSwalProps] = useState({});

    const customStyles = {
        table: {
            style: {
                background: 'transparent',
                boxShadow: 'none !important'
            }
        },
        rows: {
            style: {
                position: 'unset !important',
                marginBottom: '10px',
                paddingBottom: "10px",
                paddingTop: "10px",
                borderRadius: "8px",
                boxShadow: '2px 2px 10px rgb(230,230,230)'
            },
        },
        headRow: {
            style: {
                borderRadius: "8px",
                marginBottom: '10px',
            },
        },
        headCells: {
            style: {
                padding: '15px 20px',
                fontSize: '0.9rem',
                fontWeight: 'bold',
            },
        },
        cells: {
            style: {
                padding: '15px 20px',
                fontSize: '0.9rem'
            },
        },
        pagination: {
            style: {
                borderRadius: "8px",
            }
        }
    };

    useEffect(() => {
        document.querySelectorAll(".delete-btn").forEach(element => {
            element.addEventListener('click', function (e) {
                setSwalProps({
                    show: true,
                    title: 'Are you sure to delete this?',
                    text: "This cannot be undone",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                    onConfirm: (result) => {
                        setSwalProps(p => ({ ...p, show: false }))
                        router.visit(element.attributes.getNamedItem("data-href").value, { method: "delete" })
                    },
                    didClose: () => setSwalProps(p => ({ ...p, show: false }))
                });
            })
        });
    }, []);

    useEffect(() => {
        document.querySelectorAll(".delete-btn").forEach(element => {
            element.addEventListener('click', function (e) {
                setSwalProps({
                    show: true,
                    title: 'Are you sure to delete this?',
                    text: "This cannot be undone",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                    onConfirm: (result) => {
                        setSwalProps(p => ({ ...p, show: false }))
                        router.visit(element.attributes.getNamedItem("data-href").value, { method: "delete" })
                    },
                    didClose: () => setSwalProps(p => ({ ...p, show: false }))
                });

            })
        });
    }, [data]);

    return (
        <>
            <div className={`${className}`}>
                {!hideActionButtons && (
                    <Card className='mb-3 rounded-3'>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-wrap gap-x-4 gap-y-3 justify-start">
                                <Link href={createButtonLink}>
                                    <TextButton allCaps={false}>
                                        <div className="flex gap-1 items-center text-sm fw-normal">
                                            <i className='fi fi-rr-square-plus leading-none'></i>
                                            <span>{addBtnText}</span>
                                        </div>
                                    </TextButton>
                                </Link>
                                {
                                    !hideDeleteBtn && (
                                        <TextButton onClick={onDeleteBtnClicked} allCaps={false} variant='danger'>
                                            <div className="flex gap-1 items-center text-sm fw-normal">
                                                <i className='fi fi-rr-trash leading-none'></i>
                                                <span>Delete Selected</span>
                                            </div>
                                        </TextButton>
                                    )
                                }
                            </div>
                            <div>
                                {additionalButtons}
                            </div>
                        </div>
                    </Card>
                )}
                <div>
                    <div className="fs-5">
                        <div className="w-100 max-w-full datatable-container">
                            <div className="table-responsive-sm">
                                <DataTable
                                    responsive
                                    className='datatable-custom'
                                    columns={columns}
                                    data={data}
                                    customStyles={style ?? DataTableCustomStyles.default}
                                    pagination={pagination}
                                    selectableRows={selectableRows}
                                    noDataComponent={(
                                        <p className='fs-6 mt-3 text-secondary'>No rows to display.</p>
                                    )}
                                    expandableRows={expandableRows}
                                    persistTableHead
                                    expandableRowsComponent={expandableRowsComponent}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <SweetAlert2
                {...swalProps}
                confirmButtonColor='#0D6DA6'
            />
        </>
    )
}

export default DataTableComponent
