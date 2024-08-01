import React from "react"
import Highcharts, { map, numberFormat } from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { ComposableMap, Marker, Geographies, Geography, Graticule, Sphere, ZoomableGroup } from "react-simple-maps"
import { MapContainer, Popup, TileLayer, ZoomControl, useMap } from 'react-leaflet'
import { useState } from "react"
import { useEffect } from "react"
import { Badge, Button, Card, Form, ListGroup, ListGroupItem, Spinner } from "react-bootstrap"
import { Link } from "@inertiajs/react"
import axios from "axios"

const geoUrl = "/assets/map (14).json"

export default function MapChart({ province, typhoons, fullscreen = false }) {
    const [mapData, setMapData] = useState(null);
    const [landData, setLandData] = useState(null);
    const [gettingData, setGettingData] = useState(false)
    const [selectedReport, setSelectedReport] = useState(null)
    const [municipalityTextSize, setMunicipalityTextSize] = useState("0.13rem");
    const [mapZoom, setMapZoom] = useState(1)
    const [showLandData, setShowLandData] = useState(false)
    const [selectedMunicipality, setSelectedMunicipality] = useState('')
    const [mapType, setMapType] = useState('distribution')
    const [selectedTyphoon, setSelectedTyphoon] = useState(typhoons?.length > 0 ? typhoons[0] : null)
    const [distributions, setDistributions] = useState(null)

    const [mapLoading, setMapLoading] = useState(false)

    const distributionColors = {
        noSubmittedReport: "#e9ecef",
        hasSubmittedReport: "#ffc107",
        hasAssistanceAllocation: "#fb923c",
        hasGivenAssistance: "#47cd8e",
    }


    const getLandData = (municipality) => {
        if (mapType == 'demographic') {
            setLandData(null)
            if (municipality == 'Catanduanes') {
                setShowLandData(false)
            } else {
                setSelectedMunicipality(municipality)

                axios.get(route('api.maps.municipality', { name: municipality }))
                    .then(res => {
                        setTimeout(() => {
                            setLandData({
                                ...res.data,
                                name: municipality,
                            });
                            console.log(res.data)
                        }, 700);
                    })
            }
        } else {
            setSelectedReport(null)
            if (municipality == 'Catanduanes') {
                setShowLandData(false)
            } else {
                setSelectedMunicipality(municipality)
                axios.get(route('api.maps.report', { name: municipality, typhoon: selectedTyphoon?.name }))
                    .then(res => {
                        setTimeout(() => {
                            setSelectedReport(res.data)
                            console.log(res.data)
                        }, 700);
                    })
            }
        }
    }

    useEffect(() => {
        const getMapData = () => {
            fetch("/assets/map_data.json").then(res => res.json().then(data => setMapData(data)))
        }
        getMapData();
    }, []);

    const totalExpenses = (distribution) => {
        let totalCost = 0;

        for (let item of distribution?.distribution_items) {
            let cost = item.unit_cost * item.quantity;
            totalCost += cost;
        }

        return "Php " + numberFormat(totalCost, 2, '.', ',');
    }

    const ProvinceData = () => (
        <div>
            <p className="fw-bold text-blue">Province Data</p>
            <hr />
            <ListGroup>
                <ListGroupItem>
                    <div className="flex p-2 items-center gap-3">
                        <div><i className="fi fi-rr-map text-secondary fs-3"></i></div>
                        <div>
                            <p className="my-0 fw-bold">No. of Municipalities</p>
                        </div>
                        <div className="ms-auto">
                            {/* <Badge text={province.total_households} color="dark" bg="tertiary"/> */}
                            <div className="badge bg-tertiary">{province.municipalities.length}</div>
                        </div>
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div className="flex p-2 items-center gap-3">
                        <div><i className="fi fi-rr-house-building text-secondary fs-3"></i></div>
                        <div>
                            <p className="my-0 fw-bold">No. of barangays</p>
                        </div>
                        <div className="ms-auto">
                            {/* <Badge text={province.total_households} color="dark" bg="tertiary"/> */}
                            <div className="badge bg-tertiary">{province.total_barangays}</div>
                        </div>
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div className="flex p-2 items-center gap-3">
                        <div><i className="fi fi-rr-home text-secondary fs-3"></i></div>
                        <div>
                            <p className="my-0 fw-bold">Total Households</p>
                        </div>
                        <div className="ms-auto">
                            {/* <Badge text={province.total_households} color="dark" bg="tertiary"/> */}
                            <div className="badge bg-tertiary">{province.total_households}</div>
                        </div>
                    </div>
                </ListGroupItem>
            </ListGroup>
        </div>
    )

    const DistributionsData = () => (
        <div>
            <p className="fw-bold text-blue">Assistance statistics</p>
            <hr />
            <ListGroup>
                <ListGroupItem>
                    <div className="flex p-2 items-center gap-3">
                        <div><i className="fi fi-rr-map text-secondary fs-3"></i></div>
                        <div>
                            <p className="my-0 text-sm fw-bold">No. of Municipalities</p>
                        </div>
                        <div className="ms-auto">
                            {/* <Badge text={province.total_households} color="dark" bg="tertiary"/> */}
                            <div className="badge bg-tertiary">{province.municipalities.length}</div>
                        </div>
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div className="flex p-2 items-center gap-3">
                        <div><i className="fi fi-rr-house-building text-secondary fs-3"></i></div>
                        <div>
                            <p className="my-0 text-sm fw-bold">No. of barangays</p>
                        </div>
                        <div className="ms-auto">
                            {/* <Badge text={province.total_households} color="dark" bg="tertiary"/> */}
                            <div className="badge bg-tertiary">{province.total_barangays}</div>
                        </div>
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div className="flex p-2 items-center gap-3">
                        <div><i className="fi fi-rr-home text-secondary fs-3"></i></div>
                        <div>
                            <p className="my-0 text-sm fw-bold">Total Households</p>
                        </div>
                        <div className="ms-auto">
                            {/* <Badge text={province.total_households} color="dark" bg="tertiary"/> */}
                            <div className="badge bg-tertiary">{province.total_households}</div>
                        </div>
                    </div>
                </ListGroupItem>
            </ListGroup>
        </div>
    )

    const LandData = () => (
        <div className=" ">
            <div className="flex justify-between">
                <p className="fw-bold text-light ">Municipality of {landData.name}</p>
                <Button variant="light" onClick={() => setShowLandData(false)}>
                    <i className="fi fi-rr-angle-small-right leading-none fs-6"></i>
                </Button>
            </div>
            <hr />
            <ListGroup>
                <ListGroupItem>
                    <div className="flex p-2 items-center gap-3">
                        <div><i className="fi fi-rr-house-building text-secondary fs-3"></i></div>
                        <div>
                            <p className="my-0 fw-bold">Total families</p>
                        </div>
                        <div className="ms-auto">
                            <div className="badge bg-tertiary">{landData.total_families ?? 0}</div>
                        </div>
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div className="flex p-2 items-center gap-3">
                        <div><i className="fi fi-rr-home text-secondary fs-3"></i></div>
                        <div>
                            <p className="my-0 fw-bold">Total Households</p>
                        </div>
                        <div className="ms-auto">
                            <div className="badge bg-tertiary">{landData.total_households ?? 0}</div>
                        </div>
                    </div>
                </ListGroupItem>
            </ListGroup>
        </div>
    )

    const DistributionData = () => (
        <div className=" ">
            <div className="flex justify-between">
                <p className="fw-bold text-light ">Municipality of {selectedMunicipality}</p>
                <Button variant="light" onClick={() => setShowLandData(false)}>
                    <i className="fi fi-rr-angle-small-right leading-none fs-6"></i>
                </Button>
            </div>
            <hr />
            {
                selectedReport ? (
                    <div>
                        {
                            !selectedReport.id ? (
                                <div>
                                    <p className="text-sm text-light">No submitted report</p>

                                </div>
                            ) : (
                                selectedReport.distribution ? (
                                    // Had recieved assistance
                                    <div>
                                        <p className="text-light">Assistance Details</p>
                                        <ListGroup className="mt-3">
                                            <ListGroupItem>
                                                <div className="flex p-2 items-center gap-3">
                                                    <div><i className="fi fi-rr-home text-secondary fs-3"></i></div>
                                                    <div>
                                                        <p className="my-0 fw-bold">Affected families</p>
                                                    </div>
                                                    <div className="ms-auto">
                                                        <div className="badge bg-tertiary">
                                                            {selectedReport.no_of_families - selectedReport.no_of_families_served}
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <div className="flex p-2 items-center gap-3">
                                                    <div><i className="fi fi-rr-wallet text-secondary fs-3"></i></div>
                                                    <div>
                                                        <p className="my-0 fw-bold">Total expenses</p>
                                                    </div>
                                                    <div className="ms-auto">
                                                        <div className="badge bg-tertiary">
                                                            {totalExpenses(selectedReport.distribution)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Link className="col-12 btn btn-blue" href={route('pswdo.distributions.show', selectedReport.distribution.id)} variant="blue">View record</Link>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>
                                ) : (
                                    // Had submitted report
                                    <div>
                                        <p className="my-1 text-light fw-semibold">Report Details</p>
                                        <ListGroup className="mt-3">
                                            <ListGroupItem>
                                                <div className="flex p-2 items-center gap-3">
                                                    <div><i className="fi fi-rr-hurricane text-secondary fs-3"></i></div>
                                                    <div>
                                                        <p className="my-0 fw-bold text-secondary">Typhoon</p>
                                                    </div>
                                                    <div className="ms-auto">
                                                        <div className="text-dark fs-6 fw-bold">
                                                            {selectedReport.calamity_name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <div className="flex p-2 items-center gap-3">
                                                    <div><i className="fi fi-rr-home text-secondary fs-3"></i></div>
                                                    <div>
                                                        <p className="my-0 fw-bold text-secondary">Affected families</p>
                                                    </div>
                                                    <div className="ms-auto">
                                                        <div className="badge bg-tertiary">
                                                            {selectedReport.no_of_families - selectedReport.no_of_families_served}
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListGroupItem>
                                            <ListGroupItem>
                                                <Link className="col-12 btn btn-blue" href={route('pswdo.reports.show', selectedReport.id)} variant="blue">Open Report</Link>
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>
                                )
                            )
                        }
                    </div>
                ) : (
                    <p className="form-text text-white-50">Please wait...</p>
                )
            }
        </div>
    )

    function handleMoveEnd(position) {
        console.log(position)
        setMapZoom(position.zoom)
    }
    function handleMove(position) {
        setMapZoom(position.zoom)

        if (position.zoom >= 2.3) {
            setMunicipalityTextSize("0.07rem")
        }
        else if (position.zoom <= 1.53) {
            setMunicipalityTextSize("0.12rem")
        }
        else {
            setMunicipalityTextSize("0.09rem")
        }

    }

    const handleMunicipalityClicked = (geoData) => {
        console.log(geoData)
        setShowLandData(true)
        getLandData(geoData.name)
    }

    const getDistributions = (selectedTyphoon) => {
        console.log('typhoon:  ', selectedTyphoon)
        if (selectedTyphoon != null) {
            setMapLoading(true)
            axios.get(route('api.distributions.typhoon', selectedTyphoon.name))
                .then((res) => {
                    console.log('distributions: ', res)
                    setDistributions(res.data);
                    setMapLoading(false)
                })
                .catch((err) => console.error(err))
        }
    }

    const distributionStatus = (geoData) => {
        let distributionData = distributions.find((report, index) => report.municipality_name?.toLowerCase() == geoData.properties.name?.toLowerCase())
        return distributionData;
    }

    const selectedTyphoonChanged = (id) => {
        let t = typhoons.find((typhoon) => typhoon.id == id)
        setSelectedTyphoon(t)
        setDistributions(null)
    }

    useEffect(() => {
        setDistributions(null)
        getDistributions(selectedTyphoon);
    }, [])

    useEffect(() => {
        setDistributions(null)
        getDistributions(selectedTyphoon);
    }, [selectedTyphoon])

    return (
        <div className="map-container position-relative">
            {
                mapLoading && (
                    <div className="map-loader bg-secondary bg-opacity-25 position-absolute top-0 left-0 w-100 h-100 flex items-center justify-content-center z-[2]">
                        <div className="d-flex flex-column justify-center items-center">
                            <Spinner variant="tertiary" />
                            <p className="my-1">
                                <small>Please wait...</small>
                            </p>
                        </div>
                    </div>
                )
            }
            {/* map type dropdown */}

            <div className="map-type position-absolute top-[20px] left-[20px]">
                <select value={mapType} onChange={e => setMapType(e.target.value)} className="transparent form-select rounded-1 ">
                    <option value="distribution">Assistance Distribution</option>
                    <option value="demographic">Demographic</option>
                </select>
            </div>

            {/* map type dropdown */}
            {/* typhoons dropdown */}

            {
                mapType == "distribution" && (
                    <div className="typhoons-dropdown">
                        <select value={selectedTyphoon?.id} onChange={(e) => selectedTyphoonChanged(e.target.value)} className="transparent form-select rounded-0 bg-blue text-light  ">
                            {
                                typhoons && typhoons.map((typhoon, index) => (
                                    <option value={typhoon.id}>
                                        <span className="text-sm">
                                            Typhoon {typhoon.name}
                                        </span>
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                )
            }

            {/* typhoons dropdown */}
            {/* map legend */}
            {
                mapType === "distribution" && (
                    <div className="legend">
                        <div className="flex mb-3 gap-2 items-center">
                            <div className="w-[5px] h-[5px] bg-white"></div>
                            <p className="text-light text-uppercase text-sm fw-bold my-0">Legend</p>
                        </div>
                        <div className="d-flex align-items-center">

                            <ul className="nav gap-y-5">
                                <li className="nav-item">
                                    <div className="flex gap-2 items-center">
                                        <div>
                                            <div className="w-[15px] h-[15px] bg-light"></div>
                                        </div>
                                        <div>
                                            <p className="my-0 text-sm text-white">
                                                <small>No submitted report</small>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className="flex gap-2 items-center">
                                        <div>
                                            <div className="w-[15px] h-[15px] bg-warning"></div>
                                        </div>
                                        <div>
                                            <p className="my-0 text-sm text-white">
                                                <small>Had submitted report</small>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className="flex gap-2 items-center">
                                        <div>
                                            <div className="w-[15px] h-[15px] bg-orange-400"></div>
                                        </div>
                                        <div>
                                            <p className="my-0 text-sm text-white">
                                                <small>Have assistance allocation</small>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <div className="flex gap-2 items-center">
                                        <div>
                                            <div className="w-[15px] h-[15px] bg-[#47cd8e]"></div>
                                        </div>
                                        <div>
                                            <p className="my-0 text-sm text-white">
                                                <small>Had recieved assistance</small>
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            }
            {/* end of map legend */}
            <div className={`land-details bg-slate-500 shadow-sm border ${showLandData ? 'show' : ''}`}>
                <div className={`border-0 bg-slate-500 shadow-none rounded-0 p-3`}>
                    <Card.Body>
                        {
                            mapType == 'distribution' ? (
                                <div>
                                    <DistributionData />
                                </div>
                            ) : (
                                <div>
                                    {
                                        landData ? (
                                            <LandData />
                                        ) : (
                                            <>
                                                <p className="text-light">Please wait...</p>
                                            </>
                                        )
                                    }
                                </div>
                            )
                        }
                    </Card.Body>
                </div>
            </div>
            <div className="province-details bg-white shadow-sm border">
                <Card className="border-0 shadow-none rounded-0">
                    <Card.Body>
                        {
                            mapType === "demographic" ? (<ProvinceData />) : (<DistributionsData />)
                        }
                    </Card.Body>
                </Card>
            </div>
            <div className="map-wrapper">
                <ComposableMap
                    width={200}
                    height={80}
                    className=" bg-gray-200 map"
                    projectionConfig={{
                        center: [848.5, 13.8],
                        rotate: [4.0, 0, 0],
                        scale: fullscreen ? 8000 : 8000,
                    }}
                >
                    <ZoomableGroup onMove={handleMove} onMoveEnd={handleMoveEnd}>
                        <Geographies geography={geoUrl}>
                            {({ geographies }) => {
                                if (mapType === 'demographic') {
                                    return geographies.map((geo) => {
                                        return <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            stroke="#fff"
                                            strokeWidth={0.2}
                                            enableBackground={2}
                                            style={{
                                                default: { fill: "#bababa" },
                                                hover: { fill: "#ababab" },
                                                pressed: { fill: "#02A" },
                                            }}
                                            onClick={(e) => handleMunicipalityClicked(geo.properties)}
                                        />
                                    })
                                } else {
                                    return distributions ? (
                                        geographies.map((geo) => {
                                            let report = distributionStatus(geo);
                                            let defaultFill = ""
                                            console.log('distributiondata: ', report)

                                            if (report != null && report != undefined) {
                                                if (report.distribution != null && report.distribution != undefined) {
                                                    if (!report.distribution.archived) {
                                                        defaultFill = distributionColors.hasAssistanceAllocation
                                                    } else {
                                                        if (report.distribution.status == "Distributed") {
                                                            defaultFill = distributionColors.hasGivenAssistance;
                                                        } else {
                                                            defaultFill = distributionColors.hasSubmittedReport
                                                        }
                                                    }
                                                } else {
                                                    defaultFill = distributionColors.hasSubmittedReport
                                                }
                                            }
                                            else {
                                                defaultFill = distributionColors.noSubmittedReport;
                                            }

                                            return <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                stroke="#fff"
                                                strokeWidth={0.2}
                                                enableBackground={2}
                                                style={{
                                                    default: { fill: defaultFill },
                                                    hover: { fill: "#ababab" },
                                                    pressed: { fill: "#02A" },
                                                }}
                                                onClick={(e) => handleMunicipalityClicked(geo.properties)}
                                            />
                                        })
                                    ) :
                                        geographies.map((geo) => {
                                            return <Geography
                                                key={geo.rsmKey}
                                                geography={geo}
                                                stroke="#fff"
                                                strokeWidth={0.2}
                                                enableBackground={2}
                                                style={{
                                                    default: { fill: "#bababa" },
                                                    hover: { fill: "#ababab" },
                                                    pressed: { fill: "#02A" },
                                                }}
                                                onClick={(e) => handleMunicipalityClicked(geo.properties)}
                                            />
                                        })
                                }
                            }
                            }
                        </Geographies>
                        {
                            mapData && mapData.municipalities.map((municipality, index) => {
                                return (
                                    <>
                                        <Marker key={"name." + index} coordinates={[municipality.coordinates.x, municipality.coordinates.y]} fill="#777">
                                            <text textAnchor="middle" fontSize={municipalityTextSize} fill="#1e3d59">
                                                {municipality.name}
                                            </text>
                                        </Marker>
                                        <Marker key={"dot." + index} coordinates={[municipality.coordinates.x, municipality.coordinates.y - 0.011]}>
                                            <circle r={0.5} fill="#0d6da6" width={0.8} height={0.2} />
                                        </Marker>
                                    </>
                                )
                            })
                        }
                    </ZoomableGroup>
                </ComposableMap>
            </div>
        </div >
    )
}
