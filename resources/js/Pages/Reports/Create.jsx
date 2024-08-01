import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { useForm } from '@inertiajs/react'
import React from 'react'
import { useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Create = ({ municipalities, typhoons }) => {
    const [typhoonList, setTyphoonList] = useState(typhoons.map(item => ({
        value: item.id,
        label: item.name
    })))
    const [twcsNoList, setTwcsNoList] = useState([
        { value: '1', label: 'Signal No. 1' },
        { value: '2', label: 'Signal No. 2' },
        { value: '3', label: 'Signal No. 3' },
        { value: '4', label: 'Signal No. 4' },
        { value: '5', label: 'Signal No. 5' },
        { value: '6', label: 'Signal No. 6' },
    ])
    const [selectedTwcsNo, setSelectedTwcsNo] = useState(null)
    const [creatingMunicipality, setCreatingMunicipality] = useState(false)
    const [creatingTyphoon, setCreatingTyphoon] = useState(false);
    const [selectedMunicipality, setSelectedMunicipality] = useState(null)
    const [selectedTyphoon, setSelectedTyphoon] = useState(null)

    const { data, setData, post, processing } = useForm({
        municipality: '',
        calamity: '',
        municipality_name: '',
        calamity_id: '',
        typhoon_level: '',
        lce_present: 'Yes',
        no_of_barangay_covered: '',
        no_of_punong_barangay_present: '',
        remarks: '',
        no_of_families: '',
        no_of_barangay: '',
        no_of_evacuation: '',
        no_of_families_served: '',
        no_of_barangay_conducted_evacuation: '',
        total_served: '',
        total_barangay_served: '',
        power_supply_status: '',
        water_supply_status: '',
        telecommunication_status: '',
        roads_and_bridges_status: '',
    })

    const handleCreateTyphoon = (name) => {
        var formData = new FormData();
        formData.append("name", name);
        setCreatingTyphoon(true)
        axios.post('/api/typhoons/create', formData)
            .then(res => {
                setCreatingTyphoon(false)
                toast.success("Added a new typhoon!");
                setTyphoonList(res.data.typhoons.map((item) => ({
                    value: item.id,
                    label: item.name
                })))
                setSelectedTyphoon({
                    value: res.data.newItem.id,
                    label: res.data.newItem.name
                })
                setData('calamity_name',res.data.newItem.name)
            })
            .catch(err => {
                console.log('err: ', err)
                setCreatingTyphoon(false)
                toast.error("Something please try again later!")
            })
    }


    useEffect(() => {
        setData("typhoon_level", selectedTwcsNo?.value ?? '')
    }, [selectedTwcsNo])

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("pswdo.reports.store"));
    }
    return (
        <DswdPanelLayout
            headerTitle='Reports'
            backButtonLink={route("pswdo.reports.index")}
            activeLink='reports'
        >
            <Card className='border-0 shadow-sm'>
                <Card.Body className='p-lg-5 p-3'>
                    <Form onSubmit={onSubmit}>
                        <p className='text-dark fw-semibold fs-5'>Add Report</p>
                        <hr />
                        <Row className="mb-4 g-4">
                            <Col xl md={12}>
                                <InputLabel required htmlFor="name" value="Municipality" className='mb-2' />
                                <Select
                                    options={municipalities.map((item) => ({
                                        value: item.id,
                                        label: item.name
                                    }))}
                                    value={selectedMunicipality}
                                    onChange={(v) => {
                                        console.log(v)
                                        setSelectedMunicipality(v)
                                        setData('municipality_name', v.label)
                                    }}
                                    required
                                    className='shadow-sm'
                                />
                            </Col>
                            <Col xl md={12}>
                                <InputLabel htmlFor="name" required value="Typhoon" className='mb-2' />
                                <CreatableSelect
                                    placeholder="Enter or select typhoon"
                                    options={typhoonList}
                                    value={selectedTyphoon}
                                    required
                                    onChange={v => {
                                        setSelectedTyphoon(v)
                                        setData('calamity_name', v.label)
                                    }}
                                    isLoading={creatingTyphoon}
                                    onCreateOption={handleCreateTyphoon}
                                    className='shadow-sm'
                                />
                            </Col>
                            <Col xl md={12}>
                                <InputLabel htmlFor="name" required value="TWCS No." className='mb-2' />
                                <Select
                                    placeholder="Enter or select TWCS No"
                                    options={twcsNoList}
                                    value={selectedTwcsNo}
                                    onChange={v => setSelectedTwcsNo(v)}
                                    required
                                    isLoading={creatingTyphoon}
                                    className='shadow-sm'
                                />
                            </Col>
                        </Row>
                        <hr />
                        <p className='fw-semibold text-blue mb-4'>Coverage Awareness</p>
                        <Row className='mb-3 g-4 align-items-end'>
                            <Col md={4}>
                                <InputLabel htmlFor=""
                                    required
                                    value="LCE Present in the AOR:"
                                    className='mb-2' />

                                <Form.Select
                                    value={data.lce_present}
                                    onChange={e => setData("lce_present", e.target.value)}
                                    required
                                    placeholder='Select'
                                    className='shadow-sm'
                                >
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </Form.Select>
                            </Col>
                            <Col md={4}>
                                <InputLabel htmlFor=""
                                    required
                                    value="No. of Barangays"
                                    className='mb-2' />
                                <Form.Control
                                    type="number"
                                    value={data.no_of_barangay_covered}
                                    onChange={e => setData('no_of_barangay_covered', e.target.value)}
                                    className="mt-1 block w-full shadow-sm"
                                    required
                                />
                            </Col>
                            <Col md={4}>
                                <InputLabel htmlFor=""
                                    value="No. of Punong Barangay Present in AOR"
                                    className='mb-2' />
                                <Form.Control
                                    type="number"
                                    value={data.no_of_punong_barangay_present}
                                    onChange={e => setData('no_of_punong_barangay_present', e.target.value)}
                                    className="mt-1 block w-full shadow-sm"
                                />
                            </Col>
                            <Col md={4}>
                                <InputLabel htmlFor=""
                                    value="Remarks"
                                    className='mb-2' />
                                <Form.Control
                                    type="text"
                                    value={data.remarks}
                                    onChange={e => setData('remarks', e.target.value)}
                                    className="mt-1 block w-full shadow-sm"
                                />
                            </Col>
                        </Row>
                        <hr />
                        <Row className='gx-4 gy-3 mb-3'>
                            <Col md={12}>
                                <p className='mb-4 text-blue fw-semibold'>Evacuation Profile</p>
                                <div className="mb-3">
                                    <InputLabel
                                        required
                                        htmlFor=""
                                        value="No. of Families"
                                        className='mb-2' />
                                    <Form.Control
                                        type="number"
                                        value={data.no_of_families}
                                        required
                                        onChange={e => setData('no_of_families', e.target.value)}
                                        className="mt-1 block w-full shadow-sm"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        required
                                        htmlFor=""
                                        value="No. of Barangay"
                                        className='mb-2' />
                                    <Form.Control
                                        type="number"
                                        value={data.no_of_barangay}
                                        required
                                        onChange={e => setData('no_of_barangay', e.target.value)}
                                        className="mt-1 block w-full shadow-sm"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        required
                                        htmlFor=""
                                        value="No. of Evacuation Center"
                                        className='mb-2' />
                                    <Form.Control
                                        type="number"
                                        value={data.no_of_evacuation}
                                        required
                                        onChange={e => setData('no_of_evacuation', e.target.value)}
                                        className="mt-1 block w-full shadow-sm"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        required
                                        htmlFor=""
                                        value="No. of Families Served"
                                        className='mb-2' />
                                    <Form.Control
                                        type="number"
                                        value={data.no_of_families_served}
                                        required
                                        onChange={e => setData('no_of_families_served', e.target.value)}
                                        className="mt-1 block w-full shadow-sm"
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel
                                        required
                                        htmlFor=""
                                        value="No. of Brgy. Conducted Evacuation"
                                        className='mb-2' />
                                    <Form.Control
                                        type="number"
                                        value={data.no_of_barangay_conducted_evacuation}
                                        required
                                        onChange={e => setData('no_of_barangay_conducted_evacuation', e.target.value)}
                                        className="mt-1 block w-full shadow-sm"
                                    />
                                </div>
                            </Col>
                            <Col md={12}>
                                <p className='mb-4 text-blue fw-semibold'>Relief Operation Conducted</p>
                                <Row className='g-3'>
                                    <Col md>
                                        <InputLabel
                                            required
                                            htmlFor=""
                                            value="Total Served"
                                            className='mb-2' />
                                        <Form.Control
                                            type="number"
                                            value={data.total_served}
                                            required
                                            onChange={e => setData('total_served', e.target.value)}
                                            className="mt-1 block w-full shadow-sm"
                                        />
                                    </Col>
                                    <Col md>
                                        <InputLabel
                                            required
                                            htmlFor=""
                                            value="Total No. of Brgy. Served:"
                                            className='mb-2' />
                                        <Form.Control
                                            type="number"
                                            value={data.total_barangay_served}
                                            required
                                            onChange={e => setData('total_barangay_served', e.target.value)}
                                            className="mt-1 block w-full shadow-sm"
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <hr />
                        <p className="fw-semibold text-blue">Status of Lifelines</p>
                        <Row className='g-4'>
                            <Col lg={4}>
                                <InputLabel
                                    required
                                    htmlFor=""
                                    value="Power Supply:"
                                    className='mb-2' />
                                <Form.Control
                                    placeholder='Enter Status'
                                    type="text"
                                    value={data.power_supply_status}
                                    required
                                    onChange={e => setData('power_supply_status', e.target.value)}
                                    className="mt-1 block w-full shadow-sm"
                                />
                            </Col>
                            <Col lg={4}>
                                <InputLabel
                                    required
                                    htmlFor=""
                                    value="Water Supply:"
                                    className='mb-2' />
                                <Form.Control
                                    placeholder='Enter Status'
                                    type="text"
                                    value={data.water_supply_status}
                                    required
                                    onChange={e => setData('water_supply_status', e.target.value)}
                                    className="mt-1 block w-full shadow-sm"
                                />
                            </Col>
                            <Col lg={4}>
                                <InputLabel
                                    required
                                    htmlFor=""
                                    value="Telecommunication:"
                                    className='mb-2' />
                                <Form.Control
                                    placeholder='Enter Status'
                                    type="text"
                                    value={data.telecommunication_status}
                                    required
                                    onChange={e => setData('telecommunication_status', e.target.value)}
                                    className="mt-1 block w-full shadow-sm"
                                />
                            </Col>
                            <Col lg={4}>
                                <InputLabel
                                    required
                                    htmlFor=""
                                    value="Roads and Bridges"
                                    className='mb-2' />
                                <Form.Control
                                    placeholder='Enter Status'
                                    type="text"
                                    value={data.roads_and_bridges_status}
                                    required
                                    onChange={e => setData('roads_and_bridges_status', e.target.value)}
                                    className="mt-1 block w-full shadow-sm"
                                />
                            </Col>
                        </Row>
                        <br /><br />
                        <div className="text-end">
                            <Button
                                disabled={processing || (data.calamity_id == '' && data.municipality_id == '')}
                                type="submit"
                                variant='primary'
                                className='fw-normal rounded-1 d-flex align-items-center ms-auto'
                            >
                                <span className="fw-normal ">Add Report</span>
                                <i className='ms-2 fi fi-rr-disk'></i>
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </DswdPanelLayout >
    )
}

export default Create
