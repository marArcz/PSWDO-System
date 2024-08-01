import Banner from '@/Components/Banner'
import Button from '@/Components/Button'
import Container from '@/Components/Container'
import Guest from '@/Layouts/GuestLayout'
import { Link } from '@inertiajs/react'
import React from 'react'

const Welcome = () => {
    return (
        <Guest>
            <Banner />
            <div className="py-3">
                <Container>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    {/* <div className="mt-5">
                        <p className="mb-2 font-bold text-lg uppercase">Submit calamity assistance request and track status</p>
                        <hr />
                        <Link href={route('lguAdmin.auth.login_form')} className='uppercase p-3 btn-outline-danger btn'>
                            LGU staff/ admin Portal
                        </Link>
                    </div> */}
                    {/* <hr /> */}
                    <div className="mt-">
                        <p className="mb-2 font-bold text-lg uppercase">Manage and access system</p>
                        <hr />
                        <Link href={route('pswdo.login')} className='uppercase btn btn-outline-primary p-3'>
                            PSWDO Staff / Admin Portal
                        </Link>
                    </div>
                </Container>
            </div>
        </Guest>
    )
}

export default Welcome
