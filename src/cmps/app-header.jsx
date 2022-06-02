import { NavLink } from "react-router-dom"
import { ReactComponent as Logo } from "../assets/icons/logo.svg"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";

export const AppHeader = ({ onOpenModal }) => {

    const history = useNavigate()
    const { user } = useSelector((storeState) => storeState.userModule)

    function onGoBack() {
        history("/")
    }

    return <header className="app-header flex space-between align-center">
        <div className="logo flex align-center gap" onClick={onGoBack}>
            {<Logo />}
            <div>4Rent</div>
        </div>

        <div className="flex align-center">

            <nav className="main-nav flex">
                {/* <NavLink to="/">Home</NavLink> */}
                {/* <NavLink to="/login">Login</NavLink> */}
                <NavLink to="/stay">Explore</NavLink>
                <NavLink to="/host">Become a host</NavLink>
            </nav>

            <button className="user-menu" onClick={onOpenModal}>
                <img src={require('../assets/icons/hamburger.svg').default} alt="" />
                {!user && <img src={require('../assets/icons/user.svg').default} alt="" />}
                {user && <img src={user.imgUrl} alt="" className="curr-user-img"/>}
            </button>

        </div>

    </header>
}