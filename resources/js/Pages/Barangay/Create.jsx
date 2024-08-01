import Container from '@/Components/Container'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Link, useForm } from '@inertiajs/react'
import React from 'react'
import { Card, Form } from 'react-bootstrap'

const Create = ({ auth,municipality }) => {
    const { data, setData, post, processing } = useForm({
        name: '',
        families:0,
        households:0,
        evac_centers:0,
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('pswdo.municipalities.barangays.store',{municipality:municipality.id}));
    }

    return (
        <DswdPanelLayout
            headerTitle='Barangay'
            activeLink='municipalities'
            backButtonLink={route('pswdo.municipalities.barangays.index',{municipality:municipality.id})}
        >
            <div>

                <div className="col-lg-10">
                    <Form onSubmit={onSubmit}>
                        <p className="form-text">Adding new barangay</p>
                        <hr />
                        <div className="mb-3">
                            <InputLabel htmlFor="name" value="Municipality" className='text-secondary'/>
                            <TextInput
                                id="name"
                                type="text"
                                value={municipality.name}
                                readonly
                                disabled
                                className="mt-1 block w-full disabled"
                            />
                        </div>
                        <div className="mb-3">
                            <InputLabel htmlFor="name" value="Barangay Name" required />
                            <TextInput
                                id="name"
                                type="text"
                                value={data.name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                required
                                onChange={(e) => setData('name', e.target.value)}
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
                            <InputLabel htmlFor="evac_centers" value="No. of Evacuation centers" />
                            <TextInput
                                id="evac_centers"
                                type="number"
                                value={data.evac_centers}
                                className="mt-1 block w-full"
                                isFocused={false}
                                onChange={(e) => setData('evac_centers', e.target.value)}
                            />
                        </div>
                        <div className="text-end">
                            <Link
                                href={route('pswdo.municipalities.barangays.index',{municipality:municipality.id})}
                            >
                                <PrimaryButton
                                    type="button"
                                    bg='light'
                                    className='me-2'
                                >
                                    <span className="text-primary">Cancel</span>
                                </PrimaryButton>
                            </Link>
                            <PrimaryButton
                                type="submit"
                            >
                                Submit
                            </PrimaryButton>
                        </div>
                    </Form>
                </div>
            </div >
        </DswdPanelLayout >
    )
}

export default Create
