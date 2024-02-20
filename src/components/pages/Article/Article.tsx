import {useEffect} from "react";

import {NavLink, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../state/storeHooks";
import {SubmitHandler, useForm} from "react-hook-form";

import {loadArticle, loadComments, setComment} from "../../../state/ArticlePageSlice";
import {CommentsFormValues} from "../../../types/form";
import {ArticleComment} from "../../../types/comment";
import {Article} from "../../../types/article";
import {User} from "../../../types/user";


const ArticlePage = () => {
    const {currentArticle, comments} = useAppSelector(state => state.articlePage);
    const { user} = useAppSelector(state => state.app);
    const dispatch = useAppDispatch();
    const params = useParams();
    const {register, formState: {
        errors,
    },
        handleSubmit,
        reset} = useForm<CommentsFormValues>({
        mode: "onBlur"
    });
    const onSubmit: SubmitHandler<CommentsFormValues> = (formData: {text: string}) => {
        if (currentArticle) {
            dispatch(setComment({text: formData.text, slug: currentArticle.slug}));
            reset();
        }
    }

    useEffect(() => {
        const slug = params.slug;
        if (slug != null) {
            dispatch(loadArticle(slug))
            dispatch(loadComments(slug))
        }
    }, [dispatch])

    if (!currentArticle || !comments) return <div>загр</div>

    return(
        <div className="article-page">
            <div className="banner">
                <div className="container">
                    <h1>{currentArticle.title}</h1>
                    <div className="article-meta">
                        {user &&  <ArticleMeta article={currentArticle} user={user}/>}
                        {user && currentArticle.author.username === user.username ?
                            <>
                                <button className="btn btn-sm btn-outline-secondary">
                                    <NavLink to={`/profile/${currentArticle.slug}`}>
                                        <i className="ion-edit"></i> Edit Article
                                    </NavLink>
                                </button>
                                <button className="btn btn-sm btn-outline-danger">
                                    <i className="ion-trash-a"></i> Delete Article
                                </button>
                            </>
                           :
                            <>
                                <button className="btn btn-sm btn-outline-secondary">
                                    <i className="ion-plus-round"></i>
                                    &nbsp; Follow {currentArticle.author.username} <span className="counter">(10)</span>
                                </button>
                                &nbsp;&nbsp;
                                <button className="btn btn-sm btn-outline-primary">
                                    <i className="ion-heart"></i>
                                    &nbsp; Favorite Post <span className="counter">{currentArticle.favoritesCount}</span>
                                </button>
                            </>
                        }
                    </div>
                </div>
            </div>
            <div className="container page">
                <div className="row article-content">
                    <div className="col-md-12">
                        <p>{currentArticle.body}</p>
                        <h2 id="introducing-ionic">Introducing RealWorld.</h2>
                        <p>It's a great solution for learning how other frameworks work.</p>
                        <ul className="tag-list">
                            <TagList tagList={currentArticle.tagList}/>
                        </ul>
                    </div>
                </div>
                <hr/>

                {user &&
                    <>
                        <ArticleMeta article={currentArticle} user={user}/>
                        <div className="row">
                            <div className="col-xs-12 col-md-8 offset-md-2">
                                <form onSubmit={handleSubmit(onSubmit)} className="card comment-form">
                                    <div className="card-block">
                                    <textarea {...register('text',
                                        {
                                            required: 'Поле обязательно к заполнению',
                                        })} className="form-control" placeholder="Write a comment..." rows={3}></textarea>
                                    </div>
                                    <div className="card-footer">
                                        <img src={user.image || undefined} className="comment-author-img"/>
                                        <button className="btn btn-sm btn-primary">Post Comment</button>
                                    </div>
                                </form>
                                <CommentsList comments={comments}/>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

const ArticleAuthorInfo = ({article}: {article: Article}) => {
    return(
        <>
            <a href="/profile/eric-simons"><img alt='avatar' src={article.author.image || undefined}/></a>
            <div className="info">
                <a href="/profile/eric-simons" className="author">{article.author.username}</a>
                <span className="date">{new Date(article.updatedAt).toDateString()}</span>
            </div>
        </>
    )
}

const ArticleMeta = ({article, user}: {article: Article, user: User}) => {
    return(
        <div className="article-actions">
            <div className="article-meta">
                <ArticleAuthorInfo article={article} />
                {article.author.username === user.username ?
                    <>
                        <button className="btn btn-sm btn-outline-secondary">
                            <NavLink to={`/editor/${article.slug}`}>
                                <i className="ion-edit"></i> Edit Article
                            </NavLink>
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                            <i className="ion-trash-a"></i> Delete Article
                        </button>
                    </>
                    :
                    <>
                        <button className="btn btn-sm btn-outline-secondary">
                            <i className="ion-plus-round"></i>
                            &nbsp; Follow {article.author.username}
                        </button>
                        &nbsp;
                        <button className="btn btn-sm btn-outline-primary">
                            <i className="ion-heart"></i>
                            &nbsp; Favorite Article <span className="counter">(29)</span>
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

const CommentsList = ({comments}: {comments: ArticleComment[]}) => {
    return(
        <>
            {comments.map(comment =>
            <div className="card">
                <div className="card-block">
                    <p className="card-text">
                        {comment.body}
                    </p>
                </div>
                <div className="card-footer">
                    <a href="/profile/author" className="comment-author">
                        <img src={comment.author.image || undefined} className="comment-author-img"/>
                    </a>
                    &nbsp;
                    <a href="/profile/jacob-schmidt" className="comment-author">{comment.author.username}</a>
                    <span className="date-posted">{new Date(comment.updatedAt).toDateString()}</span>
                    <span className="mod-options"><i className="ion-trash-a"></i></span>
                </div>
            </div>
            )
            }
        </>
    )
}

const TagList = ({tagList}: {tagList: string[]}) => {
    return(
        <>
            {
                tagList.map(tag => <li className="tag-default tag-pill tag-outline">{tag}</li>)
            }
        </>

    )
}

export default ArticlePage;