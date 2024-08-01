import MapChart from '@/Components/MapChart';
import DswdPanelLayout from '@/Layouts/DswdPanelLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { Card, Col, Image, Row } from 'react-bootstrap';

export default function Dashboard({ barangays, inventories, province, typhoons }) {
    const [fullscreen, setFullscreen] = useState(false)
    const data = barangays.map((barangay, index) => {
        return {
            name: barangay.name,
            Requests: barangay.requests?.length ?? 0,
        }
    })

    return (
        <DswdPanelLayout
            unwrap
            headerTitle='Dashboard'
            activeLink='dashboard'
        >
            <div className="content-wrapper">
                <Head title="Dashboard" />
                <p className='fw-semibold text-blue fs-6'>Inventory</p>
                <Row>
                    <Col lg={12}>
                        {
                            inventories.length > 0 ? (
                                <Row className='gx-3 gy-3'>
                                    {
                                        inventories.map((item, index) => (
                                            <Col lg={4}>
                                                <DashboardCard
                                                    unit={`(${item.unit?.name})`}
                                                    label={item.name}
                                                    icon={<Image src='/images/trolley.png' fluid />}
                                                    value={item.quantity}
                                                />
                                            </Col>
                                        ))
                                    }
                                </Row>
                            ) : (
                                <Col lg={3}>
                                    <Card>
                                        <Card.Body>
                                            <p className='my-0'>No items in found in the inventory</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                    </Col>
                </Row>
            </div>
            <div className={`mt-3 map-card ${fullscreen ? 'fullscreen' : ''}`}>
                <div className=' px-4 my-0 d-flex bg-white border align-items-center justify-content-between'>
                    <div>
                        <p className='text-blue fw-semibold my-3'>Provincial Map</p>
                    </div>
                    <div>
                        <button onClick={() => setFullscreen(f => !f)} className='btn text-btn text-btn-primary'>
                            <i className='bx bx-fullscreen'></i>
                        </button>
                    </div>
                </div>
                <MapChart fullscreen={fullscreen} typhoons={typhoons} province={province} />
            </div>
        </DswdPanelLayout>
    );
}

const DashboardCard = ({ icon = null, label = "Label", value = "0", color = "primary", unit = "(sack)" }) => {
    return (
        <Card className='h-100'>
            <Card.Body className='py-lg-4 px-lg-4 px-4 py-3 h-100 items-center flex align-middle justify-center'>
                <div className='text-center'>
                    <div className="flex justify-center items-center gap-x-3 mb-4">
                        <div className="icon text-center fs-2 my-0">
                            {icon ?? <i className="fi fi-rr-inbox text-primary"></i>}
                        </div>
                        <p className='fs-3 text-secondary fw-bold my-0'>{value}</p>
                    </div>
                    <p className='fs-6 fw-normal text-secondary mb-0'>{label}</p>
                    <p className='text-secondary'>{unit}</p>
                </div>
            </Card.Body>
        </Card>
    )
}
