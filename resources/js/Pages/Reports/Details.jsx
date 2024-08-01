import ReactModal from '@/Components/ReactModal'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Link } from '@inertiajs/react'
import { dateFormat } from 'highcharts'
import React from 'react'
import { useState } from 'react'
import { Button, Card, Col, Image, Row, Table } from 'react-bootstrap'
import QRCode from 'react-qr-code'

const Details = ({ report, auth }) => {
    const [showPrintModal, setShowPrintModal] = useState(false);
    const date = new Date(report.created_at)

    return (
        <DswdPanelLayout
            backButtonAction={() => history.back()}
            headerTitle='Report details'
            activeLink='reports'
        >
            <ReactModal
                size='xl'
                show={showPrintModal}
                onHide={() => setShowPrintModal(false)}
            >
                <div className="report-paper">
                    <div className="text-center">
                        <p className='fs-6 fw-semibold'>Situational Report as of {dateFormat('%d %b %Y, %I:%M %p', date)}</p>
                    </div>
                    <div className="mb-3 mt-4">
                        <div className='flex gap-5'>
                            <div>
                                <span>Municipality:</span>
                            </div>
                            <div>
                                <span className=''>{report.municipality.name}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className='flex gap-5'>
                            <div>
                                <span>Typhoon:</span>
                            </div>
                            <div>
                                <span className=''>{report.calamity.name}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <p className="fs-6 fw-bold">Coverage Awareness</p>
                        <div className='flex gap-5'>
                            <div>
                                <span>LCE is Present in the AOR:</span>
                            </div>
                            <div>
                                <span className=''>{report.lce_present}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className='flex gap-5'>
                            <div>
                                <span>No. of barangays:</span>
                            </div>
                            <div>
                                <span className=''>{report.no_of_barangay_covered}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ReactModal>

            <div className="report-details">
                {/* <QRCode value={JSON.stringify(report)}/> */}
                {
                    auth.user.isAdmin && (
                        <div className="justify-end flex items-center gap-2 mb-3">
                            {
                                report.distribution ? (
                                    <Button variant='light-dark' as={Link} href={route("pswdo.distributions.show", report.distribution.id)}
                                        className='d-flex align-items-center'
                                    >
                                        <span>View allocated assistance</span>
                                        <i className='ms-1 fi fi-rr-arrow-small-right leading-none'></i>
                                    </Button>
                                ) : (
                                    <Button as={Link} href={route("pswdo.reports.distributions.create", { report: report.id })}
                                        className='d-flex align-items-center'
                                    >
                                        <span>Allocate Assistance</span>
                                        <i className='ms-1 fi fi-rr-arrow-small-right leading-none'></i>
                                    </Button>
                                )
                            }
                        </div>
                    )
                }
                <Card>
                    <Card.Body>
                        <p className='text-blue fw-bold mb-3'>Report as of {dateFormat('%d %b %Y, %I:%M %p', date)}</p>

                        <Table
                            className='bordered align-middle text-center'
                            bordered
                        >
                            <thead>
                                <tr>
                                    <th>Municipality</th>
                                    <th>Typhoon</th>
                                    <th>TWCS No.</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{report.municipality.name}</td>
                                    <td>{report.calamity.name}</td>
                                    <td>Signal no. {report.typhoon_level}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

                <div className="mt-4">
                    <p className="text-blue mb-2 fw-bold">Coverage Awareness</p>
                    <Table
                        className='bordered align-middle text-center'
                        bordered
                    >
                        <thead>
                            <tr>
                                <th className=''>LCE is Present in the AOR</th>
                                <th className=''>No. of Barangays</th>
                                <th className=''>No. of  Punong Barangay Present in the AOR</th>
                                <th className=''>Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{report.lce_present}</td>
                                <td>{report.no_of_barangay_covered}</td>
                                <td>{report.no_of_punong_barangay_present}</td>
                                <td>{report.remarks}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className="mt-5">
                    <p className="text-blue mb-3 fw-bold">Evacuation Profile</p>
                    <Row className='gy-3 gx-5'>
                        <Col md>
                            <DashboardCard
                                icon={<Image src='/images/family.png' width={50} />}
                                label='No. of families'
                                value={report.no_of_families}
                            />
                        </Col>
                        <Col md>
                            <DashboardCard
                                icon={<Image src='/images/barangay.png' width={50} />}
                                label='No. of barangays'
                                value={report.no_of_barangay}
                            />
                        </Col>
                        <Col md>
                            <DashboardCard
                                icon={<Image src='/images/centers.png' width={50} />}
                                label='No. of Evac. Center/s'
                                value={report.no_of_evacuation}
                            />
                        </Col>
                    </Row>
                </div>
                <div className="mt-5">
                    <p className="text-blue mb-3 fw-bold">Relief Operation Conducted</p>
                    <Row className='gy-3 gx-5'>
                        <Col md lg={4}>
                            <DashboardCard
                                icon={<Image src='/images/family.png' width={50} />}
                                label='Total served'
                                value={report.total_served}
                            />
                        </Col>
                        <Col md lg={4}>
                            <DashboardCard
                                icon={<Image src='/images/barangay.png' width={50} />}
                                label='Total No. of Brgy/s Served'
                                value={report.total_barangay_served}
                            />
                        </Col>
                        <Col md lg={4}>
                            <DashboardCard
                                icon={<Image src='/images/family.png' width={50} />}
                                label='No. of Families Served'
                                value={report.no_of_families_served}
                            />
                        </Col>
                        <Col md lg={4}>
                            <DashboardCard
                                icon={<Image src='/images/centers.png' width={50} />}
                                label='No. of Brgys. Conducted Evacuation'
                                value={report.no_of_barangay_conducted_evacuation}
                            />
                        </Col>
                    </Row>
                </div>
                <div className="mt-5">
                    <p className="text-blue mb-3 fw-bold">Status of LIfelines</p>
                    <Row className='gy-3 gx-5'>
                        <Col md lg={4}>
                            <Card className='h-100 shadow-md'>
                                <Card.Body className='p-lg-5 p-4 h-100 items-center flex align-middle justify-center'>
                                    <div className='text-center'>
                                        <div className="flex justify-center items-center gap-x-3 mb-3">
                                            <div className="icon text-center fs-2 my-0">
                                                <Image src='/images/power-supply.png' width={50} />
                                            </div>
                                            <p className='fs-6 text-secondary fw-bold my-0'>Power Supply</p>
                                        </div>
                                        <p className='fs-4 fw-bold text-blue mb-0'>{report.power_supply_status}</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md lg={4}>
                            <Card className='h-100 shadow-md'>
                                <Card.Body className='p-lg-5 p-4 h-100 items-center flex align-middle justify-center'>
                                    <div className='text-center'>
                                        <div className="flex justify-center items-center gap-x-3 mb-3">
                                            <div className="icon text-center fs-2 my-0">
                                                <Image src='/images/water-supply.png' width={50} />
                                            </div>
                                            <p className='fs-6 text-secondary fw-bold my-0'>Water Supply</p>
                                        </div>
                                        <p className='fs-4 fw-bold text-blue mb-0'>{report.water_supply_status}</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md lg={4}>
                            <Card className='h-100 shadow-md'>
                                <Card.Body className='p-lg-5 p-4 h-100 items-center flex align-middle justify-center'>
                                    <div className='text-center'>
                                        <div className="flex justify-center items-center gap-x-3 mb-3">
                                            <div className="icon text-center fs-2 my-0">
                                                <Image src='/images/telecom.png' width={50} />
                                            </div>
                                            <p className='fs-6 text-secondary fw-bold my-0'>Telecommunication</p>
                                        </div>
                                        <p className='fs-4 fw-bold text-blue mb-0'>{report.telecommunication_status}</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className='mt-3 gx-5 gy-3'>
                        <Col md lg={4}>
                            <Card className='h-100 shadow-md'>
                                <Card.Body className='p-lg-5 p-4 h-100 items-center flex align-middle justify-center'>
                                    <div className='text-center'>
                                        <div className="flex justify-center items-center gap-x-3 mb-3">
                                            <div className="icon text-center fs-2 my-0">
                                                <Image src='/images/water-supply.png' width={50} />
                                            </div>
                                            <p className='fs-6 text-secondary fw-bold my-0'>Roads and Bridges</p>
                                        </div>
                                        <p className='fs-4 fw-bold text-blue mb-0'>{report.roads_and_bridges_status}</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </DswdPanelLayout>
    )
}

const DashboardCard = ({ icon = null, label = "Label", value = "0", color = "primary" }) => {
    return (
        <Card className='h-100 shadow-md'>
            <Card.Body className='p-lg-4 p-4 h-100 items-center flex align-middle justify-center'>
                <div className='text-center'>
                    <div className="flex justify-center items-center gap-x-3 mb-4">
                        <div className="icon text-center fs-2 my-0">
                            {icon ?? <i className="fi fi-rr-inbox text-primary"></i>}
                        </div>
                        <p className='fs-3 text-secondary fw-bold my-0'>{value}</p>
                    </div>
                    <p className='fs-6 fw-normal text-secondary mb-0'>{label}</p>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Details
