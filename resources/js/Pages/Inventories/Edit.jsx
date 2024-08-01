import Card from '@/Components/Card'
import FormComponent from '@/Components/FormComponent'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { useForm } from '@inertiajs/react'
import React from 'react'
import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const Edit = ({ inventory, fromTags, units = [] }) => {
    const [selectedUnit, setSelectedUnit] = useState(inventory.unit)

    const { data, setData, patch, processing } = useForm({
        name: inventory.name,
        quantity: inventory.quantity,
        unit: inventory.unit,
        unit_cost: inventory.unit_cost,
        batch_no: inventory.batch_no,
        from: inventory.from,
        unit_id: inventory.unit_id,
        sub_unit_quantity: inventory.sub_unit_quantity,
        expiration: inventory.expiration
    });

    const onSubmit = e => {
        e.preventDefault();
        patch(route("pswdo.inventories.update", { inventory: inventory.id }))
    }

    const fromTagDataList = () => (
        <datalist>
            <option value=""></option>
        </datalist>
    );

    const onSelectUnit = (e) => {
        let id = e.target.value;

        let unit = units.find((u, index) => u.id == id);
        console.log(unit)
        setSelectedUnit(unit);
        setData("unit", unit.name)
        setData("unit_id", id)
    }

    return (
        <DswdPanelLayout
            headerTitle='Inventory'
            activeLink='inventories'
        >
            <Card>
                <FormComponent processing={processing} onSubmit={onSubmit} cancelButtonLink={route('pswdo.inventories.index')}>
                    <p className="form-text">Editing inventory item</p>
                    <hr />
                    <div className="mb-3">
                        <Row>
                            <Col md>
                                <InputLabel htmlFor="batch_no" value="Batch No." />
                                <TextInput
                                    id="batch_no"
                                    type="number"
                                    value={data.batch_no}
                                    onChange={e => setData('batch_no', e.target.value)}
                                    className="mt-1 block w-full disabled"
                                />
                            </Col>
                            <Col md>
                                <InputLabel htmlFor="name" value="Item" />
                                <TextInput
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="mt-1 block w-full disabled"
                                />
                            </Col>
                            <Col md>
                                <InputLabel htmlFor="from" value="From" />
                                <TextInput
                                    id="from"
                                    type="text"
                                    value={data.from}
                                    onChange={e => setData('from', e.target.value)}
                                    className="mt-1 block w-full disabled"
                                    list="from-tags"
                                />
                                <datalist id='from-tags'>
                                    {
                                        fromTags && fromTags.map((item, index) => (
                                            <option key={index} value={item.tag} />
                                        ))
                                    }
                                </datalist>
                            </Col>
                        </Row>
                    </div>
                    <div className="mb-5">
                        <Row>
                            <Col md>
                                <InputLabel htmlFor="unit" value="Unit (eg. Boxes)" />
                                <Form.Select value={data.unit_id} onChange={onSelectUnit}>
                                    {units && units.map((unit, index) => (
                                        <option value={unit.id} key={unit.id}>
                                            {unit.name} / {unit.sub_unit}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                            <Col md>
                                <InputLabel htmlFor="quantity" value={`Unit quantity ${selectedUnit ? `(${selectedUnit.name})` : ''}`} />
                                <TextInput
                                    id="quantity"
                                    type="number"
                                    value={data.quantity}
                                    onChange={e => setData('quantity', e.target.value)}
                                    className="mt-1 block w-full disabled"
                                    placeholder={`${selectedUnit ? `${selectedUnit.name}` : ''}`}
                                />
                            </Col>
                            <Col md>
                                <InputLabel htmlFor="sub_unit_quantity" value={`Sub Unit quantity ${selectedUnit ? `(${selectedUnit.sub_unit})` : ''}`} />
                                <TextInput
                                    id="sub_unit_quantity"
                                    type="number"
                                    value={data.sub_unit_quantity}
                                    onChange={e => setData('sub_unit_quantity', e.target.value)}
                                    className="mt-1 block w-full disabled"
                                    placeholder={`${selectedUnit ? `${selectedUnit.sub_unit} in 1 ${selectedUnit.name}` : ''}`}
                                />
                            </Col>

                        </Row>
                        <Row className='mt-3'>
                            <Col md>
                                <InputLabel htmlFor="unit_cost" value="Unit Cost" />
                                <TextInput
                                    id="unit_cost"
                                    type="number"
                                    value={data.unit_cost}
                                    onChange={e => setData('unit_cost', e.target.value)}
                                    className="mt-1 block w-full disabled"
                                />
                            </Col>
                            <Col md>
                                <InputLabel htmlFor="expiration" value="Expiration date" />
                                <TextInput
                                    id="expiration"
                                    type="date"
                                    value={data.expiration}
                                    onChange={e => setData('expiration', e.target.value)}
                                    className="mt-1 block w-full disabled"
                                />
                            </Col>
                        </Row>
                    </div>
                </FormComponent>
            </Card>

        </DswdPanelLayout>
    )
}

export default Edit
