import Card from "@/Components/Card";
import DataTableComponent from "@/Components/DataTableComponent";
import DswdPanelLayout from "@/Layouts/DswdPanelLayout";
import { Link, router } from "@inertiajs/react";
import { dateFormat, numberFormat } from "highcharts";
import React from "react";
import { Button, Dropdown } from "react-bootstrap";

const Distributions = ({ distributions }) => {

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
            headerTitle="Assistance Distribution Records"
            activeLink="distributions"
        >
            <Card className="rounded-3 mb-3">
                <p className="text-blue fs-6 my-0 d-flex gap-2 align-items-center">
                    <i className="fi fi-rr-info"></i>
                    <span>Pending assistance distributions</span>
                </p>
            </Card>
            <DataTableComponent
                hideActionButtons
                data={distributions}
                columns={[
                    {
                        name: "Municipality",
                        selector: row => row.report.municipality.name
                    },
                    {
                        name: "Total expenses",
                        selector: row => totalExpenses(row)
                    },
                    {
                        name: "Status",
                        cell: row => (
                            <div>
                                <Dropdown>
                                    <Dropdown.Toggle bsPrefix='custom-toggler' className='btn-light-success btn fs-6 leading-none'>
                                        {/* <i className='bx bx-dots-horizontal-rounded bx-sm text-tertiary'></i> */}
                                        <div className="flex items-center">
                                            {row.status} <i className="bx bx-chevron-down"></i>
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className=' border'>
                                        <Dropdown.Item as={Link} method="patch" href={route('pswdo.distributions.distributed', row.id)} className='mb-3'>
                                            Distributed
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} method="patch" href={route('pswdo.distributions.declined', row.id)} className=''>
                                            Declined
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        )
                    },
                    {
                        name:'Date Recorded',
                        selector:row => dateFormat('%b %d, %Y',new Date(row.created_at))
                    },
                    {
                        name: 'Action',
                        cell: row => (
                            <div className="flex gap-2">
                                <Link href={route("pswdo.distributions.show", row.id)}>View</Link>
                                <Link className="link-danger" as={'button'} method="delete" href={route("pswdo.distributions.destroy", row.id)}>Delete</Link>
                            </div>

                        )
                    }
                ]}
            />
        </DswdPanelLayout>
    );
}

export default Distributions;
