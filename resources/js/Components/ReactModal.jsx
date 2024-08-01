import React from 'react'
import { Modal } from 'react-bootstrap'

const ReactModal = ({ show = false, onHide, centered = true, children, size = "md", className = "" }) => {
    return (
        <Modal
            dialogClassName={className}
            show={show}
            onHide={onHide}
            centered={centered}
            className='my-0'
            size={size}
        >
            <Modal.Body className='p-4'>
                {children}
            </Modal.Body>
        </Modal>
    )
}

export default ReactModal
