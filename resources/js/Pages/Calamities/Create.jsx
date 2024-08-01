import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Link, useForm } from '@inertiajs/react'
import React from 'react'
import { Button, Form } from 'react-bootstrap'

const Create = () => {
    const { data, setData, post } = useForm({
        name: '',
        date_happened: ''
    });

    const onSubmit = (e) =>{
        e.preventDefault();
        post(route('pswdo.calamities.store'));
    }
    return (
        <DswdPanelLayout
            headerTitle='Typhoon'
            activeLink='typhoons'
            backButtonLink={route('pswdo.calamities.index')}
        >
            <div className="col-lg-10">
                <Form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <Form.Label>Name of typhoon:</Form.Label>
                        <Form.Control
                            type='text'
                            value={data.name}
                            required
                            onChange={e =>setData('name', e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <Form.Label>Date:</Form.Label>
                        <Form.Control
                            type='date'
                            value={data.date_happened}
                            required
                            onChange={e =>setData('date_happened', e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 mt-4">
                        <Button variant='light' size='sm' as={Link} href={route('pswdo.calamities.index')}>
                            Cancel
                        </Button>
                        <Button type='submit' size='sm'>
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </DswdPanelLayout>
    )
}

export default Create
