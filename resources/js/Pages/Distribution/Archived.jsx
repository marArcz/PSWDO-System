import Card from '@/Components/Card'
import DataTableComponent from '@/Components/DataTableComponent'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Link } from '@inertiajs/react'
import { dateFormat, numberFormat } from 'highcharts'
import React from 'react'
import { Dropdown } from 'react-bootstrap'

const Archived = ({ distributions }) => {
    const totalExpenses = (distribution) => {
        let totalCost = 0;

        for (let item of distribution.distribution_items) {
            let cost = item.unit_cost * item.quantity;
            totalCost += cost;
        }

        return "Php " + numberFormat(totalCost, 2, '.', ',');
    }

    return (
        <DswdPanelLayout
            activeLink='archived_distributions'
            headerTitle='Archived Distributions'
        >
            <Card>
                <p className="my-1 text-blue">
                    Below are the distributions that are distributed and declined.
                </p>
            </Card>
            <DataTableComponent
                className='mt-3 '
                hideActionButtons
                data={distributions}
                columns={[
                    {
                        name: "Municipality",
                        selector: row => row.municipality_name
                    },
                    {
                        name: "Typhoon",
                        selector: row => row.typhoon_name
                    },
                    {
                        name: "Total expenses",
                        selector: row => totalExpenses(row)
                    },
                    {
                        name: "Status",
                        cell: row => (
                            <div className={` text-uppercase text-${row.status == 'Distributed' ? 'success' : 'danger'}`}>
                                {row.status}
                            </div>
                        )
                    },
                    {
                        name: 'Date Recorded',
                        selector: row => dateFormat('%b %d, %Y', new Date(row.created_at))
                    },
                    {
                        name: 'Action',
                        cell: row => (
                            <>
                                <Dropdown>
                                    <Dropdown.Toggle bsPrefix='custom-toggler' className='btn-light btn fs-6 leading-none d-flex align-items-center'>
                                        <i className='bx bx-dots-horizontal-rounded bx-sm text-tertiary'></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='' align="end">
                                        <Dropdown.Item as={Link} href={route('pswdo.distributions.show', row.id)} className='mb-3'>
                                            View
                                        </Dropdown.Item>
                                        <Dropdown.Item preserveState={false} as={Link} method={"delete"} href={route('pswdo.distributions.destroy', row.id)} className='mb-1'>
                                            Delete
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </>
                        ),

                    },
                ]}
            />
        </DswdPanelLayout>
    )
}

export default Archived
