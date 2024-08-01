import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import { Image } from 'react-bootstrap'

const NavbarHeader = ({ isActive, setIsActive }) => {

    return (
        <>
            <div className={`navbar-header shadow-sm border-bottom ${isActive ? 'active' : ''}`}>
                <Link href='/' className='flex gap-2'>
                    <Image
                        src='/images/logo.png'
                        alt='Logo'
                        className='navbar-logo align-self-start'
                    />
                    <span className={`fw-normal align-self-center text-dark text-sm  ${isActive ? 'lg:block hidden' : 'hidden'}`}>
                        <small>Provincial Social Welfare and Development Office</small>
                    </span>
                </Link>

                {/* <div className="nav-control ">
                    <div onClick={() => setIsActive(!isActive)} className={`hamburger ${isActive ? '' : 'is-active'}`}>
                        <span className="line"></span>
                        <span className="line"></span>
                        <span className="line"></span>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default NavbarHeader
