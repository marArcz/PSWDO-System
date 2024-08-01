import Checkbox from '@/Components/Checkbox'
import Container from '@/Components/Container'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Link, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'

const Create = ({ auth, municipality }) => {
    const [showPassword, setShowPassword] = useState(true)
    const { data, setData, processing, post, errors } = useForm({
        firstname: '',
        lastname: '',
        email: '',
        password: municipality.name
    })

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('municipalities.lguAdmin.store', { id: municipality.id }))
    }

    return (
        <DswdPanelLayout
            headerTitle='Barangay Admin'

            activeLink='barangays'
        >
            <div className="col-lg-8 mx-auto">
                <Card>
                    <Card.Body>
                        <p className=' capitalize form-text mb-3'>Adding new LGU admin</p>
                        <hr />
                        <div>
                            <Form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <InputLabel htmlFor="barangay" value="Municipality" className='text-secondary' />
                                    <TextInput
                                        id="barangay"
                                        type="text"
                                        readOnly
                                        disabled
                                        value={municipality.name}
                                        className="mt-1 block w-full text-secondary"
                                        isFocused={false}
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel htmlFor="firstname" value="Firstname" />
                                    <TextInput
                                        id="firstname"
                                        type="text"
                                        value={data.firstname}
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        required
                                        onChange={(e) => setData('firstname', e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel htmlFor="lastname" value="Lastname" />
                                    <TextInput
                                        id="lastname"
                                        type="text"
                                        value={data.lastname}
                                        className="mt-1 block w-full"
                                        isFocused={false}
                                        required
                                        onChange={(e) => setData('lastname', e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <InputLabel htmlFor="email" value="Email Address" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        isFocused={false}
                                        required
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="mb-3">
                                    <InputLabel htmlFor="password" value="Password" className='text-secondary' />
                                    <TextInput
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        readOnly
                                        value={data.password}
                                        className="mt-1 block w-full text-secondary"
                                        isFocused={false}
                                        required
                                    />
                                </div>
                                <div className="block">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="show-password"
                                            checked={showPassword}
                                            onChange={(e) => setShowPassword(e.target.checked)}
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Show Password</span>
                                    </label>
                                </div>
                                <div className="flex justify-end items-center gap-2">
                                    <Button
                                        as={Link}
                                        href={route('municipalities.index')}
                                        variant='light'
                                        className=''
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type='submit'
                                        variant='primary'
                                        className='px-3'
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </DswdPanelLayout>
    )
}

export default Create
