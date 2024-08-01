import Card from '@/Components/Card';
import DataTableComponent from '@/Components/DataTableComponent';
import DataTableCustomStyles from '@/Components/DataTableCustomStyles';
import ReactModal from '@/Components/ReactModal';
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Link, router, useForm } from '@inertiajs/react';
import axios from 'axios';
import { dateFormat, numberFormat } from 'highcharts';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Badge, Button, Col, Dropdown, Form, Row } from 'react-bootstrap';
import SweetAlert2 from 'react-sweetalert2';

const Inventories = ({ inventories,auth }) => {
    const [showReleaseModal, setShowReleaseModal] = useState(false)
    const [swalProps, setSwalProps] = useState({})
    const [selectedInventory, setSelectedInventory] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [purpose, setPurpose] = useState("")
    const [quantity, setQuantity] = useState("")


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

    const onReleaseItem = (item) => {
        setSelectedInventory(item)
        setShowReleaseModal(true)
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
            name: 'From',
            cell: (row) => (
                <Badge text='light' bg='tertiary'>{row.from ?? 'Donation'}</Badge>
            )
        },
        {
            name: 'Expiration',
            selector: row => row.expiration ? (dateFormat('%b %d, %Y', new Date(row.expiration))) : 'N/A'
        },
    ];

    if(auth.user.isAdmin){
        columns.push(
            {
                name: 'Action',
                cell: row => (
                    <>
                        <Dropdown>
                            <Dropdown.Toggle bsPrefix='custom-toggler' className='btn-light btn fs-6 leading-none'>
                                <i className='bx bx-dots-horizontal-rounded bx-sm text-tertiary'></i>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className=''>
                                <Dropdown.Item as={Link} href={route('pswdo.inventories.edit', { inventory: row.id })} className='link-success mb-3'>
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item as={'button'} onClick={onDeleteBtnClicked} data-href={route('pswdo.inventories.destroy', { inventory: row.id })} className='link-danger mb-3' >
                                    Delete
                                </Dropdown.Item>
                                <Dropdown.Item as={'button'} onClick={() => onReleaseItem(row)} data-href={route('pswdo.inventories.destroy', { inventory: row.id })} className='link-dark' >
                                    Release stock
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </>
                ),

            },
        )
    }

    const onSubmitOutForm = (e) => {
        e.preventDefault();
        let formData = new FormData();

        formData.append('id', selectedInventory.id);
        formData.append('quantity', quantity);
        formData.append('purpose', purpose);
        setProcessing(true)
        axios.post(route('api.inventory_histories.store'), formData)
            .then((res) => {
                console.log('res: ', res)
                setProcessing(false)
                setShowReleaseModal(false)

                setSwalProps({
                    show: true,
                    title: 'Success',
                    text: "Successfully released stocks!",
                    icon: 'success',
                    onConfirm: () => {
                        setSwalProps(p => ({ ...p, show: false }))
                        router.reload({
                            preserveState: false,
                            preserveScroll: false
                        });
                    },
                    onResolve: () => {
                        setSwalProps(p => ({ ...p, show: false }))
                        router.reload({
                            preserveState: false,
                            preserveScroll: false
                        });
                    },
                    didClose: () => {
                        setSwalProps(p => ({ ...p, show: false }))
                        router.reload({
                            preserveState: false,
                            preserveScroll: false
                        });
                    },
                });

            })
            .catch(err => console.error(err))
    }

    return (
        <DswdPanelLayout
            headerTitle='Inventory'
            activeLink='inventories'
        >

            <DataTableComponent
                columns={columns}
                data={inventories}
                hideActionButtons={!auth.user.isAdmin}
                createButtonLink={route('pswdo.inventories.create')}
                expandableRows
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
            <ReactModal
                show={showReleaseModal}
                onHide={() => setShowReleaseModal(false)}
                size='lg'
            >
                {
                    selectedInventory && (
                        <Form onSubmit={onSubmitOutForm}>
                            <p className='fw-medium flex items-center gap-2'>
                                <i className='bx bx-sm bx-box'></i>
                                <span>Releasing stock from inventory</span>
                            </p>
                            <hr />
                            <div className="mb-3">
                                <Form.Label className='text-secondary'>Inventory item:</Form.Label>
                                <Form.Control
                                    type='text'
                                    readOnly
                                    disabled
                                    value={selectedInventory?.name}
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Label className='text-secondary'>Current stock:</Form.Label>
                                <Form.Control
                                    type='number'
                                    readOnly
                                    disabled
                                    value={selectedInventory?.quantity}
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Label>Purpose of release (eg. Typhoon assistance):</Form.Label>
                                <Form.Control
                                    type='text'
                                    value={purpose}
                                    required
                                    onChange={e => {
                                        setPurpose(e.target.value)
                                    }}
                                    max={selectedInventory?.quantity}
                                />
                            </div>
                            <div className="mb-3">
                                <Form.Label>Amount of items to release:</Form.Label>
                                <Form.Control
                                    type='number'
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className={`flex gap-2 mt-4 justify-end`}>
                                <Button disabled={processing} variant='secondary' className='btn-bordered' onClick={() => setShowReleaseModal(false)}>
                                    Cancel
                                </Button>
                                <Button disabled={processing} type='submit' >
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    )
                }
            </ReactModal>
        </DswdPanelLayout>
    )
}

export default Inventories
