import Card from '@/Components/Card';
import DataTableComponent from '@/Components/DataTableComponent';
import DataTableCustomStyles from '@/Components/DataTableCustomStyles';
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Link, router } from '@inertiajs/react';
import { dateFormat, numberFormat } from 'highcharts';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Badge, Button, Col, Dropdown, Row } from 'react-bootstrap';
import SweetAlert2 from 'react-sweetalert2';

const TrackHistories = ({ trackHistories }) => {
    const [swalProps, setSwalProps] = useState({})
    const onDeleteBtnClicked = (e) => {
        let btn = e.target;
        console.log(btn)

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
                router.visit(btn.attributes.getNamedItem("data-href").value, { method: "delete" })
            },
            didClose: () => setSwalProps(p => ({ ...p, show: false }))
        });
    }


    const columns = [
        {
            name: 'Batch No',
            selector: row => `# ${row.batch_no}`
        },
        {
            name: 'Item',
            selector: row => row.name,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity + ` (${row.unit?.name})`,
        },
        {
            name: 'Purpose of release',
            cell: (row) => (
                <p className="my-1 text-blue">{row.purpose ?? 'Typhoon Assistance'}</p>
            )
        },
        {
            name: 'Date',
            cell: (row) => (
                <p className="my-1 text-danger">{dateFormat('%b %d, %Y', new Date(row.created_at))}</p>
            )
        },
        {
            name: 'Action',
            cell: row => (
                <>
                    <Button onClick={onDeleteBtnClicked} data-href={route('pswdo.inventory_histories.destroy', { inventory_history: row.id })} className='btn btn-light-danger' >
                        <i className=' leading-none bx bx-trash'></i>
                    </Button>
                </>
            ),

        },
    ];
    return (
        <DswdPanelLayout
            headerTitle='Inventory Release History'
            activeLink='inventory_histories'
        >
            <Card className='mb-3 text-dark fw-medium'>
                <div className="flex items-center gap-2">
                    <i className='fi fi-rr-time-past text-primary'></i>
                    <span>History record of released stocks from inventory.</span>
                </div>
            </Card>
            <DataTableComponent
                columns={columns}
                data={trackHistories}
                createButtonLink={route('pswdo.inventories.create')}
                expandableRows
                selectableRows={false}
                hideActionButtons
                style={DataTableCustomStyles.default}
                expandableRowsComponent={({ data }) => (
                    <Card className="fs-6">
                        <p className='fs-6 mb-1 text-tertiary'>
                            <small className=' fw-semibold'>Item Details</small>
                        </p>
                        <Row className='fs-6 gy-3'>
                            <Col sm>
                                <span className=' fw-semibold me-3'>Unit Cost:</span>
                                <span>₱ {numberFormat(data.unit_cost, 2, '.', ',')}</span>
                            </Col>
                            <Col sm>
                                <span className=' fw-semibold me-3'>Total Cost:</span>
                                <span>₱ {numberFormat(data.quantity * data.unit_cost, 2, '.', ',')}</span>
                            </Col>
                            <Col sm>
                            </Col>
                        </Row>
                    </Card>
                )}
            />
            <SweetAlert2
                {...swalProps}
                confirmButtonColor='#0D6DA6'
            />
        </DswdPanelLayout>
    )
}

export default TrackHistories
