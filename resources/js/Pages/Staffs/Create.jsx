import Card from '@/Components/Card'
import FormComponent from '@/Components/FormComponent'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { useForm } from '@inertiajs/react'
import React from 'react'

const Create = () => {

    const {data,setData,post,processing,errors} = useForm({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        password_confirmation:'',
    });

    const onSubmit = e => {
        e.preventDefault();
        post(route('pswdo.staffs.store'));
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
                >
                    <p className='fs-6 fw-semibold d-flex align-items-center gap-2 text-blue'>
                        <i className='bx bx-plus-circle'></i>
                        <span>Add new staff account</span>
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
                            onChange={e => setData('firstname',e.target.value)}
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
                            onChange={e => setData('lastname',e.target.value)}
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
                            onChange={e => setData('email',e.target.value)}
                        />
                        <p className="my-0 form-text text-danger">
                            {errors?.email ?? ''}
                        </p>
                    </div>
                    <div className="mb-3">
                        <InputLabel
                            value="Password"
                            required
                        />
                        <TextInput
                            type="password"
                            required
                            className="w-100"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                        />
                         <p className="my-0 form-text text-danger">
                            {errors?.password ?? ''}
                        </p>
                    </div>
                    <div className="mb-3">
                        <InputLabel
                            value={"Confirm password"}
                            required />
                        <TextInput
                            type="password"
                            required
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

export default Create
