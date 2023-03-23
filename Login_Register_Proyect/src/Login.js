import { useRef, useState, useEffect, useContext}  from "react"
import AuthContext from "./Context/AuthProvider";

import axios from "./Api/axios";
const LOGIN_URL = '/auth';

const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();


    const [user,setUser] = useState('');
    const [pwd,setPwd] = useState('');
    const [errMsg,setErrMsg] = useState('');
    const [success,setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg('');
    },[user,pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(LOGIN_URL,JSON.stringify({user,pwd}),
            {
                headers:{'Content-Type': 'application/json'},
                withCredentials: true
            }
            );
            console.log(JSON.stringify(response?.data));
            // console.log(JSON.stringify(response));
            const accessToken = response?.data.accessToken;
            const roles = response?.data?.roles;
            setAuth({user,pwd,roles,accessToken})
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch(err){
            if(!err?.response){
                setErrMsg('El servidor No Responde')
            }else if(err.response?.status === 400){
                setErrMsg('Nombre de usuario o contraseña faltantes')
            }else if(err.response?.status === 401){
                setErrMsg('No autorizado')
            }else{
                setErrMsg('Inicio de seccion fallido')
            }
            errRef.current.focus();
        }
        
    }
  return (
    <>
    {success ?(
        <section>
            <h1>seccion iniciada!</h1>
            <br/>
            <p>
                <a href="#">Volver al inicio</a>
            </p>
        </section>
    ) : (
        <section>
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
                required/>

                <label htmlFor="username">Contraseña:</label>
                <input 
                type="password"
                id="password"
                autoComplete="off"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required/>
                <button>Sign In</button>
            </form>
            <p>
                Necesitas una cuenta?<br/>
                <span className="line">
                    <a href="#">Sign Up</a>
                </span>
            </p>
        </section>
    )}
    </>
  )
}

export default Login