import React from 'react'
import { Container, Dropdown, Image, Nav, NavDropdown, NavItem, Navbar } from 'react-bootstrap'
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import NavbarHeader from './NavbarHeader';
import NavLink from './NavLink';
import { Link, usePage } from '@inertiajs/react';
import axios from 'axios';
import TextProfilePic from './TextProfilePic';


const AppHeader = ({ isActive, setIsActive, headerTitle, backButtonLink = '', backButtonAction = null }) => {
    const { auth: userAuth } = usePage().props;

    return (
        <>
            <NavbarHeader isActive={isActive} setIsActive={setIsActive} />
            <div className={`${isActive ? '' : 'active'} app-header `}>
                <Navbar bg={'white'} data-bs-theme={'light'} className={`border-bottom p-0 m-0`}>
                    <Container fluid className='py-0'>
                        <div className='me-auto align-items-center p-0 lg:gap-3 md:gap-3 gap-0 position-relative'>
                            <div className="nav-control ">
                                <div onClick={() => setIsActive(!isActive)} className={`hamburger ${isActive ? '' : 'is-active'}`}>
                                    <span className="line bg-tertiary"></span>
                                    <span className="line bg-tertiary"></span>
                                    <span className="line bg-tertiary"></span>
                                </div>
                            </div>
                        </div>
                        <Nav className='ms-auto align-items-center lg:gap-3 md:gap-3 gap-0'>
                            {/* <Nav.Item>
                                <ThemeSwitch />
                            </Nav.Item> */}
                            <Dropdown align="end" as={NavItem} className=''>
                                <DropdownToggle bsPrefix="nav-profile-toggler" data-bs-theme={'light'} className="cursor-pointer btn btn-link nav-link bg-transparent text-decoration-none">
                                    <div className=" flex gap-x-2 justify-center text-center items-center">
                                        {
                                            userAuth.user.image ? (
                                                <Image
                                                    className='rounded-circle lg:w-[45px] w-[35px]'
                                                    src={userAuth?.user?.image}
                                                    alt='User Photo'
                                                />
                                            ) : (
                                                <TextProfilePic className="text-dark fw-bold bg-light" size='md' text={userAuth?.user?.firstname[0]} />
                                            )
                                        }
                                        <div className="text-start lg:block sm:hidden md:block hidden">
                                            {
                                                userAuth?.user ? (
                                                    <>
                                                        <p className='my-0 text-dark'>
                                                            <strong>{userAuth.user.firstname} {userAuth.user.lastname}</strong><br />
                                                            <small className='my-0'>
                                                                {userAuth.role == 'staff' ? 'Staff' : 'Admin'}
                                                            </small>
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className='my-0'>
                                                            <strong>Guest</strong><br />
                                                            <small className='my-0'>Guest</small>
                                                        </p>
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </DropdownToggle>
                                <Dropdown.Menu>
                                    <div className="text-center w-[13rem] pt-2">
                                        {
                                            userAuth.user.image ? (
                                                <Image
                                                    className='rounded-circle lg:w-[45px] w-[35px]'
                                                    src={userAuth?.user?.image}
                                                    alt='User Photo'
                                                />
                                            ) : (
                                                <TextProfilePic className="text-dark fw-bold bg-light mx-auto" size='md' text={userAuth?.user?.firstname[0]} />
                                            )
                                        }
                                        <p className="my-1 text-sm fw-bold">{userAuth?.user?.firstname} {userAuth?.user?.lastname}</p>
                                    </div>
                                    <div className="px-2">
                                        <hr className='bg-light text-black-50 mb-1' />
                                    </div>
                                    <Nav className='flex-column px-3 mt-2'>
                                        <Nav.Item>
                                            <Nav.Link preserveScroll={false} as={Link} href={route('profile.edit')} className='link-secondary'>
                                                Profile
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link method='post' as={Link} href={route('pswdo.logout')} className='link-secondary'>
                                                Log Out
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Container>
                </Navbar>
                <div className={`bg-white sub-header w-full px-3 border-bottom shadow-sm`}>
                    <div className="container-fluid text-lg text-capitalize fw-semibold text-gray-800">
                        <div className="flex gap-2 items-center">
                            {
                                (backButtonLink || backButtonAction) && (
                                    <div>
                                        {
                                            backButtonLink ? (
                                                <Link href={backButtonLink}>
                                                    <i className='fi fi-rr-angle-left text-sm'></i>
                                                </Link>
                                            ) : (
                                                <Link href={"#"} onClick={backButtonAction}>
                                                    <i className='fi fi-rr-angle-left text-sm'></i>
                                                </Link>
                                            )
                                        }
                                    </div>
                                )
                            }
                            <div>
                                {headerTitle}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppHeader
