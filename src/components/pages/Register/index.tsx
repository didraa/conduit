import {useDispatch} from "react-redux";
import {SubmitHandler, useForm} from "react-hook-form";
import {signUpUser} from "../../../state/AppSlices";
import {useAppDispatch} from "../../../state/storeHooks";
import {RegisterFormValues} from "../../../types/form";

const Register = () => {

    const dispatch = useAppDispatch();
    const {register, formState: {
        errors,
    },
        handleSubmit,
        reset} = useForm<RegisterFormValues>({
        mode: "onBlur"
    });
    const onSubmit:SubmitHandler<RegisterFormValues> = (formData) => {
        dispatch(signUpUser(formData));
        reset();
    }

    return(
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign up</h1>
                        <p className="text-xs-center">
                            <a href="/login">Have an account?</a>
                        </p>

                        <ul className="error-messages">
                            <li>That email is already taken</li>
                        </ul>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className="form-group">
                                <input {...register('username',
                                    {
                                        required: 'Поле обязательно к заполнению',
                                        minLength: 5
                                    })} className="form-control form-control-lg" type="text" placeholder="Username"/>
                            </fieldset>
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
                            <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;