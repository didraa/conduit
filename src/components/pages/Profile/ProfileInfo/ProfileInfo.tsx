import {followUser, unfollowUser} from "../../../../state/ProfileSlice";
import {useAppDispatch, useAppSelector} from "../../../../state/storeHooks";

const ProfileInfo = () => {
    const {currentUser} = useAppSelector(state => state.profile);

    const {user, isAuth} = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();

    const handleClickFollow = (username: string) => {
        dispatch(followUser(username))
    }

    const handleClickUnfollow = (username: string) => {
        dispatch(unfollowUser(username))
    }

    if(currentUser === null) {
        return <div>Загр</div>
    }

    return(
        <div className="user-info">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-md-10 offset-md-1">
                        <img src={currentUser.image || undefined} className="user-img"/>
                        <h4>{currentUser.username}</h4>
                        <p>
                            {currentUser.bio}
                        </p>
                        {user && currentUser.username == user.username ?
                            <button className="btn btn-sm btn-outline-secondary action-btn">
                                <i className="ion-gear-a"></i>
                                &nbsp; Edit Profile Settings
                            </button>
                            :
                            <button onClick={currentUser.following ? () => handleClickUnfollow(currentUser.username) : () => handleClickFollow(currentUser.username)} className="btn btn-sm btn-outline-secondary action-btn">
                                <i className="ion-plus-round"></i>
                                {currentUser.following ?
                                    <>
                                        &nbsp; Unfollow Eric Simons
                                    </> :
                                    <>
                                        &nbsp; Follow Eric Simons
                                    </>
                                }
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;