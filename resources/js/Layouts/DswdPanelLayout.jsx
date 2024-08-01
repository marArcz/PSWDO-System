import AppHeader from '@/Components/AppHeader'
import DswdNavbar from '@/Components/DswdNavbar'
import DswdSidebar from '@/Components/DswdSidebar'
import Navbar from '@/Components/Navbar'
import ReactModal from '@/Components/ReactModal'
import Sidebar from '@/Components/Sidebar'
import { useNavState } from '@/States'
import { router, usePage } from '@inertiajs/react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import SweetAlert2 from 'react-sweetalert2'
import { ToastContainer } from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const DswdPanelLayout = ({ header, children, headerTitle = "PSWDO", activeLink = "", backButtonLink = "", backButtonAction = null, unwrap = false }) => {
    const { navActive, setNavActive } = useNavState();
    const { flash } = usePage().props;
    const [swalProps, setSwalProps] = useState({});
    const [showPrintRisModal, setShowPrintRisModal] = useState(false);
    const [showPrintRdsModal, setShowPrintRdsModal] = useState(false);

    const MySwal = withReactContent(Swal)


    useEffect(() => {
        // display message from session
        if (flash.success) {
            setSwalProps({
                show: true,
                title: 'Success',
                text: flash.success,
                icon: "success"
            });

            // MySwal.fire({
            //     title: "Success",
            //     text: flash.success,
            //     icon: "success",
            //     confirmButtonColor: "0D6DA6"
            // })
        }

        document.querySelectorAll(".delete-btn").forEach(element => {
            element.addEventListener('click', function (e) {
                e.preventDefault();
                setSwalProps({
                    show: true,
                    title: 'Are you sure to delete this?',
                    text: "This cannot be undone",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
                    onConfirm: (result) => {
                        setSwalProps(p => ({ ...p, show: false }))
                        router.visit(element.attributes.getNamedItem("data-href").value, { method: "delete" })
                    },
                    didClose: () => setSwalProps(p => ({ ...p, show: false }))
                });

            })
        });
    }, []);

    return (
        <div>
            <AppHeader isActive={navActive} setIsActive={setNavActive} backButtonLink={backButtonLink} backButtonAction={backButtonAction} headerTitle={headerTitle} header={header} />
            <DswdSidebar activeLink={activeLink} isActive={navActive} />
            <main className={`${navActive ? '' : 'expanded'} content-body bg-gray-100`}>
                {
                    !unwrap ? (
                        <div className="py-3 content-wrapper">
                            {children}
                        </div>
                    ) : (
                        <div className="">
                            {children}
                        </div>
                    )
                }
            </main>
            <SweetAlert2
                {...swalProps}
                confirmButtonColor='#0D6DA6'
            />
            <ToastContainer
                position='bottom-right'
                autoClose={1200}
                theme='light' />

            {/* Ris modal */}
            <ReactModal
                show={false}
                onHide={() => setShowPrintRisModal(false)}
                size='xl'
                className="bg-transparent"
            >
                    <iframe className='w-100 h-[100vh] bg-transparent' src='/pdfs/RDS-form.pdf'>

                    </iframe>
            </ReactModal>
        </div>
    )
}

export default DswdPanelLayout
