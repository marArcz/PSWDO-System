import Card from "@/Components/Card";
import ReactModal from "@/Components/ReactModal";
import RisForm from "@/Components/RisForm";
import DswdPanelLayout from "@/Layouts/DswdPanelLayout";
import { dateFormat, numberFormat } from "highcharts";
import { useRef } from "react";
import { useState } from "react";
import { Button, ButtonGroup, DropdownButton, Form, InputGroup, ListGroup, ListGroupItem, Dropdown, Row, Col, Table, Alert, Badge, Image } from 'react-bootstrap'
import { useReactToPrint } from "react-to-print";

const Details = ({ distribution }) => {
    const [showRisModal, setShowRisModal] = useState(false)
    const [showRdsModal, setShowRdsModal] = useState(false)

    const totalExpenses = () => {
        let totalCost = 0;

        for (let item of distribution.distribution_items) {
            let cost = item.unit_cost * item.quantity;
            totalCost += cost;
        }

        return "Php " + numberFormat(totalCost, 2, '.', ',');
    }


    return (
        <DswdPanelLayout
            headerTitle="Assistance Distribution"
            activeLink={distribution.archived ? 'archived_distributions' : 'distributions'}
            // backButtonLink={route('pswdo.distributions.index')}
            backButtonAction={() => history.back()}
        >
            <div className="mb-4">
                <p className="text-blue fw-bold">Assistance Details</p>
                <Card className="mb-3 position-relative">

                    <div className="flex items-center flex-wrap gap-2">
                        <p className="my-0 fw-semibold text-secondary me-auto">Recorded on {dateFormat('%b. %d, %Y', new Date(distribution.created_at))} | {dateFormat('%I:%M %p', new Date(distribution.created_at))}</p>
                        <div>
                            <Badge bg={distribution.status == 'Declined' ? 'danger' : 'blue'}>
                                {distribution.status}
                            </Badge>
                        </div>
                    </div>
                    {
                        distribution.archived && (
                            <p className="mt-3 mb-0 text-secondary">
                                <small>This distribution record is <strong>archived</strong>.</small>
                            </p>
                        )
                    }
                </Card>
                <Card className="">
                    <Table bordered className="my-0">
                        <thead>
                            <tr>
                                <th className="p-3">Municipality</th>
                                <th className="p-3">Typhoon</th>
                                <th className="p-3">No. of families</th>
                                <th className="p-3">Total Expenses</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3">{distribution.municipality_name}</td>
                                <td className="p-3">{distribution.typhoon_name}</td>
                                <td className="p-3">{distribution.no_of_families}</td>
                                <td className="p-3">{totalExpenses()}</td>
                            </tr>
                        </tbody>
                    </Table>
                    {/* items in assistance */}
                    <p className="mt-4 fw-bold text-secondary">Items distributed</p>
                    <Table bordered className="my-0">
                        <thead>
                            <tr>
                                <th className="p-3">Item</th>
                                <th className="p-3">Quantity</th>
                                <th className="p-3">Unit</th>
                                <th className="p-3">Unit Cost</th>
                                <th className="p-3">Total Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                distribution.distribution_items?.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-3">{item.name}</td>
                                        <td className="p-3">{item.quantity}</td>
                                        <td className="p-3">{item.unit.name}</td>
                                        <td className="p-3">Php {numberFormat(item.unit_cost, 2, '.', ',')}</td>
                                        <td className="p-3">Php {numberFormat(item.unit_cost * item.quantity, 2, '.', ',')}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Card>
            </div>
            <div className="mb-3">
                <p className="text-blue fw-bold">RIS and RDS Forms</p>
                <Card className="">
                    <Table bordered className="my-0">
                        <thead>
                            <tr>
                                <th className="p-3">RIS FORM</th>
                                <th className="p-3">RDS FORM</th>
                                <th className="p-3">Total Expenses</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-3">
                                    <Button onClick={() => setShowRisModal(true)}>
                                        Print / View form
                                    </Button>
                                </td>
                                <td className="p-3">
                                    <Button size="sm" variant="light-blue" onClick={() => setShowRisModal(true)}>
                                        Add attachment
                                    </Button>
                                    <Row>
                                        {
                                            distribution.rdsForm && distribution.rds_form.rds_pages.map((page,index) => (
                                                <Col md={4} key={index}>
                                                    <Image
                                                        fluid
                                                        src={page.url}
                                                        />
                                                </Col>
                                            ))
                                        }
                                        {
                                            distribution.rds_form == null || distribution.rds_form?.rds_pages?.length <= 0 ? (
                                                <p className="form-text my-3">No Attachments added.</p>
                                            ):null
                                        }
                                    </Row>
                                </td>
                                <td className="p-3">{totalExpenses()}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card>
            </div>

            <ReactModal
                size="xl"
                show={showRisModal}
                onHide={() => setShowRisModal(false)}
            >
                <RisForm distribution={distribution} />
            </ReactModal>

            {/* Add/Create RDS FORM */}
            <ReactModal
                show={showRdsModal}
            >
                <p></p>
            </ReactModal>

        </DswdPanelLayout>
    );
}

export default Details;
