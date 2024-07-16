// import { useEffect, useState } from "react";

import { useAuth } from "../store/auth"

export const Analytics = () => {

    const {services} = useAuth()

    return (
        <div className="main">
            <div className="analytics-banner">
                {/* <div className="grid grid-four-cols"> */}
                    <div className="brand">
                        <img src="/images/logo.png" alt="" />
                    </div>
                    <div className="brand">
                        <img src="/images/logo (1).png" alt="" />
                    </div>
                    <div className="brand">
                        <img src="/images/logo (2).png" alt="" />
                    </div>
                    <div className="brand">
                        <img src="/images/logo (3).png" alt="" />
                    </div>
                    <div className="brand">
                        <img src="/images/logo (6).png" alt="" />
                    </div>
                    <div className="brand">
                        <img src="/images/logo (5).png" alt="" />
                    </div>
                {/* </div> */}
            </div>
        </div>
    )
}
