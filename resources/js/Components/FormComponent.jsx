import { Link } from '@inertiajs/react'
import React from 'react'
import { Button, Form } from 'react-bootstrap'

const FormComponent = ({ children, onSubmit,cancelButtonLink="",processing=false,submitButtonPos="start" }) => {
    return (
        <Form onSubmit={onSubmit}>
            {children}
            <div className={`flex gap-2 mt-4 justify-${submitButtonPos}`}>
                <Button disabled={processing} variant='secondary' className=''  as={Link} href={cancelButtonLink}>
                    {'Cancel'}
                </Button>
                <Button disabled={processing} type='submit' >
                    Submit
                </Button>
            </div>
        </Form>
    )
}

export default FormComponent
