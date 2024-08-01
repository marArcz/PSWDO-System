import Card from '@/Components/Card'
import DataTableComponent from '@/Components/DataTableComponent'
import InputLabel from '@/Components/InputLabel'
import ReactModal from '@/Components/ReactModal'
import TextInput from '@/Components/TextInput'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { find } from 'highcharts'
import React from 'react'
import { useState } from 'react'
import { Button, ButtonGroup, DropdownButton, Form, InputGroup, ListGroup, ListGroupItem, Dropdown, Row, Col } from 'react-bootstrap'
import DataTable from 'react-data-table-component'

const Calculator = ({ inventories }) => {
    const [isUpdating, setIsUpdating] = useState(false)
    const DISTRIBUTE_BY_UNIT = 0
    const DISTRIBUTE_BY_SUB_UNIT = 1
    const [totalFamilies, setTotalFamilies] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState({})
    const [selectedItems, setSelectedItems] = useState([])
    const [itemDistribution, setItemDistribution] = useState(null)

    const [showResultModal, setShowResultModal] = useState(false)

    const isItemAdded = (inventoryId) => {
        let inventory = selectedItems.find((v, i) => v.inventory.id == inventoryId);
        return inventory != undefined;
    }

    const addItem = (inventory) => {
        setSelectedItem(inventory)

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
                distribute_to: 'Families',
                rate: 1
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
            let items = selectedItems.map((item, index) => item.inventory.id == itemDistribution.inventory.id ? itemDistribution : item);
            setSelectedItems(items);
        } else {
            setSelectedItems(s => ([...s, itemDistribution]));
        }

        setItemDistribution(null);

        setShowAddModal(false)
    }



    const onRemoveItemClicked = (inventoryId) => {
        setSelectedItems(s => (s.filter((v) => v.inventory.id != inventoryId)))
    }

    const onAllocationFormSubmit = (e) => {

    }

    return (
        <DswdPanelLayout
            headerTitle='Allocation Calculator'
            activeLink='calculator'
        >
            <Row>
                <Col>
                    {/* inventory section */}
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
                                        selector: row => row.quantity + ` (${row.unit.name}) | ${row.sub_unit_quantity} ${row.unit.sub_unit} per ${row.unit.name}`
                                    },
                                    {
                                        name: 'Action',
                                        cell: row => (
                                            <>
                                                {
                                                    isItemAdded(row.id) ? (
                                                        <Button size='sm' variant='tertiary' className='text-light' onClick={() => addItem(row)} type='button'>Selected</Button>
                                                    ) : (
                                                        <Button size='sm' variant='secondary' className='' onClick={() => addItem(row)} type='button'>Select</Button>
                                                    )
                                                }
                                            </>
                                        )
                                    },

                                ]}
                                data={inventories}
                            />
                        </div>
                    </Card>

                    {/* items to distribute section */}
                    <div className="flex gap-2 items-center mb-2">
                        <div className='w-[10px] h-[10px] bg-blue rounded-full'></div>
                        <p className='fs-6 text-dark my-0 fw-bold'>
                            Target distribution
                        </p>
                    </div>
                    <Card className='py-3 mb-3'>
                        <p className='text-secondary'>
                            <small>Items to be distributed</small>
                        </p>
                        <DataTableComponent
                            className=''
                            selectableRows={false}
                            pagination={false}
                            hideActionButtons
                            columns={[
                                {
                                    name: 'Item',
                                    selector: row => row.inventory.name
                                },
                                {
                                    name: 'Amount of distribution',
                                    selector: row => `${row.rate} ${row.distribution == DISTRIBUTE_BY_UNIT ? row.inventory.unit.name : row.inventory.unit.sub_unit} / ${row.distribute_to}`
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
                    <p className='fw-bold mb-3'>Compute Allocation</p>
                    <Card>
                        <div className="">
                            <p className='text-sm text-secondary'>Determine the number of families that can be accomodated with the current inventory stocks.</p>
                            <Button className='btn-sm col-12' onClick={() => setShowResultModal(true)} variant='blue'>Compute</Button>
                        </div>
                        {/* <form onSubmit={onAllocationFormSubmit}>
                            <div className="mb-3">
                                <Form.Label>No. of families</Form.Label>
                                <Form.Control
                                    value={totalFamilies}
                                    onChange={e => setTotalFamilies(e.target.value)}
                                    type='number'
                                    min="1"
                                />
                            </div>
                        </form> */}
                    </Card>
                </Col>
            </Row>

            {/* modal */}
            <ReactModal
                show={showAddModal}
                onHide={() => setShowAddModal(false)}

            >
                {selectedItem && itemDistribution && (
                    <form onSubmit={onAddItemSubmit}>
                        {/* <p className='text-sm fw-medium text-secondary mb-3'>Add Item</p> */}
                        <div className="mb-4">
                            <p className='fw-bold fs-5 text-dark my-0 text-underline'>{selectedItem.name}</p>
                            <p className='text-sm text-secondary my-2'>Currently have <strong>{selectedItem.quantity} {selectedItem.unit?.name}</strong> </p>
                        </div>
                        <div className="mb-3">
                            <InputLabel>Distribute to</InputLabel>
                            <Form.Select
                                value={itemDistribution.distribute_to}
                                onChange={e => setItemDistribution(data => ({ ...data, distribute_to: e.target.value }))}
                            >
                                <option value="Families">Families</option>
                                <option value="Barangay">Barangay</option>
                            </Form.Select>
                        </div>

                        <div className="mb-3">
                            <InputLabel>Rate of distribution ({itemDistribution.distribution == DISTRIBUTE_BY_UNIT ? itemDistribution.inventory.unit.name : itemDistribution.inventory.unit.sub_unit})</InputLabel>
                            <InputGroup>
                                <Form.Control
                                    required
                                    max={itemDistribution.distribution == DISTRIBUTE_BY_UNIT ? selectedItem.quantity : null}
                                    type="number"
                                    value={itemDistribution.rate ?? 1}
                                    placeholder={'Quantity - ' + (itemDistribution.distribution == DISTRIBUTE_BY_UNIT ? itemDistribution.inventory.unit.name : itemDistribution.inventory.unit.sub_unit)}
                                    aria-label="Quantity"
                                    min={1}
                                    aria-describedby="btnGroupAddon"
                                    onChange={e => setItemDistribution(s => ({ ...s, rate: e.target.value }))}
                                />
                                <DropdownButton onSelect={e => setItemDistribution(s => ({ ...s, distribution: e }))} variant='secondary' as={ButtonGroup} title={itemDistribution.distribution == DISTRIBUTE_BY_UNIT ? itemDistribution.inventory.unit.name : itemDistribution.inventory.unit.sub_unit} id="bg-nested-dropdown">
                                    <Dropdown.Item eventKey={DISTRIBUTE_BY_UNIT}>{itemDistribution.inventory.unit.name}</Dropdown.Item>
                                    <Dropdown.Item eventKey={DISTRIBUTE_BY_SUB_UNIT}>{itemDistribution.inventory.unit.sub_unit}</Dropdown.Item>
                                </DropdownButton>
                            </InputGroup>

                            <Button className='col-12 mt-4' type='submit' variant='blue'>{isUpdating ? 'Save changes' : 'Add Item'}</Button>
                            <Button className='col-12 mt-2' type='button' variant='light' onClick={() => setShowAddModal(false)}>Cancel</Button>
                        </div>
                    </form>
                )}
            </ReactModal>

            <ReactModal
                show={showResultModal}
                onHide={() => setShowResultModal(false)}
                size='xl'
            >
                {
                    selectedItems && (
                        <div>
                            <p className='text-secondary'>
                                <small>Estimated allocation</small>
                            </p>
                            <DataTableComponent
                                className=''
                                selectableRows={false}
                                pagination={false}
                                hideActionButtons
                                columns={[
                                    {
                                        name: 'Item',
                                        selector: row => row.inventory.name
                                    },
                                    {
                                        name: 'Quantity',
                                        selector: row => row.inventory.quantity + ` (${row.inventory.unit.name}) | ${row.inventory.sub_unit_quantity} ${row.inventory.unit.sub_unit} per ${row.inventory.unit.name}`
                                    },
                                    {
                                        name: 'Amount of distribution',
                                        selector: row => `${row.rate} ${row.distribution == DISTRIBUTE_BY_UNIT ? row.inventory.unit.name : row.inventory.unit.sub_unit} / ${row.distribute_to}`
                                    },
                                    {
                                        name: 'Families that can accomodate',
                                        cell: row => {
                                            if (row.distribution == DISTRIBUTE_BY_UNIT) {

                                            }
                                            return (
                                                <div>
                                                    {
                                                        row.distribution == DISTRIBUTE_BY_UNIT ? (
                                                            <p className='my-1'>{Math.floor(row.inventory.quantity / row.rate)} families</p>
                                                        ) : (
                                                            <p className='my-1'>
                                                                {Math.floor((row.inventory.quantity * row.inventory.sub_unit_quantity) / row.rate)} families
                                                            </p>
                                                        )
                                                    }
                                                </div>
                                            )
                                        }
                                    }
                                ]}
                                data={selectedItems}
                            />

                        </div>
                    )
                }

            </ReactModal>

        </DswdPanelLayout>
    )
}

export default Calculator
