import DataTableComponent from '@/Components/DataTableComponent'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Link } from '@inertiajs/react';
import { dateFormat } from 'highcharts';
import React from 'react'

const Calamities = ({ calamities }) => {

    const columns = [
        {
            name: 'Name',
            selector: row => 'Typhoon '+row.name
        },
        {
            name: 'Date',
            selector: row => {
                let date = new Date(row.date_happened)

                return `${dateFormat('%b. %d, %Y',date)}`;
            }
        },
        {
            name: "Action",
            cell: row => (
                <>
                <div className="flex gap-4">
                    <Link href={route('pswdo.calamities.edit', { calamity: row.id })} className='link-success'>
                        <i className='fi fi-rr-edit fs-6'></i>
                    </Link>
                    <Link as='button' data-href={route('pswdo.calamities.destroy', { calamity: row.id })} method="delete" className='link-danger delete-btn'>
                        <i className='fi fi-rr-trash fs-6'></i>
                    </Link>
                </div>
            </>
            )
        }
    ];

    return (
        <DswdPanelLayout
            headerTitle='Calamities'
            activeLink='typhoons'
        >
            <DataTableComponent
                createButtonLink={route('pswdo.calamities.create')}
                columns={columns}
                data={calamities}
            />

        </DswdPanelLayout>
    )
}

export default Calamities
