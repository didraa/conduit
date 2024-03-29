import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../state/storeHooks";

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
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/editor"><i className="ion-compose"></i>&nbsp;New Article </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/settings"> <i className="ion-gear-a"></i>&nbsp;Settings </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={"/profile/" + user.username}>
                                    <img src="" className="user-pic"/>
                                    Eric Simons
                                </NavLink>
                            </li>
                        </> :
                        <>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Sign in</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register">Sign up</NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Header;