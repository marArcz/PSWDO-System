import { Link, usePage } from '@inertiajs/react'
import React, { memo, useState } from 'react'
import { useEffect } from 'react'
import { Nav } from 'react-bootstrap'

export const NavType = {
    LINK: 0,
    DROPDOWN: 1,
    BUTTON: 2,
    DOWNLOADABLE: 3
}

const NavLink = ({ role, item, activeLink }) => {
    const currentUrl = window.location;
    return role == 'staff' && item.adminOnly ?
            null : (
            <li>
                <Link className={activeLink == item.activeKey ? 'active' : ''} href={item.href}>
                    {item.icon}
                    <span className='text-truncate'>{item.text}</span>
                </Link>
            </li>
        )
}
const NavDownloadable = ({ item, activeLink }) => {
    return (
        <li>
            <a target='_blank' download={true} href={item.downloadable}>
                {item.icon}
                <span className='text-truncate'>{item.text}</span>
            </a>
        </li>
    )
}

const NavButton = ({ item }) => {
    return (
        <li>
            <Link onClick={item.onClick}>
                {item.icon}
                <span className='text-truncate'>{item.text}</span>
            </Link>
        </li>
    )
}

const isActive = (item, activeLink) => {
    var links = findLinks(item);

    // console.log('activeLink ', activeLink)
    for (let link of links) {
        if (link.activeKey == activeLink) {
            return true;
        }
    }
    return false;
}
const getNavLink = (item) => {
    for (let navLink of item.navList) {
        if (navLink.type == NavType.DROPDOWN) {
            return getNavLink(navLink)
        } else if (navLink.type == NavType.LINK) {
            return navLink;
        }
    }

    return null;
}
const getNavLinks = (item) => {
    var navLinks = [];
    for (let navItem of item.navList) {
        if (navItem.type == NavType.DROPDOWN) {
            let navLink = getNavLink(navItem);
            if (navLink != null) {
                navLinks.push(navLink);
            }
        }
    }
    return navLinks
}

const findLinks = (dropdown) => {
    let links = [];
    for (let item of dropdown.navList) {
        if (item.type == NavType.DROPDOWN) {
            // let index = 0;
            links.push(...findLinks(item))
        } else if (item.type == NavType.LINK) {
            links.push(item)
        }
    }
    return links;
}

const NavDropdown = ({ item, activeLink }) => {
    const currentUrl = window.location;
    const matched = 0;

    const matchesKey = currentUrl.pathname.split('/')[2] === item.key;
    const active = isActive(item, activeLink) || matchesKey

    // console.log('dropdownItemData: ', { item, active })

    const [expanded, setExpanded] = useState(active)

    return (
        <li className={`${active ? 'active' : ''}`}>
            <a onClick={() => setExpanded(s => !s)} aria-expanded={expanded} className='has-arrow bx cursor-pointer'>
                {item.icon}
                <span className='text-truncate font-sans'>{item.text}</span>
            </a>
            <ul as="ul" className='nested' aria-expanded={expanded}>
                {
                    item.navList && item.navList.map((i, index) => (
                        i.type === NavType.LINK ? (
                            /* for links */
                            <NavLink key={index} activeLink={activeLink} item={i} />
                        ) : (
                            /* for dropdown */
                            i.type === NavType.BUTTON ? (
                                <NavButton key={index} item={i} />
                            ) : (
                                i.type === NavType.DOWNLOADABLE ? (
                                    <NavDownloadable activeLink={activeLink} key={index} item={i} />
                                ) : (
                                    <NavDropdown activeLink={activeLink} key={index} item={i} />
                                )
                            )
                        )
                    ))
                }
            </ul>
        </li>
    )
}

const Sidebar = ({ isActive: activeNav, activeLink, navList = [] }) => {

    const { auth: { role, user } } = usePage().props;

    return (
        <div className={`app-sidebar shadow-sm bg-white ${activeNav ? 'active' : ''}`}>
            <div className="sidebar-menu">
                <ul className='main'>
                    {
                        navList && navList.map((item, index) => (
                            item.type === NavType.LINK ? (
                                /* for links */
                                <NavLink role={role} activeLink={activeLink} key={index} item={item} />
                            ) : (
                                /* for dropdown */
                                item.type === NavType.BUTTON ? (
                                    <NavButton role={role} key={index} item={item} />
                                ) : (
                                    item.type === NavType.DOWNLOADABLE ? (
                                        <NavDownloadable role={role} activeLink={activeLink} key={index} item={item} />
                                    ) : (
                                        <NavDropdown role={role} activeLink={activeLink} key={index} item={item} />
                                    )
                                )
                            )
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Sidebar
