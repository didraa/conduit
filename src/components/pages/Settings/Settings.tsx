import {useDispatch, useSelector} from "react-redux";
import {SubmitHandler, useForm} from "react-hook-form";
import {logout, signInUser, updateUser} from "../../../state/AppSlices";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../state/storeHooks";
import {SettingsFormValue} from "../../../types/form";

const Settings = () => {
    const {user} = useAppSelector(state => state.app);

    const dispatch = useAppDispatch();
    const {register, formState: {
        errors,
    },
        handleSubmit,
        reset} = useForm<SettingsFormValue>({
        mode: "onBlur"
    });

    const onSubmit:SubmitHandler<SettingsFormValue> = (formData) => {
        dispatch(updateUser(formData));
        reset();
    }

    const handleClick = () => {
        dispatch(logout())

        return <Navigate to='/'/>
    }

    if (user == null) return <Navigate to='/'/>

    return(
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>

                        <ul className="error-messages">
                            <li>That name is required</li>
                        </ul>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input {...register('image',
                                        {
                                            required: 'Поле обязательно к заполнению',
                                            minLength: 5
                                        })} className="form-control" value={user.image || undefined} type="text" placeholder="URL of profile picture"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input {...register('username',
                                        {
                                            required: 'Поле обязательно к заполнению',
                                            minLength: 5
                                        })} className="form-control form-control-lg" type="text"
                                           placeholder="Your Name" value={user.username}/>
                                </fieldset>
                                <fieldset className="form-group">
                                      <textarea {...register('bio',
                                          {
                                              required: 'Поле обязательно к заполнению',
                                              minLength: 5
                                          })}
                                          className="form-control form-control-lg"
                                          rows={8}
                                          placeholder="Short bio about you"
                                          value={user.bio}
                                      >{user.bio}
                                </textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input {...register('email',
                                        {
                                            required: 'Поле обязательно к заполнению',
                                            minLength: 5
                                        })} value={user.email} className="form-control form-control-lg" type="text" placeholder="Email"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input {...register('password',
                                        {
                                            required: 'Поле обязательно к заполнению',
                                            minLength: 5
                                        })}
                                        className="form-control form-control-lg"
                                        type="password"
                                        placeholder="New Password"
                                    />
                                </fieldset>
                                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                            </fieldset>
                        </form>
                        <hr/>
                        <button onClick={() => handleClick()} className="btn btn-outline-danger">Or click here to logout.</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;