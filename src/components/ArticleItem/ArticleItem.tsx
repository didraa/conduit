import {NavLink} from "react-router-dom";
import {addLike, deleteLike} from "../../state/ArticlesSlice";
import {useAppDispatch} from "../../state/storeHooks";
import {Article} from "../../types/article";

const ArticleItem = (props: {
    key: string,
    author: string,
    date: Date,
    slug: string,
    tagList: string[],
    description: string,
    title: string,
    favorited: boolean,
    favoritesCount: number,
    avatar: string | null
}) => {

    const dispatch = useAppDispatch();

    const likeArticle = (slug: string) => {
        dispatch(addLike(slug))
    }
    const removeLikeArticle = (slug: string) => {
        dispatch(deleteLike(slug))
    }

    return(
        <div className="article-preview">
            <div className="article-meta">
                <NavLink to={'/profile/' + props.author}>
                    <img src={props.avatar || undefined}/>
                </NavLink>
                <div className="info">
                    <NavLink className="author" to={'/profile/' + props.author}>
                        {props.author}
                    </NavLink>
                    <span className="date">{new Date(props.date).toDateString()}</span>
                </div>
                <button onClick={props.favorited ? () => removeLikeArticle(props.slug) : () => likeArticle(props.slug)} className={props.favorited ? 'btn btn-primary btn-sm pull-xs-right' : 'btn btn-outline-primary btn-sm pull-xs-right'}>
                    <i className="ion-heart"></i> {props.favoritesCount}
                </button>
            </div>
            <NavLink className="preview-link" to={`/article/${props.slug}`}>
                <h1>{props.description}</h1>
                <p>{props.title}</p>

                    <span>Read more...</span>


                    <TagList tags={props.tagList} />

            </NavLink>
        </div>
    )
}

const TagList = ({tags}: {tags: string[]}) => {
    return (
        <ul className="tag-list">
            {tags.map(tag => (
                <li className="tag-default tag-pill tag-outline">{tag}</li>
            ))}
        </ul>
    );
}

export default ArticleItem;