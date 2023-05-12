import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalRegister from "./ModalRegister";
import styled from 'styled-components';
import axios from '../../../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [stateModal, changeStateModal] = useState(false);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [name, setName] = useState('');

    const [phone,setPhone] = useState(''); 

    const [email,setEmail] = useState('');
 
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);

        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user,name,phone,email,pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setSuccess(true);
            setUser('');
            setName('');
            setPhone('');
            setEmail('');
            setPwd('');
            setMatchPwd('');
            
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <div>
            <Content_Anchor>
                <Anchor onClick={() => changeStateModal(!stateModal)}>Crear Cuenta</Anchor>
            </Content_Anchor>

            <ModalRegister state={stateModal} changestate={changeStateModal}>
                <Content>
                        <>
                    {success ? (
                        <section>
                            <h1>Exito!</h1>
                            <p>
                                <a href="/login">Sign In</a>
                            </p>
                        </section>
                    ) : (
                        <section className="login-box">
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <h1>Registro</h1>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="username">
                                    Usuario:
                                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                                <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    4 a 24 caracteres.<br />
                                    Debe comenzar con una letra.<br />
                                    Se permiten letras, números, guiones bajos y guiones.
                                </p>

                                <label htmlFor="name">
                                Nombre:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            <label htmlFor="phone">
                                    Telefono:
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                />
                                <label htmlFor="emil">
                                Email:
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <label htmlFor="password">
                                    Contraseña:
                                    <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    8 a 24 caracteres.<br />
                                    Debe incluir letras mayúsculas y minúsculas, un número y un carácter especial.<br />
                                    Caracteres especiales permitidos: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </p>
                                <label htmlFor="confirm_pwd">
                                    Confirmar Contraseña:
                                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                                </label>
                                <input
                                    type="password"
                                    id="confirm_pwd"
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Debe coincidir con el primer campo de entrada de contraseña.
                                </p>

                                <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                            </form>
                            <p>
                                ¿Ya registrado?<br />
                                <span className="line">
                                    {/*put router link here*/}
                                    <a href="/login">Sign In</a>
                                </span>
                            </p>
                        </section>
                    )}
                </>
                </Content>
            </ModalRegister>
        </div>
    )
}

export default Register

const Content_Anchor = styled.div`
    font-family: 'Bruno Ace SC', cursive;
    padding: 3px;
`;

const Anchor = styled.div`
    color: black;
    cursor: pointer;
    padding: 3px;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
    font-family: 'Bruno Ace SC', cursive;
    .login-box {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 400px;
        padding: 40px;
        margin: 20px auto;
        transform: translate(-50%, -55%);
        background: rgba(0,0,0,.9);
        box-sizing: border-box;
        box-shadow: 0 15px 25px rgba(0,0,0,.6);
        border-radius: 10px;
      }
      
      .login-box p:first-child {
        margin: 0 0 30px;
        padding: 0;
        color: #fff;
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
        letter-spacing: 1px;
      }
      
      .login-box .user-box {
        position: relative;
      }
      
      .login-box .user-box input {
        width: 100%;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        margin-bottom: 30px;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        background: transparent;
      }
      
      .login-box .user-box label {
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px 0;
        font-size: 16px;
        color: #fff;
        pointer-events: none;
        transition: .5s;
      }
      
      .login-box .user-box input:focus ~ label,
      .login-box .user-box input:valid ~ label {
        top: -20px;
        left: 0;
        color: #fff;
        font-size: 12px;
      }
      
      .login-box form a {
        position: relative;
        display: inline-block;
        padding: 10px 20px;
        font-weight: bold;
        color: #fff;
        font-size: 16px;
        text-decoration: none;
        text-transform: uppercase;
        overflow: hidden;
        transition: .5s;
        margin-top: 40px;
        letter-spacing: 3px
      }
      
      .login-box a:hover {
        background: #fff;
        color: #272727;
        border-radius: 5px;
      }
      
      .login-box a span {
        position: absolute;
        display: block;
      }
      
      .login-box a span:nth-child(1) {
        top: 0;
        left: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, #fff);
        animation: btn-anim1 1.5s linear infinite;
      }
      
      @keyframes btn-anim1 {
        0% {
          left: -100%;
        }
      
        50%,100% {
          left: 100%;
        }
      }
      
      .login-box a span:nth-child(2) {
        top: -100%;
        right: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(180deg, transparent, #fff);
        animation: btn-anim2 1.5s linear infinite;
        animation-delay: .375s
      }
      
      @keyframes btn-anim2 {
        0% {
          top: -100%;
        }
      
        50%,100% {
          top: 100%;
        }
      }
      
      .login-box a span:nth-child(3) {
        bottom: 0;
        right: -100%;
        width: 100%;
        height: 2px;
        background: linear-gradient(270deg, transparent, #fff);
        animation: btn-anim3 1.5s linear infinite;
        animation-delay: .75s
      }
      
      @keyframes btn-anim3 {
        0% {
          right: -100%;
        }
      
        50%,100% {
          right: 100%;
        }
      }
      
      .login-box a span:nth-child(4) {
        bottom: -100%;
        left: 0;
        width: 2px;
        height: 100%;
        background: linear-gradient(360deg, transparent, #fff);
        animation: btn-anim4 1.5s linear infinite;
        animation-delay: 1.125s
      }
      
      @keyframes btn-anim4 {
        0% {
          bottom: -100%;
        }
      
        50%,100% {
          bottom: 100%;
        }
      }
      
      .login-box p:last-child {
        color: #aaa;
        font-size: 14px;
      }
      
      .login-box a.a2 {
        color: #fff;
        text-decoration: none;
      }
      
      .login-box a.a2:hover {
        background: transparent;
        color: #aaa;
        border-radius: 5px;
      }
`;