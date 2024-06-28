import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ArticlesViewer from "../../ArticlesViewer/ArticlesViewer";
import {getUserProfile} from "../../../state/ProfileSlice";
import {useAppDispatch, useAppSelector} from "../../../state/storeHooks";

const Profile = () => {
    let params = useParams();
    const dispatch = useAppDispatch();
    const username = params.username;
    const { currentUser} = useAppSelector(state => state.profile)
    const [type, setType] = useState('my')

    useEffect(() => {
        if (username !== undefined)  dispatch(getUserProfile(username))
    }, [type, dispatch, username])

    return(
        <>
            {currentUser &&
                <div className="profile-page">
                    <ProfileInfo />
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                <div className="articles-toggle">
                                    <ul className="nav nav-pills outline-active">
                                        <li onClick={() => setType('my')} className="nav-item">
                                            <div className={type === 'my' ? 'nav-link active' : 'nav-link'}>My Articles</div>
                                        </li>
                                        <li onClick={() => setType('favorited')} className="nav-item">
                                            <div className={type === 'favorited' ? 'nav-link active' : 'nav-link'}>Favorited Articles</div>
                                        </li>
                                    </ul>
                                </div>

                                <ArticlesViewer type={type} />

                                <ul className="pagination">
                                    <li className="page-item active">
                                        <a className="page-link" href="">1</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="">2</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Profile;