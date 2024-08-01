import Container from '@/Components/Container'
import { Head } from '@inertiajs/react'
import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DataTableComponent from '@/Components/DataTableComponent';

const Requests = ({ auth }) => {
    const columns = [
        {
            name: 'Tracking No',
            selector: row => row.tracking_no,
        },
        {
            name: 'Date Submitted',
            selector: row => row.tracking_no,
        },
        {
            name: 'Status',
            selector: row => row.tracking_no,
        },
        {
            name: 'Action',
            selector: row => row.tracking_no,
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Requests</h2>}
        >
            <Head title="Requests" />

            <Container>
                <div className="fs-4">
                    <DataTableComponent columns={columns} />
                </div>
            </Container>
        </AuthenticatedLayout>
    )
}

export default Requests
