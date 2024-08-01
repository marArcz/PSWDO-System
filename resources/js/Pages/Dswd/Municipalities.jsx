import Card from '@/Components/Card'
import DataTableComponent from '@/Components/DataTableComponent'
import DataTableCustomStyles from '@/Components/DataTableCustomStyles'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Head, Link } from '@inertiajs/react'
import React from 'react'

const Municipalities = ({ auth, municipalities }) => {

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'No. of barangay',
            cell: row => (
                <>
                    <Link href={route('pswdo.municipalities.barangays.index', { municipality: row.id })} className='link link-primary fw-bold'>
                        {(row.barangays?.length ?? 0) + " Barangay/s"}
                    </Link>
                </>
            ),
            sortable: true,
        },
        {
            name: 'Total families',
            selector: row => {
                let total = 0
                for (let barangay of row.barangays) {
                    total += barangay.families
                }
                return total;
            },
            sortable: true,
        },
        {
            name: 'Total Households',
            selector: row => {
                let total = 0
                for (let barangay of row.barangays) {
                    total += barangay.households
                }
                return total;
            },
            sortable: true,
        },
    ];


    return (
        <DswdPanelLayout
            headerTitle={'Municipalities'}
            activeLink='municipalities'
        >
            <Head title='Municipalities' />
            <Card>
                <p className='form-text'>Municipalities</p>
                <hr />
                <DataTableComponent
                    createButtonLink={route('pswdo.municipalities.create')}
                    columns={columns}
                    data={municipalities}
                    hideActionButtons
                    style={DataTableCustomStyles.default}
                />
            </Card>
        </DswdPanelLayout>
    )
}

export default Municipalities
