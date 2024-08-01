import Card from '@/Components/Card'
import Container from '@/Components/Container'
import DataTableComponent from '@/Components/DataTableComponent'
import DataTableCustomStyles from '@/Components/DataTableCustomStyles'
import PrimaryButton from '@/Components/PrimaryButton'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import DataTable from 'react-data-table-component'

const Barangays = ({ barangays,municipality }) => {
    const [showViewModal, setShowViewModal] = useState(false);
    const [barangayAdmin, setBarangayAdmin] = useState(null);

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable:true
        },
        {
            name: 'Total No. of Families',
            selector: row => row.families,
            sortable:true
        },
        {
            name: 'Total No. of households',
            selector: row => row.households,
            sortable:true
        },
        {
            name: 'Action',
            cell: row => (
                <>
                    <div className="flex gap-4">
                        <Link href={route('pswdo.barangays.edit', { barangay: row.id })} className='link-success'>
                            <i className='fi fi-rr-edit fs-6'></i>
                        </Link>

                    </div>
                </>
            ),
            sortable:true
        },
    ];


    return (
        <DswdPanelLayout
            headerTitle={municipality.name+' / '+'Barangays'}
            activeLink='municipalities'
            backButtonLink={route('pswdo.municipalities.index')}
        >
            <Head title='Barangays' />
            <Card>
                <p className='form-text'>Barangays from {municipality.name}</p>
                <hr />
                <DataTableComponent
                    createButtonLink={route('pswdo.municipalities.barangays.create',{municipality:municipality?.id??0})}
                    columns={columns}
                    data={barangays}
                    hideActionButtons
                    style={DataTableCustomStyles.default}
                />
            </Card>
        </DswdPanelLayout>
    )
}

export default Barangays
