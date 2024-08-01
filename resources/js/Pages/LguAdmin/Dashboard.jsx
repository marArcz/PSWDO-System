import Card from '@/Components/Card';
import Container from '@/Components/Container';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Col, Row } from 'react-bootstrap';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Requests / Request for Typhooon Rolly</h2>}
        >
            <Head title="Dashboard" />

            <Container>
                <Row>
                    <Col lg={4}>
                        <Card>
                            <p className='fw-bold'>Submitted Requests</p>
                            <h2 className='text-primary fw-bold'>0</h2>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card>
                            <p className='fw-bold'>Average number of affected families</p>
                            <h2 className='text-danger fw-bold'>0</h2>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card>
                            <p className='fw-bold'>Average number of affected population</p>
                            <h2 className='text-danger fw-bold'>0</h2>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </AuthenticatedLayout>
    );
}
