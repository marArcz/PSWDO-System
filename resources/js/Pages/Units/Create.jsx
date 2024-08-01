import Card from '@/Components/Card'
import FormComponent from '@/Components/FormComponent'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { useForm } from '@inertiajs/react'
import React from 'react'

const Create = () => {
    const {data,setData,post,processing} = useForm({
        name:'',
        sub_unit:''
    })

    const onSubmit = e => {
        e.preventDefault();
        post(route("pswdo.units.store"));
    }

    return (
        <DswdPanelLayout
            headerTitle='Manage Inventory Unit'
            activeLink='units'
        >
            <Card>
            <FormComponent
             submitButtonPos='end'
             onSubmit={onSubmit}
            >
                <p className='text-blue fw-semibold'>Create New Unit</p>
                <hr />
                <div className="mb-3">
                    <InputLabel required>Name (eg. Sack) :</InputLabel>
                    <TextInput
                        type="text"
                        value={data.name}
                        required
                        className="w-full"
                        onChange={e => setData("name",e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <InputLabel required>Sub Unit (eg. kg) :</InputLabel>
                    <TextInput
                        type="text"
                        value={data.sub_unit}
                        required
                        className="w-full"
                        onChange={e => setData("sub_unit",e.target.value)}
                    />
                </div>
            </FormComponent>
            </Card>
        </DswdPanelLayout>
    )
}

export default Create
