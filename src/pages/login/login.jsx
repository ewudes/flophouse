import React, {useState} from 'react';
import Header from '../../components/header/header';
import {login} from '../../store/api-actions';
import {useSelector, useDispatch} from 'react-redux';
import ErrorMessage from '../../components/error-message/error-message';
import {getCity} from '../../store/selectors';

const Login = () => {
  const city = useSelector(getCity);
  const dispatch = useDispatch();

  const [credentials, setСredentials] = useState({
    email: ``,
    userPassword: ``
  });

  const handleFieldChange = (evt) => {
    const {name, value} = evt.target;
    setСredentials({...credentials, [name]: value});
  };

  const formSubmitHandler = (evt) => {
    evt.preventDefault();

    dispatch(login({
      login: credentials.email,
      password: credentials.password,
    }));
  };

  return (
    <div className="page page--gray page--login">
      <ErrorMessage />
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={formSubmitHandler}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required onChange={handleFieldChange}/>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required onChange={handleFieldChange}/>
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Login;
