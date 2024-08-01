import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Link, useForm } from '@inertiajs/react'
import React from 'react'
import { Button, Col, Form } from 'react-bootstrap'

const Edit = ({ municipality }) => {
    const { data, setData, patch } = useForm({
        name: municipality.name
    });

    const onSubmit = e => {
        e.preventDefault();

        patch(route("pswdo.municipalities.update", { municipality: municipality.id }))
    }

    return (
        <DswdPanelLayout
            headerTitle='Municipalities'
            backButtonLink={route("pswdo.municipalities.index")}
        >
            <Col className='col-lg-10'>
                <Form onSubmit={onSubmit}>
                    <p className="form-text">Editing Municipality</p>
                    <hr />
                    <div className="mb-3">
                        <Form.Label>
                            Name of municipality:
                        </Form.Label>
                        <Form.Control
                            type='text'
                            value={data.name}
                            autoFocus
                            required
                            onChange={e => setData("name",e.target.value)}
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
            </Col>
        </DswdPanelLayout>
    )
}

export default Edit
