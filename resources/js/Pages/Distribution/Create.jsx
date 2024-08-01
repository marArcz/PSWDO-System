import Card from '@/Components/Card'
import DataTableComponent from '@/Components/DataTableComponent'
import InputLabel from '@/Components/InputLabel'
import ReactModal from '@/Components/ReactModal'
import TextInput from '@/Components/TextInput'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { useForm } from '@inertiajs/react'
import axios from 'axios'
import { find } from 'highcharts'
import React from 'react'
import { useState } from 'react'
import { Button, ButtonGroup, DropdownButton, Form, InputGroup, ListGroup, ListGroupItem, Dropdown, Row, Col } from 'react-bootstrap'
import DataTable from 'react-data-table-component'

const Create = ({ inventories, report }) => {
    const [inventoryList, setInventoryList] = useState(inventories)
    const [showProceedModal, setShowProceedModal] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const [showRisModal, setShowRisModal] = useState(false)
    const { data, setData, processing, post } = useForm({
        selectedItems: [],
        no_of_families: 0,
        report_id: report.id,
    });
    const DISTRIBUTE_BY_UNIT = 0
    const DISTRIBUTE_BY_SUB_UNIT = 1
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({})
    const [selectedItems, setSelectedItems] = useState([])
    const [itemDistribution, setItemDistribution] = useState(null)
    const totalFamiliesToServe = report.no_of_families - report.no_of_families_served
    const totalRows = 15;
    const [risRowsLeft, setRisRowsLeft] = useState(totalRows);


    const isItemAdded = (inventoryId) => {
        let inventory = selectedItems.find((v, i) => v.inventory.id == inventoryId);
        return inventory != undefined;
    }

    const addItem = (inventory) => {
        let minimumQuantity = inventory.sub_unit_quantity > totalFamiliesToServe ? 1 : Math.round(totalFamiliesToServe / inventory.sub_unit_quantity)

        setSelectedItem({
            ...inventory,
            minimumQuantity
        })


        if (isItemAdded(inventory.id)) {
            setIsUpdating(true)

            let itemDistribution = selectedItems.find((v) => v.inventory.id == inventory.id);

            setItemDistribution(itemDistribution)
        } else {
            setIsUpdating(false)
            setItemDistribution({
                inventory,
                distribution: DISTRIBUTE_BY_UNIT,
                unit: inventory.unit?.name,
                rate: minimumQuantity
            })
        }

        setShowAddModal(true)
    }

    const onEditItemClicked = (item) => {
        setIsUpdating(true)
        setItemDistribution(item);
        setShowAddModal(true)
    }

    const onAddItemSubmit = e => {
        e.preventDefault();

        if (isUpdating) {
            let index = selectedItems.findIndex((v) => v.inventory.id == itemDistribution.id);
            let distribution = Math.round((itemDistribution.rate * itemDistribution.inventory.sub_unit_quantity) / totalFamiliesToServe);
            let updatedItem = { ...itemDistribution, distribution }

            let items = selectedItems.map((item, index) => item.inventory.id == itemDistribution.inventory.id ? updatedItem : item);

            if (items.length > totalRows) {
                setRisRowsLeft(0)
            } else {
                setRisRowsLeft(totalRows - items.length)
            }
            setData("selectedItems", items)
            setSelectedItems(items);
        } else {
            let distribution = Math.round((itemDistribution.rate * itemDistribution.inventory.sub_unit_quantity) / totalFamiliesToServe);
            let newItem = { ...itemDistribution, distribution }

            if ((selectedItems.length + 1) > totalRows) {
                setRisRowsLeft(0)
            } else {
                setRisRowsLeft(totalRows - (selectedItems.length + 1));
            }

            setData("selectedItems", [...selectedItems, newItem])
            setSelectedItems(s => ([...s, newItem]));
        }

        setItemDistribution(null);

        setShowAddModal(false);

    }

    const onRemoveItemClicked = (inventoryId) => {
        setSelectedItems(s => (s.filter((v) => v.inventory.id != inventoryId)))
    }

    const onProceed = () => {
        console.log(selectedItems)
        setData('no_of_families', totalFamiliesToServe)

        post(route("pswdo.reports.distributions.store", report.id));

    }

    const findInventoryIndex = (id) => {
        let inventory = inventoryList.findIndex((item) => item.id == id)

        return inventory;
    }

    const getAllocated = (id) => {
        let item = selectedItems.find((i) => i.inventory.id == id);
        return item?.rate ?? 0;
    }

    return (
        <DswdPanelLayout
            headerTitle='Assistance Mapping'
            activeLink='reports'
            backButtonAction={() => history.back()}
        >
            <ReactModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}
            >
                {selectedItem && itemDistribution && (
                    <form onSubmit={onAddItemSubmit}>
                        {/* <p className='text-sm fw-medium text-secondary mb-3'>Add Item</p> */}
                        <div className="mb-3">
                            <p className='fw-bold fs-5 text-dark my-0 text-underline'>{selectedItem.name}</p>
                            {/* <div className='w-[10px] h-[10px] bg-blue mb-1 rounded-full'></div> */}
                            <p className='mt-0 mb-2 form-text'>You currently have <strong>{selectedItem.quantity} {selectedItem.unit.name}</strong> in stock.</p>

                        </div>
                        <div className="mb-3">
                            <InputLabel>Quantity ({itemDistribution.distribution == DISTRIBUTE_BY_UNIT ? itemDistribution.inventory.unit.name : itemDistribution.inventory.unit.sub_unit})</InputLabel>
                            <InputGroup>
                                <Form.Control
                                    required
                                    max={itemDistribution.distribution == DISTRIBUTE_BY_UNIT ? selectedItem.quantity : null}
                                    type="number"
                                    value={itemDistribution.rate ?? selectedItem.minimumQuantity}
                                    placeholder={'Quantity - ' + (itemDistribution.distribution == DISTRIBUTE_BY_UNIT ? itemDistribution.inventory.unit.name : itemDistribution.inventory.unit.sub_unit)}
                                    aria-label="Quantity"
                                    min={selectedItem.minimumQuantity}
                                    aria-describedby="btnGroupAddon"
                                    onChange={e => setItemDistribution(s => ({ ...s, rate: e.target.value }))}
                                />
                                <InputGroup.Text id="btnGroupAddon2" className='bg-secondary text-light'>
                                    {selectedItem.unit.name}
                                </InputGroup.Text>
                            </InputGroup>
                            <p className="form-text mt-2">You need to give at least <strong>{selectedItem.minimumQuantity} {selectedItem.unit.name}</strong> to accomodated <strong>{totalFamiliesToServe}</strong> families.</p>

                            <Button className='col-12 mt-4' type='submit' variant='blue'>{isUpdating ? 'Save changes' : 'Add Item'}</Button>
                            <Button className='col-12 mt-2' type='button' variant='light' onClick={() => setShowAddModal(false)}>Cancel</Button>
                        </div>
                    </form>
                )}
            </ReactModal>
            <p className='fw-bold'>Report</p>
            <Card className='mb-3'>
                <p className='mt-1 mb-3 text-secondary'>
                    <small>From the municipality of {report.municipality.name}</small>
                </p>
                <div className="flex gap-3 mb-3">
                    <p className='my-0 fw-medium text-sm'>Total no. of families: </p>
                    <p className="my-0 fw-medium text-sm">{report.no_of_families}</p>
                </div>
                <div className="flex gap-3 mb-3">
                    <p className='my-0 fw-medium text-sm'>Total families served: </p>
                    <p className="my-0 fw-medium text-sm">{report.no_of_families_served}</p>
                </div>
            </Card>
            <Row>
                <Col>
                    <div className="flex gap-2 items-center mb-3">
                        <div className='w-[10px] h-[10px] bg-tertiary rounded-full'></div>
                        <p className='fs-6 text-dark my-0'>
                            <span className='fw-bold'>Inventory</span>
                        </p>
                    </div>

                    <Card className='py-3 mb-4'>
                        <p className='mt-1 mb-3 text-secondary'>
                            <small>Select items here to distribute</small>
                        </p>
                        <div className="table-container max-h-[30vh] overflow-y-scroll my-2 custom-scroll">
                            <DataTableComponent
                                selectableRows={false}
                                pagination={false}
                                hideActionButtons
                                columns={[
                                    {
                                        name: 'Batch No',
                                        selector: row => "#" + row.batch_no
                                    },
                                    {
                                        name: 'Item',
                                        selector: row => row.name
                                    },
                                    {
                                        name: 'Quantity',
                                        selector: row => {
                                            if (row.quantity > 0) {
                                                return (row.quantity - getAllocated(row.id)) + ` (${row.unit.name}) | ${row.sub_unit_quantity} ${row.unit.sub_unit} per ${row.unit.name}`
                                            } else {
                                                return "Out of stock"
                                            }
                                        }
                                    },
                                    {
                                        name: 'Action',
                                        cell: row => (
                                            <>
                                                {
                                                    isItemAdded(row.id) ? (
                                                        <Button size='sm' variant='tertiary' className='text-light' onClick={() => addItem(row)} type='button'>Selected</Button>
                                                    ) : (
                                                        <Button disabled={row.quantity <= 0} size='sm' variant='secondary' className='' onClick={() => addItem(row)} type='button'>Select</Button>
                                                    )
                                                }
                                            </>
                                        )
                                    },

                                ]}
                                data={inventoryList}
                            />
                        </div>
                    </Card>
                    <div className="flex gap-2 items-center mb-2">
                        <div className='w-[10px] h-[10px] bg-blue rounded-full'></div>
                        <p className='fs-6 text-dark my-0 fw-bold'>
                            To distribute
                        </p>
                    </div>
                    <Card className='py-3 mb-3'>
                        <p className='text-secondary'>
                            <small>Items to be distributed</small>
                        </p>
                        <DataTableComponent
                            selectableRows={false}
                            pagination={false}
                            hideActionButtons
                            columns={[
                                {
                                    name: 'Item',
                                    selector: row => row.inventory.name
                                },
                                {
                                    name: 'Amount to distribute',
                                    selector: row => `${row.rate} ${row.inventory.unit.name}`
                                },
                                {
                                    name: 'Edit',
                                    cell: row => {
                                        return (
                                            <div className='text-center flex items-center gap-2'>
                                                <button onClick={() => onEditItemClicked(row)} className=' text-btn btn text-btn-blue'>
                                                    <i className='bx bxs-edit fs-6'></i>
                                                </button>
                                                <button type='button' onClick={() => onRemoveItemClicked(row.inventory.id)} className=' text-btn btn text-btn-danger'>
                                                    <i className='bx bxs-trash fs-6'></i>
                                                </button>
                                            </div>
                                        );
                                    }
                                }
                            ]}
                            data={selectedItems}
                        />
                    </Card>
                </Col>
                <Col lg={3}>
                    <p className="fw-bold">Allocation</p>
                    <Card>
                        <div className="mb-3">
                            <p className='text-sm text-secondary'>Estimated distribution of items for <strong className='text-dark'>{totalFamiliesToServe} families</strong>.</p>
                        </div>
                        <p className='text-sm text-secondary text-tertiary'>
                            <span>Each family will recieve:</span>
                        </p>
                        <ListGroup variant='flush'>
                            {
                                selectedItems && selectedItems.map((item, i) => (
                                    <ListGroupItem key={i} className='px-0'>
                                        <div className="flex justify-between ">
                                            <p className="my-0 text-dark fw-bold text-sm">
                                                <span>{item.inventory?.name}</span>
                                            </p>
                                            <p className="my-0 text-dark fw-bold text-sm">
                                                <span>
                                                    {item.distribution} {item.inventory.unit.sub_unit}
                                                </span>
                                            </p>
                                        </div>
                                    </ListGroupItem>
                                ))
                            }
                        </ListGroup>
                        <Button onClick={() => setShowProceedModal(true)} disabled={selectedItems.length == 0} variant='blue' className='mt-3 col-12'>
                            Proceed
                        </Button>
                    </Card>
                </Col>
            </Row>

            <ReactModal
                show={showProceedModal}
                onHide={() => setShowProceedModal(false)}
            >
                <p className='fw-bold'>Confirm action</p>
                <p className='text-dark'>Are you sure you want to proceed with this allocation?</p>
                <div className="my-3">
                    <ListGroup variant='flush'>
                        {
                            selectedItems && selectedItems.map((item, i) => (
                                <ListGroupItem key={i} className='px-0'>
                                    <div className="flex justify-between ">
                                        <p className="my-0 text-dark fw-bold text-sm">
                                            <span>{item.inventory?.name}</span>
                                        </p>
                                        <p className="my-0 text-dark fw-bold text-sm">
                                            <span>
                                                {item.rate} {item.inventory.unit.sub_unit}
                                            </span>
                                        </p>
                                    </div>
                                </ListGroupItem>
                            ))
                        }
                    </ListGroup>
                </div>
                <Button className='col-12 mt-3' variant='blue' onClick={onProceed}>Confirm</Button>
                <Button className='col-12 mt-3' variant='light' onClick={() => setShowProceedModal(false)}>Cancel</Button>
            </ReactModal>
        </DswdPanelLayout>
    )
}

export default Create
