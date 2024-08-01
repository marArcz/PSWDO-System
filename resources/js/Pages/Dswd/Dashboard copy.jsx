import Container from '@/Components/Container';
import { PieChart } from '@/Components/PieChart';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, Col, Row } from 'react-bootstrap';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard({ auth, barangays }) {

    const data = barangays.map((barangay, index) => {
        return {
            name: barangay.name,
            Requests: barangay.requests?.length ?? 0,
        }
    })



    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-8">
                <Container>
                    <Row className='gy-3'>
                        <Col>
                            <Row className='gx-2 gy-2'>
                                <Col lg={3}>
                                    <DashboardCard
                                        label='Total Requests'
                                        icon={<i className="fi fi-rr-inbox text-primary"></i>}
                                        value='0'
                                    />
                                </Col>
                                <Col lg={3}>
                                    <DashboardCard
                                        label='Approved Requests'
                                        icon={<i className="fi fi-rr-hexagon-check text-success"></i>}
                                        value='0'
                                    />
                                </Col>
                                <Col lg={3}>
                                    <DashboardCard
                                        label='Declined Requests'
                                        icon={<i className="fi fi-rr-vote-nay text-danger"></i>}
                                        value='0'
                                    />
                                </Col>
                                <Col lg={3}>
                                    <Card>
                                        <Card.Body className='p-4'>
                                            <div className="min-h-[100px]">
                                                <p className='text-success fw-bold'>
                                                    Received Requests
                                                    <span className='ms-1 text-secondary fw-normal'>(Live)</span>
                                                </p>
                                                <div className="mt-3">
                                                    <p className='text-black-50 text-sm'>Nothing to show.</p>
                                                </div>
                                            </div>

                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <div className="mt-3">
                                <Row className='gx-2 '>
                                    <Col lg={8}>
                                        <Card>
                                            <Card.Body className='p-4'>
                                                <div className='max-w-[100%] overflow-x-auto'>
                                                    <p className='text-center mt-2 fw-bold mb-4'>Barangay Calamity Assistance Requests 2023</p>
                                                    <BarChart
                                                        className='mx-auto my-3'
                                                        width={700}
                                                        height={400}
                                                        data={data}
                                                        margin={{
                                                            top: 5,
                                                            right: 30,
                                                            left: 20,
                                                            bottom: 5,
                                                        }}
                                                    >
                                                        <CartesianGrid strokeDasharray="3 3" />
                                                        <XAxis dataKey="name" />
                                                        <YAxis />
                                                        <Tooltip />
                                                        <Legend />
                                                        <Bar dataKey="Requests" fill="#0D6DA6" />
                                                    </BarChart>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col className='h-100'>
                                        <Card className='h-100'>
                                            <Card.Body className='h-100'>
                                                <p className='fw-bold text-center'>Affected Families </p>
                                                <PieChart />
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </AuthenticatedLayout>
    );
}

const DashboardCard = ({ icon = null, label = "Label", value = "0", color = "primary" }) => {
    return (
        <Card>
            <Card.Body className='py-lg-4 px-lg-4 px-4 py-3'>
                <div className="row min-h-[100px] align-items-center gx-5">
                    <div className="col col-3 text-center">
                        <div className="icon text-center fs-2">
                            {icon ?? <i className="fi fi-rr-inbox text-primary"></i>}
                        </div>
                    </div>
                    <div className="content col">
                        <p className='fs-6 fw-bold text-secondary'>{label}</p>
                        <p className='fs-5 fw-bold'>{value}</p>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}
