import { NavLink } from "react-router-dom"

export const Error = () => {
    return (
        <div className="error">
            <img src="/images/error.png" alt="" />
            <div className="btn">
                <NavLink to="">
                    <button>
                        GO TO HOME
                    </button>
                </NavLink>
                <NavLink to="/contact">
                    <button>
                        REPORT PROBLEM
                    </button>
                </NavLink>
            </div>
        </div>
    )
}
