import DataTableComponent from '@/Components/DataTableComponent'
import TextProfilePic from '@/Components/TextProfilePic'
import DswdPanelLayout from '@/Layouts/DswdPanelLayout'
import { Link } from '@inertiajs/react'
import React from 'react'
import { Button } from 'react-bootstrap'

const Staffs = ({ staffs, auth }) => {
    return (
        <DswdPanelLayout
            headerTitle='Manage Staff Accounts'
            activeLink='staffs'
        >

            <DataTableComponent
                hideActionButtons={!auth.user.isAdmin}
                createButtonLink={route('pswdo.staffs.create')}
                data={staffs}
                columns={[
                    {
                        name: 'Photo',
                        cell: row => (
                            <>
                                {
                                    auth.user.image ? (
                                        <Image
                                            className='rounded-circle lg:w-[45px] w-[35px]'
                                            src={auth?.user?.image}
                                            alt='User Photo'
                                        />
                                    ) : (
                                        <TextProfilePic className="text-dark fw-bold bg-light" size='md' text={auth?.user?.firstname[0]} />
                                    )
                                }
                            </>
                        )
                    },
                    {
                        name: 'Name',
                        selector: row => row.firstname + ' ' + row.lastname
                    },
                    {
                        name: 'Email address',
                        selector: row => row.email
                    },
                    {
                        name: 'Action',
                        cell: row => (
                            <div className="flex gap-4">
                                <Link href={route("pswdo.staffs.edit", row.id)} className='link-success'>
                                    <i className='fi fi-rr-edit'></i>
                                </Link>
                                <Link as='button' href={route('pswdo.staffs.destroy',row.id)} method="delete" className='link-danger '>
                                    <i className='fi fi-rr-trash fs-6'></i>
                                </Link>
                            </div>
                        )
                    },
                ]}
            />

        </DswdPanelLayout>
    )
}

export default Staffs
