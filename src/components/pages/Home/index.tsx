
import {useEffect, useState} from "react";
import {loadTags} from "../../../state/TagsSlice";
import ArticlesViewer from "../../ArticlesViewer/ArticlesViewer";
import {useAppDispatch, useAppSelector} from "../../../state/storeHooks";
import {setCurrentPage, setCurrentTag, setTab} from "../../../state/ArticlesSlice";
import Pagination from "../../Pagination/Pagination";
import {set} from "react-hook-form";

const Home = () => {
    const dispatch = useAppDispatch();

    const {currentTag, selectedTab} = useAppSelector(state => state.articles)

    useEffect(() => {
        dispatch(loadTags())
    }, [dispatch, currentTag])


    const {tags} = useAppSelector(state => state.tags);
    const {isAuth} = useAppSelector(state => state.app);

    const changeTab = (tabType: string) => {
        dispatch(setTab(tabType));
        dispatch(setCurrentPage(1))
    }

    if (tags == null) {
        return <div>Load articles...</div>
    }


    return(
        <div className="home-page">
            <Banner/>
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        <div className="feed-toggle">
                            <ul className="nav nav-pills outline-active">
                                {isAuth &&
                                    <li className="nav-item">
                                        <div onClick={() => changeTab('feed')} className={selectedTab === 'feed' ? 'nav-link active' : 'nav-link'}>Your Feed</div>
                                    </li>
                                }
                                <li className="nav-item">
                                    <div onClick={() => changeTab('global')} className={selectedTab === 'global' ? 'nav-link active' : 'nav-link'}>Global Feed</div>
                                </li>
                                {selectedTab === 'tag' &&
                                    <li className="nav-item">
                                        <div className={selectedTab === 'tag' ? 'nav-link active' : 'nav-link'}>#{currentTag}</div>
                                    </li>
                                }
                            </ul>
                        </div>

                        <ArticlesViewer type={selectedTab} />
                        <Pagination />
                    </div>

                    <div className="col-md-3">
                        <div className="sidebar">
                            <p>Popular Tags</p>
                            <div className="tag-list">
                                <TagsList tags={tags}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TagsList = ({ tags }: {tags: string[]}) => {
    const dispatch = useAppDispatch();
    const getArticlesByTag = (tag: string) => {
        dispatch(setTab('tag'))
        dispatch(setCurrentPage(1))
        dispatch(setCurrentTag(tag));
    }

    return(
        <>
            {
                tags.map(currentTag => <div key={currentTag} onClick={() => getArticlesByTag(currentTag)} className="tag-pill tag-default">{currentTag}</div>)
            }
        </>
)
}

const Banner = () => {
    return(
        <div className="banner">
            <div className="container">
                <h1 className="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>
    )
}

export default Home;