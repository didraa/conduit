import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../state/storeHooks";
import {ArticleForEditor, CreateArticleType} from "../../types/article";
import {createArticle} from "../../state/ArtileEditorSlice";
import {useParams} from "react-router-dom";
import {loadArticle} from "../../state/ArticlePageSlice";



import React, { useState, useEffect } from 'react';
import {Dispatch} from "@reduxjs/toolkit";

const useFormState = () => {
    const [inputValue, setInputValue] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setInputValue(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputValue && !tags.includes(inputValue)) {
            setTags(prevTags => [...prevTags, inputValue]);
            setInputValue('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return { inputValue, tags, handleInputChange, handleKeyPress, removeTag };
};

const useArticleEditor = (submitArticle: CreateArticleType, dispatch: Dispatch<any>, params: any, tags: string[]) => {
    useEffect(() => {
        if (params.slug) {
            dispatch(loadArticle(params.slug));
        }
    }, []);

    const { register, handleSubmit, reset } = useForm<ArticleForEditor>({
        mode: "onBlur"
    });

    const onSubmit: SubmitHandler<ArticleForEditor> = (formData) => {
        formData.tagList = tags;
        dispatch(createArticle(formData));
        reset();
    };

    return { register, handleSubmit, onSubmit };
};

const ArticleEditor = (props: { submitArticle: CreateArticleType }) => {
    const dispatch = useAppDispatch();
    const { errors } = useAppSelector(state => state.articleEditor);
    let params = useParams();

    const { inputValue, tags, handleInputChange, handleKeyPress, removeTag } = useFormState();
    const { register, handleSubmit, onSubmit } = useArticleEditor(props.submitArticle, dispatch, params, tags);

    return (
        <div className="editor-page">
            <div className="editor-page">
                <div className="container page">
                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-xs-12">
                            <ul className="error-messages">
                                <li>{errors as string}</li>
                            </ul>

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <fieldset>
                                    <fieldset className="form-group">
                                        <input {...register('title')} type="text" className="form-control form-control-lg"
                                               placeholder="Article Title"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input {...register('description')}  type="text" className="form-control"
                                               placeholder="What's this article about?"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                  <textarea {...register('body')}
                                            className="form-control"
                                            rows={8}
                                            placeholder="Write your article (in markdown)"
                                  ></textarea>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <input onChange={handleInputChange} value={inputValue} onKeyDown={handleKeyPress} type="text" className="form-control" placeholder="Enter tags"/>
                                        <div className="tag-list">
                                            {tags.map(tag => <span className="tag-default tag-pill"> <i onClick={() => removeTag(tag)} className="ion-close-round"></i>{tag}</span>)}
                                        </div>
                                    </fieldset>
                                    <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                                        Publish Article
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ArticleEditor;
