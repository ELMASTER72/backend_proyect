import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../../../context/AuthProvider";
import ModalLogin from "./ModalLogin";
import styled from 'styled-components';
import axios from '../../../api/axios';;
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [stateModal, changeStateModal] = useState(false);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div>
            <Content_Anchor>
                <Anchor onClick={() => changeStateModal(!stateModal)}>Ingresar</Anchor>
            </Content_Anchor>

            <ModalLogin state={stateModal} changestate={changeStateModal}>
                <Content>
                <>
            {success ? (
                <section>
                    <h1>¡Estás conectado!</h1>
                    <br />
                    <p>
                        <a href="/home">Volver al Inicio</a>
                    </p>
                </section>
            ) : (
                <section className='login-box'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Usuario:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                    ¿Necesitas una cuenta?<br />
                        <span className="line">
                        </span>
                    </p>
                </section>
            )}
        </>
                </Content>
            </ModalLogin>
        </div>
        
    )
}

export default Login;

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

const Buton_Register = styled.button`
    color: black;
`