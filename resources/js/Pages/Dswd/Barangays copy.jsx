import Container from '@/Components/Container'
import DataTableComponent from '@/Components/DataTableComponent'
import PrimaryButton from '@/Components/PrimaryButton'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { Button } from 'react-bootstrap'
import DataTable from 'react-data-table-component'

const Barangays = ({ auth, barangays }) => {
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Population',
            selector: row => row.population,
        },
        {
            name: 'User Admin',
            cell: row => (
                <>
                    {
                        row.admin ? (
                            <Link href="#" className='link-dark fw-bold'>{row.admin.firstname} {row.admin.lastname}</Link>
                        ) : (
                            <Link href={route('barangay.barangayAdmin.create', { id: row.id })} className='link-primary'>Add User Admin</Link>
                        )
                    }
                </>
            )
        },
        {
            name: 'Action',
            cell: row => (
                <>
                    <div className="flex gap-4">
                        <Link href={route('barangay.edit', { id: row.id })} className='link-success'>
                            <i className='fi fi-rr-edit fs-6'></i>
                        </Link>
                        <Link href="#" className='link-danger'>
                            <i className='fi fi-rr-trash fs-6'></i>
                        </Link>
                    </div>
                </>
            )
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                padding: '15px 20px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
            },
        },
        cells: {
            style: {
                padding: '15px 20px',
                fontSize: '0.9rem'
            },
        },
    };

    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Barangays</h2>}
        >
            <Head title='Barangays' />
            <Container>
                {/* <div className="text-end mb-3">
                        <Button className='text-uppercase px-3' size='sm' href={route('barangay.create')} as={Link}>Add New</Button>
                    </div>
                    <div className="fs-5">
                        <DataTable
                            className='shadow-sm'
                            columns={columns}
                            data={barangays}
                            customStyles={customStyles}
                            pagination
                            selectableRows
                        />
                    </div> */}
                <DataTableComponent />
            </Container>
        </Authenticated>
    )
}

export default Barangays
