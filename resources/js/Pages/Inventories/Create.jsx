import Card from '@/Components/Card'
import FormComponent from '@/Components/FormComponent'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { useForm } from '@inertiajs/react'
import React from 'react'
import { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import CreatableSelect from 'react-select/creatable';


const Create = ({ fromTags, units = [] }) => {

    const { data, setData, post, processing } = useForm({
        name: '',
        quantity: '',
        unit: units.length > 0 ? units[0].name : "",
        unit_cost: '',
        expiration: '',
        from: '',
        batch_no: '',
        unit_id: units.length > 0 ? units[0].id : "",
        sub_unit_quantity: ''
    });

    const [selectedUnit, setSelectedUnit] = useState(units.length > 0 ? units[0] : null)

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('pswdo.inventories.store'))
    }

    const onSelectUnit = (e) => {
        let id = e.target.value;

        let unit = units.find((u, index) => u.id == id);
        console.log(unit)
        setSelectedUnit(unit);
        setData("unit",unit.name)
        setData("unit_id",id)
    }

    return (
        <DswdPanelLayout
            headerTitle='Inventories'
            activeLink='inventories'
        >
            <div className="">
                <Card className='rounded-3 '>
                    <FormComponent
                        cancelButtonLink={route('pswdo.inventories.index')}
                        onSubmit={onSubmit}
                    >
                        <p className="form-text mb-3 text-blue fs-6 fw-semibold">Add new inventory item</p>
                        <hr />

                        <div className="mb-4">
                            <Row className='gy-3'>
                                <Col md>
                                    <InputLabel htmlFor="batch_no" required value="Batch No." className='mb-2' />
                                    <TextInput
                                        id="name"
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
                        <div className="mb-4">
                            <Row className='gy-3'>
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
                                    <InputLabel htmlFor="quantity" value={`Sub Unit quantity ${selectedUnit ? `(${selectedUnit.sub_unit})` : ''}`} />
                                    <TextInput
                                        id="quantity"
                                        type="number"
                                        value={data.sub_unit_quantity}
                                        onChange={e => setData('sub_unit_quantity', e.target.value)}
                                        className="mt-1 block w-full disabled"
                                        placeholder={`${selectedUnit ? `${selectedUnit.sub_unit} in 1 ${selectedUnit.name}` : ''}`}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className="mb-5">
                            <Row>
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
            </div>
        </DswdPanelLayout>
    )
}

export default Create
