import Card from '@/Components/Card'
import FormComponent from '@/Components/FormComponent'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { useForm } from '@inertiajs/react'
import React from 'react'

const Edit = ({ staff }) => {

    const { data, setData, patch, processing, errors } = useForm({
        firstname: staff.firstname,
        lastname: staff.lastname,
        email: staff.email,
        password: '',
        password_confirmation: '',
    });

    const onSubmit = e => {
        e.preventDefault();
        patch(route('pswdo.staffs.update', staff.id));
    }

    return (
        <DswdPanelLayout
            headerTitle='Manage Staff Accounts'
            activeLink='staffs'
        >
            <Card>
                <FormComponent
                    onSubmit={onSubmit}
                    cancelButtonLink={route('pswdo.staffs.index')}
                    submitButtonPos='end'
                    processing={processing}
                >
                    <p className='fs-6 fw-semibold d-flex align-items-center gap-2 text-blue'>
                        <i className='bx bx-edit'></i>
                        <span>Update staff account</span>
                    </p>
                    <hr />
                    <div className="mb-3">
                        <InputLabel
                            value="Firstname"
                            required
                        />
                        <TextInput
                            className="w-100"
                            value={data.firstname}
                            required
                            onChange={e => setData('firstname', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <InputLabel
                            value="Lastname"
                            required
                        />
                        <TextInput
                            required
                            className="w-100"
                            value={data.lastname}
                            onChange={e => setData('lastname', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <InputLabel
                            value="Email Address"
                            required
                        />
                        <TextInput
                            type="email"
                            required
                            className="w-100"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                        />
                        <p className="my-0 form-text text-danger">
                            {errors?.email ?? ''}
                        </p>
                    </div>

                    <div className="mb-3">
                        <InputLabel
                            value="Password"
                        />
                        <TextInput
                            type="password"

                            className="w-100"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />
                        <p className="my-0 form-text text-danger">
                            {errors?.password ?? ''}
                        </p>
                        <p className="my-1 form-text">You can leave this blank if you don't want to change the password.</p>

                    </div>
                    <div className="mb-3">
                        <InputLabel
                            value={"Confirm password"}
                        />
                        <TextInput
                            type="password"
                            className="w-100"
                            value={data.password_confirmation}
                            onChange={e => setData('password_confirmation', e.target.value)}
                        />
                        <p className="my-0 form-text text-danger">
                            {errors?.password_confirmation ?? ''}
                        </p>
                    </div>
                </FormComponent>
            </Card>
        </DswdPanelLayout>
    )
}

export default Edit
