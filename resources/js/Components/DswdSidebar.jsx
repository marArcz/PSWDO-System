import React from 'react'
import Sidebar, { NavType } from './Sidebar'

const DswdSidebar = ({ isActive = true, activeLink = '' }) => {
    const navList = [
        {
            type: NavType.LINK,
            icon: <i className='fi fi-rr-dashboard'></i>,
            text: 'Dashboard',
            href: route('pswdo.dashboard'),
            activeKey: 'dashboard'
        },
        {
            type: NavType.LINK,
            icon: <i className='fi fi-rr-city'></i>,
            text: 'Municipalities',
            href: route('pswdo.municipalities.index'),
            activeKey: 'municipalities'
        },
        {
            type: NavType.DROPDOWN,
            icon: <i className='fi fi-rr-settings'></i>,
            text: 'Inventory Management',
            href: route('pswdo.inventories.index'),
            activeKey: 'inventories',
            navList: [
                {
                    type: NavType.LINK,
                    icon: <i className='fi fi-rr-boxes'></i>,
                    text: 'Inventory',
                    href: route('pswdo.inventories.index'),
                    activeKey: 'inventories',
                },
                {
                    type: NavType.LINK,
                    icon: <i className='fi fi-rr-calculator'></i>,
                    text: 'Allocation Calculator',
                    href: route('pswdo.distributions.calculator'),
                    activeKey: 'calculator',
                },
                {
                    type: NavType.LINK,
                    icon: <i className='fi fi-rr-time-past'></i>,
                    text: 'Tracking History',
                    href: route('pswdo.inventory_histories.index'),
                    activeKey: 'inventory_histories',
                },
                {
                    type: NavType.LINK,
                    icon: <i className='fi fi-rr-balance-scale-left'></i>,
                    text: 'Units',
                    href: route('pswdo.units.index'),
                    activeKey: 'units',
                }
            ]
        },
        {
            type: NavType.LINK,
            icon: <i className='fi fi-rr-inbox'></i>,
            text: 'Report List',
            href: route('pswdo.reports.index'),
            activeKey: 'reports'
        },
        {
            type: NavType.DROPDOWN,
            icon: <i className='fi fi-rr-settings'></i>,
            text: 'Assistance distribution',
            activeKey: 'inventories',
            navList: [
                {
                    type: NavType.LINK,
                    icon: <i className='fi fi-rr-notes'></i>,
                    text: 'Pending distributions',
                    href: route('pswdo.distributions.index'),
                    activeKey: 'distributions',
                },
                {
                    type: NavType.LINK,
                    icon: <i className='fi fi-rr-box'></i>,
                    text: 'Archived',
                    href: route('pswdo.distributions.archived'),
                    activeKey: 'archived_distributions',
                },

            ]
        },
        {
            type: NavType.LINK,
            icon: <i className='fi fi-rr-hurricane'></i>,
            text: 'Typhoons',
            href: route('pswdo.calamities.index'),
            activeKey: 'typhoons'
        },
        {
            type: NavType.LINK,
            icon: <i className='fi fi-rr-user-gear'></i>,
            text: 'Staff Accounts',
            href: route('pswdo.staffs.index'),
            activeKey: 'staffs',
            adminOnly: true
        },
        {
            type: NavType.DROPDOWN,
            icon: <i className='fi fi-rr-document'></i>,
            text: 'Printable Forms',
            activeKey: 'forms',
            navList: [
                {
                    type: NavType.BUTTON,
                    icon: <i className='fi fi-rr-file'></i>,
                    text: 'RIS Form',
                    onClick: () => window.open('/pdfs/RIS-form.pdf', "_blank")
                },
                {
                    type: NavType.BUTTON,
                    icon: <i className='fi fi-rr-file'></i>,
                    text: 'RDS Form',
                    onClick: () => window.open('/pdfs/RDS-form.pdf', "_blank")
                },
            ]
        },

    ];
    return (
        <>
            <Sidebar
                isActive={isActive}
                activeLink={activeLink}
                navList={navList}
            />
        </>
    )
}

export default DswdSidebar
