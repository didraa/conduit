import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../state/storeHooks";
import {User} from "../../types/user";

const Header = () => {
    const { user} = useAppSelector(state => state.app);

    return(
        <nav className="navbar navbar-light">
            <div className="container">
                <NavLink className="navbar-brand" to="/">conduit</NavLink>
                <ul className="nav navbar-nav pull-xs-right">
                    <li className="nav-item">
                        <NavLink className="nav-link active" to="/">Home</NavLink>
                    </li>

                    {user ?
                        <UserLinks user={user}/>
                         :
                        <GuestLinks/>
                    }
                </ul>
            </div>
        </nav>
    )
}

const GuestLinks = () => {
    return(
        <>
            <li className="nav-item">
                <NavLink className="nav-link" to="/login">Sign in</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/register">Sign up</NavLink>
            </li>
        </>
    )
}

const UserLinks = ({user}: {user: User}) => {
    return(
        <>
            <li className="nav-item">
                <NavLink className="nav-link" to="/editor"><i className="ion-compose"></i>&nbsp;New Article </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/settings"> <i className="ion-gear-a"></i>&nbsp;Settings </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to={"/profile/" + user.username}>
                    <img src={user.image || undefined} alt="user-pic" className="user-pic"/>
                    {user.username}
                </NavLink>
            </li>
        </>
    )
}

export default Header;