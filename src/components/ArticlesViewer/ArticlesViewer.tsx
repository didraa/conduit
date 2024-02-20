import {useEffect} from "react";
import ArticleItem from "../ArticleItem/ArticleItem";
import {
    getArticlesByTag,
    getFeedArticles,
    getGlobalArticles,
    loadUserArticles,
    loadUserFavorited
} from "../../state/ArticlesSlice";
import {useAppDispatch, useAppSelector} from "../../state/storeHooks";
import {Article} from "../../types/article";

const ArticlesViewer = ({type}: {type: string}) => {

    const {currentUser} = useAppSelector(state => state.profile)
    const {articles, isLoading, currentTag, currentPage} = useAppSelector(state => state.articles);

    const dispatch = useAppDispatch();

    useEffect(() => {
        switch (type) {
            case 'my':
                if (currentUser) {
                    dispatch(loadUserArticles(currentUser.username));
                }
                break;
            case 'favorited':
                if (currentUser) {
                    dispatch(loadUserFavorited(currentUser.username));
                }
                break;
            case 'global':
                dispatch(getGlobalArticles((currentPage - 1) * 10));
                break;
            case 'feed':
                dispatch(getFeedArticles((currentPage - 1) * 10));
                break;
            case 'tag':
                dispatch(getArticlesByTag({currentTag, currentPage}))
                break;

        }
    }, [type, currentTag, dispatch, currentPage]);

    if (isLoading || articles === null) {
        return <div>Loading articles...</div>;
    }

    if (articles.length === 0) {
        return <div>No articles are here... yet.</div>;
    }

    return(
        <ArticlesList articles={articles} />
    )
}

const ArticlesList = ({articles}: {articles: Article[]}) => {
    return (
        <div>
            {articles.map(article => (
                <ArticleItem key={article.slug}
                             tagList={article.tagList}
                             author={article.author.username}
                             date={article.updatedAt}
                             slug={article.slug}
                             description={article.description}
                             title={article.title}
                             favorited={article.favorited}
                             favoritesCount={article.favoritesCount}
                             avatar={article.author.image} />
            ))}
        </div>
    );
}


export default ArticlesViewer;