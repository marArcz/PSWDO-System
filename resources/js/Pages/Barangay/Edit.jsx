import Container from '@/Components/Container'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Link, useForm } from '@inertiajs/react'
import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'

const Edit = ({ auth, barangay }) => {
    const { data, setData, patch, processing } = useForm({
        name: barangay.name,
        families:barangay.families,
        households:barangay.households,
    })

    const onSubmit = (e) => {
        e.preventDefault();
        patch(route('pswdo.barangays.update', { id: barangay.id }));
    }

    return (
        <DswdPanelLayout
            backButtonLink={route('pswdo.municipalities.barangays.index',{municipality:barangay.municipality_id})}
            headerTitle="Barangay"
            activeLink='municipalities'
        >
            <div>
                <div className="col-lg-10">
                    <Card className='bg-transparent shadow-none'>
                        <Card.Body className='p-3'>
                            <Form onSubmit={onSubmit}>
                                <p className="form-text">Updating barangay</p>
                                <hr />
                                <div className="mb-3">
                                    <InputLabel htmlFor="name">
                                        <span>Barangay Name: </span>
                                        <span className='text-danger'>*</span>
                                    </InputLabel>

                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        className="mt-1 block w-full bg-light"
                                        readonly

                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel htmlFor="households" value="No. of households" />
                                    <TextInput
                                        id="households"
                                        type="number"
                                        value={data.households}
                                        className="mt-1 block w-full"
                                        isFocused={false}
                                        onChange={(e) => setData('households', e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel htmlFor="families" value="No. of families" />
                                    <TextInput
                                        id="families"
                                        type="number"
                                        value={data.families}
                                        className="mt-1 block w-full"
                                        isFocused={false}
                                        onChange={(e) => setData('families', e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end gap-2 mt-5">
                                    <Button
                                        href={route('pswdo.municipalities.barangays.index',{municipality:barangay.municipality_id})}
                                        as={Link}
                                        size='sm'
                                        variant='light'
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        size='sm'
                                    >
                                        Save changes
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </DswdPanelLayout>
    )
}

export default Edit
