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
                            <table className='table table-bordered border-2 border-dark'>
                                <tbody>
                                    <tr>
                                        <td colSpan={6} className='py-1'>
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
                                        <td colSpan={3} className='text-center fw-bold py-1'>
                                            Requisition
                                        </td>
                                        <td colSpan={3} className='text-center fw-bold py-1'>Issuance</td>
                                    </tr>
                                    <tr>
                                        <td className='p-0 w-[60%]'>
                                            <table className='table table-bordered text-center border-1 m-0 border-dark'>
                                                <thead>
                                                    <tr>
                                                        <th className="w-[90px] text-center">Stock No.</th>
                                                        <th className="text-center w-[95px]">Unit</th>
                                                        <th>Description</th>
                                                        <th>Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        distribution.distribution_items.map((item, index) => (
                                                            <tr>
                                                                <td className='fw-bold text-sm'>{item.batch_no ?? 1}</td>
                                                                <td className='fw-bold text-sm'>{item.unit?.name}</td>
                                                                <td className='fw-bold text-sm'>{item.name}</td>
                                                                <td className='fw-bold text-sm'>{item.quantity}</td>
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
                                                                </tr>
                                                            ))
                                                    }
                                                </tbody>
                                            </table>
                                        </td>
                                        <td colSpan={3} className='p-0 '>
                                            <table className='table table-bordered border-1 m-0 border-dark'>
                                                <thead>
                                                    <tr>
                                                        <th className="w-[55%] ">Quantity</th>
                                                        <th className="">Remarks</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        distribution.distribution_items.map((item, index) => (
                                                            <tr>
                                                                <td className='fw-bold text-sm'>{item.quantity}</td>
                                                                <td></td>
                                                            </tr>
                                                        ))
                                                    }
                                                    {
                                                        (Array(risRowsLeft).fill('', 0))
                                                            .map((v, index) => (
                                                                <tr key={index}>
                                                                    <td className='fw-bold py-[1.15rem!important]'></td>
                                                                    <td className='fw-bold py-[1.15rem!important]'></td>
                                                                </tr>
                                                            ))
                                                    }
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6} className='fw-bold py-3'>
                                            Purpose
                                        </td>
                                    </tr>
                                    {/* last row */}
                                    <tr>
                                        <td colSpan={3} className='p-0'>
                                            <table className="table m-0 table-bordered border-dark align-middle">
                                                <td className='p-0 '>
                                                    <table className="table table-bordered border-1 m-0 border-white">
                                                        <tr>
                                                            <td className='py-[13px] fw-bold px-2 text-sm'></td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-[6px] fw-bold px-2 text-sm'>Signature:</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-[6px] fw-bold px-2 text-sm'>Printed Name:</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-[8px] fw-bold px-2 text-sm'>Designation:</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-[8px] fw-bold px-2 text-sm'>Date:</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td className='p-0 w-[38%]'>
                                                    <table className="table table-bordered border-1 m-0 border-dark">
                                                        <tr>
                                                            <td className='py-[4.5px] text-sm text-center fw-bold'>Requested by:</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-3'></td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-3'></td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-[14px]'>

                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-[20.5px]'></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td className='p-0'>
                                                    <table className="table table-bordered border-1 m-0 border-dark">
                                                        <tr>
                                                            <td className='py-[4.5px] text-sm text-center fw-bold'>Approved by:</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-3'></td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-[6px] text-center fw-bolder text-sm'>JOSEPH C. CUA</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-1 fw-medium text-center text-sm'>PROVINCIAL GOVERNOR</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-[20.5px]'></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </table>
                                        </td>

                                        {/*  */}
                                        <td colSpan={3} className='p-0'>
                                            <table className="table table-bordered m-0 border-0 border-dark">
                                                <td className='p-0 w-[55%]'>
                                                    <table className="table table-bordered border-1 m-0 border-dark">
                                                        <tr>
                                                            <td className='py-1 text-sm  text-center fw-bold'>Issued by:</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-3'></td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-[6px] text-center fw-bolder text-sm'>MA. ROSELLA T. NAVAR, RSW</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-1 fw-medium text-center text-sm'>PSWFO-PGDH</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-[21px]'></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td className='p-0 w-[140px]'>
                                                    <table className="table table-bordered border-1 m-0 border-dark">
                                                        <tr>
                                                            <td className='py-1 text-sm text-center fw-bold'>Received by:</td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-3'></td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-[16px]'></td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-[14px]'>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td className='py-[21px]'></td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </table>
                                        </td>
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
