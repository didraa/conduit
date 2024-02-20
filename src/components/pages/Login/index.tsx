import {SubmitHandler, useForm} from "react-hook-form";
import {signInUser} from "../../../state/AppSlices";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../state/storeHooks";
import {LoginFormValues} from "../../../types/form";

const Login = () => {

    const {isAuth, formErrors} = useAppSelector(state => state.app)
    const dispatch = useAppDispatch();
    const {register, formState: {
        errors,
    },
            handleSubmit,
        reset} = useForm<LoginFormValues>({
        mode: "onBlur"
    });

    const onSubmit: SubmitHandler<LoginFormValues> = (formData) => {
        dispatch(signInUser(formData));
        reset();
    }

    if (isAuth) return <Navigate to={'/'}/>;

    return(
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <a href="/Register">Need an account?</a>
                        </p>
                        {formErrors &&
                            <ul className="error-messages">
                                <li>{formErrors}</li>
                            </ul>
                        }
                        <form onSubmit={handleSubmit(onSubmit)} >
                            <fieldset className="form-group">
                                <input {...register('email',
                                    {
                                        required: 'Поле обязательно к заполнению',
                                        minLength: 5
                                    })} className="form-control form-control-lg" type="text" placeholder="Email"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <input {...register('password',
                                    {
                                        required: 'Поле обязательно к заполнению',
                                        minLength: 5
                                    })} className="form-control form-control-lg" type="password" placeholder="Password"/>
                            </fieldset>
                            <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login;