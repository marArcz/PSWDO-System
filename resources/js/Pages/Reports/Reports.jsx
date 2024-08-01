import DataTableComponent from '@/Components/DataTableComponent'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Link, useForm } from '@inertiajs/react';
import { dateFormat } from 'highcharts';
import React from 'react'
import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const Reports = ({ reports }) => {
    const { data, setData, processing, post } = useForm({
        excel_file: null,
    })
    const [showImportModal, setShowImportModal] = useState(false)

    const columns = [
        {
            name: 'Municipality',
            selector: row => row.municipality.name
        },
        {
            name: 'Calamity',
            selector: row => 'Typhoon ' + row.calamity.name
        },
        {
            name: "Date Created",
            selector: row => dateFormat('%b. %d, %Y', new Date(row.created_at))
        },
        {
            name: "Action",
            cell: row => (
                <>
                    <div className="flex gap-4 flex-wrap">
                        <Link href={route('pswdo.reports.show', { report: row.id })} className='link-blue d-flex align-items-center gap-2'>
                            <span>View</span>
                            <i className='fi fi-rr-info fs-6'></i>
                        </Link>
                        <Link href={route('pswdo.reports.edit', { report: row.id })} className='link-success'>
                            <i className='fi fi-rr-edit fs-6'></i>
                        </Link>
                        <Link as='button' data-href={route('pswdo.reports.destroy', { report: row.id })} method="delete" className='link-danger delete-btn'>
                            <i className='fi fi-rr-trash fs-6'></i>
                        </Link>
                    </div>
                </>
            )
        }
    ];

    const onFormSubmit = e => {
        e.preventDefault();
        post(route('pswdo.reports.import'), {
            preserveState: false,
            preserveScroll: false
        })
    }

    const onFileSelect = e => {
        if (e.target.files.length > 0) {
            setData('excel_file', e.target.files[0]);
        } else {
            setData('excel_file', null);
        }
    }

    return (
        <DswdPanelLayout
            activeLink='reports'
            headerTitle='Reports'
        >
            <Modal
                show={showImportModal}
                onHide={() => setShowImportModal(false)}
                centered
                className='my-0'
            >
                <Modal.Body className='p-4'>
                    <p className='mb-4 fw-semibold text-lg'>Import report from excel</p>
                    <form onSubmit={onFormSubmit}>
                        <div className="mb-3">
                            <Form.Label>Select file</Form.Label>
                            <Form.Control
                                type='file'
                                onChange={onFileSelect}
                                required
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            />
                        </div>
                        <div className="flex justify-between mt-4 gap-2">
                            <Button disabled={processing} type='submit' variant='blue'>Import</Button>
                            <Button disabled={processing} type='button' onClick={() => setShowImportModal(false)} className='btn-bordered' variant='danger'>Cancel</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <DataTableComponent
                columns={columns}
                data={reports}
                addBtnText='Add Report'
                createButtonLink={route('pswdo.reports.create')}
                additionalButtons={(
                    <>
                        <Button type='button' onClick={() => setShowImportModal(true)}>
                            Import excel report
                        </Button>
                    </>
                )}
            />
        </DswdPanelLayout>
    )
}

export default Reports
