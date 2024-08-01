import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { Button, ButtonGroup, DropdownButton, Form, InputGroup, ListGroup, ListGroupItem, Dropdown, Row, Col, Table } from 'react-bootstrap'
import { useReactToPrint } from 'react-to-print';
const RisForm = ({ distribution }) => {
    const totalRows = 21;
    const [risRowsLeft, setRisRowsLeft] = useState(totalRows - distribution.distribution_items.length);

    const formRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => formRef.current,
    });

    return (
        <>
            <div className="flex justify-between items-center">
                <p className="my-0 fw-bold">RIS FORM</p>
                <Button
                    onClick={() => handlePrint()}
                >
                    <span className="me-2">Print</span>
                    <i className="bx bx-printer"></i>
                </Button>
            </div>
            <hr />
            <div className="">
                <div id="ris-form" className="mb-10 overflow-auto">
                    <div className="ris-form border bg-white" ref={formRef}>
                        <div className="content my-2">
                            <table className='table table-bordered border-2 my-0 border-dark text-center'>
                                <tbody>
                                    <tr>
                                        <td colSpan={7} className='py-1'>
                                            <p className='fw-bold text-center text-lg'>REQUISITION AND ISSUE SLIP</p>

                                            <div className="flex">
                                                <p className='my-0 fw-bold'>LGU:</p>
                                                <p className='my-0 fw-bold text-decoration-underline ms-2'>Provincial Government of Catanduanes</p>
                                                <p className='my-0 fw-bold ms-5'>Fund:</p>
                                                <p className='my-0 fw-bold ms-3'>______________________</p>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} className='py-1'>
                                            <div className="row gap-0 max-w-[100%]">
                                                {/* division */}
                                                <div className='col'>
                                                    <div className="row">
                                                        <p className="my-0 col-auto fw-bold">Division:</p>
                                                        <div className='col align-self-end bg-dark h-[1px]'>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* FPP code */}
                                                <div className='col'>
                                                    <div className="row">
                                                        <p className="my-0 col-auto fw-bold">FPP Code:</p>
                                                        <div className='col align-self-end bg-dark h-[1px]'>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row gap-0 max-w-[100%] mt-3">
                                                {/* office */}
                                                <div className='col-4'>
                                                    <div className="row">
                                                        <p className="my-0 col-auto fw-bold">Office:</p>
                                                        <div className='col align-self-end bg-dark h-[1px]'>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* RIS NO */}
                                                <div className='col-4'>
                                                    <div className="row">
                                                        <p className="my-0 col-auto fw-bold">RIS No:</p>
                                                        <div className='col align-self-end bg-dark h-[1px]'>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Date */}
                                                <div className='col-4'>
                                                    <div className="row">
                                                        <p className="my-0 col-auto fw-bold">Date:</p>
                                                        <div className='col align-self-end bg-dark h-[1px]'>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={4} className='text-center fw-bold py-1'>
                                            Requisition
                                        </td>
                                        <td colSpan={3} className='text-center fw-bold py-1'>Issuance</td>
                                    </tr>
                                    <tr>
                                        <td className='p-0 fw-bold w-[100px]'>Stock No</td>
                                        <td className='p-0 fw-bold w-[80px]'>Unit</td>
                                        <td className='p-0 fw-bold'>Description</td>
                                        <td className='p-0 fw-bold'>Quantity</td>
                                        <td className='p-0 fw-bold'>Quantity</td>
                                        <td className='p-0 fw-bold'>Remarks</td>
                                    </tr>
                                    {
                                        distribution.distribution_items.map((item, index) => (
                                            <tr>
                                                <td className='fw-bold text-sm'>{item.batch_no ?? 1}</td>
                                                <td className='fw-bold text-sm'>{item.unit?.name}</td>
                                                <td className='fw-bold text-sm'>{item.name}</td>
                                                <td className='fw-bold text-sm'>{item.quantity}</td>
                                                <td className='fw-bold text-sm'>{item.quantity}</td>
                                                <td className='fw-bold text-sm'></td>
                                            </tr>
                                        ))
                                    }
                                    {
                                        (Array(risRowsLeft).fill('', 0))
                                            .map((v, index) => (
                                                <tr key={index}>
                                                    <td className='fw-bold py-[1.15rem!important]'></td>
                                                    <td className='fw-bold py-[1.15rem!important]'></td>
                                                    <td className='fw-bold py-[1.15rem!important]'></td>
                                                    <td className='fw-bold py-[1.15rem!important]'></td>
                                                    <td className='fw-bold py-[1.15rem!important]'></td>
                                                    <td className='fw-bold py-[1.15rem!important]'></td>
                                                </tr>
                                            ))
                                    }
                                    <tr>
                                        <td colSpan={6} className='fw-bold py-3 text-start'>
                                            Purpose
                                        </td>
                                    </tr>
                                    {/* last row */}
                                    <tr>
                                        <td colSpan={2}></td>
                                        <td className='fw-bold w-[200px]'>Requested by:</td>
                                        <td className='fw-bold'>Approved by:</td>
                                        <td className='fw-bold'>Issued by:</td>
                                        <td className='fw-bold w-[200px]'>Received by:</td>
                                    </tr>
                                    <tr>
                                        <td className='text-start no-border' colSpan={2}>Signature:</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className='text-start no-border' colSpan={2}>Printed Name:</td>
                                        <td></td>
                                        <td className='text-center text-sm fw-bold'>JOSEPH C. CUA</td>
                                        <td className='text-center text-sm fw-bold'>
                                            MA. ROSELLA T. NAVAR, RSW
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className='text-start no-border' colSpan={2}>Designation</td>
                                        <td></td>
                                        <td className='text-sm text-center'>PROVINCIAL GOVERNOR</td>
                                        <td className='text-sm text-center'>PSWDO-PGDH</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td className='text-start no-border' colSpan={2}>Date:</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RisForm
