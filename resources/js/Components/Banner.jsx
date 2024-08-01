import React from 'react'
import Container from './Container'

const Banner = ({ bannerText }) => {
    return (
        <div className=' relative mb-1'>
            {/* <img
                src='/images/banner.png'
                className=' w-full z-0 min-h-[130px]'
            /> */}
            <div className="welcome-banner"></div>

            <div className="z-10 absolute w-full mt-[-70px]">
                <Container>
                    <div className=' bg-primary py-3 text-center'>
                        <p className=' uppercase text-white my-0'>
                            {bannerText ?? 'pswdo calamity assistance request and management'}
                        </p>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Banner
