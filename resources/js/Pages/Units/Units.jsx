import DataTableComponent from '@/Components/DataTableComponent'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Link } from '@inertiajs/react';
import React from 'react'

const Units = ({units}) => {

    const columns = [
        {
            name:"Unit",
            selector: row => row.name
        },
        {
            name:"Sub Unit",
            selector: row => row.sub_unit
        },
        {
            name:"Action",
            cell:row => (
                <div className='flex gap-3'>
                    <Link href='#'>
                        Edit
                    </Link>
                    <Link href='#' className='link-danger'>
                        Delete
                    </Link>
                </div>
            )
        }
    ];

  return (
    <DswdPanelLayout
        headerTitle='Manage inventory units'
        activeLink='units'
    >
        <DataTableComponent
            data={units}
            columns={columns}
            createButtonLink={route('pswdo.units.create')}
        />
    </DswdPanelLayout>
  )
}

export default Units
