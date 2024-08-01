import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Link, useForm, usePage } from '@inertiajs/react'
import React from 'react'
import { Button, Container, Form } from 'react-bootstrap'

const Create = ({ auth }) => {
    const { data, setData, errors, post } = useForm({
        name: ''
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route('pswdo.municipalities.store'));
    }
    return (
        <DswdPanelLayout
            headerTitle='Municipalities'
            activeLink='municipalities'
        >
            <div>
                <p className='form-text'>Add new Municipality</p>
                <hr />
                <Form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <Form.Label>Name of municipality:</Form.Label>
                        <Form.Control
                            autoFocus
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 mt-4">
                        <Button variant='light' size='sm' as={Link} href={route('pswdo.municipalities.index')}>
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
