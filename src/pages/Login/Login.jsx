import React, {useState} from "react";
import { useAuthContext } from "../../Context"
import { useLocation } from "react-router-dom";


export const Login = () =>{
    const [email, setEmail] = useState();
    const [ password, setPassword ] = useState();
    const { handleLogin } = useAuthContext()
    const { state } = useLocation()
    const handleSubmit = (e) =>{
        e.preventDefault()
        handleLogin(email, password, state? state.from : "/" )
    }
    return(
        <section className="col jst-ctr alg-ctr" >
            <h3 className="mag-t-32" >Login to Roots</h3>
            <div className="crd-cont pad-64 bor-rad-8 box-shd mag-t-32" >
                <form className="col" onSubmit={e =>handleSubmit(e)} >
                    <input type="text" placeholder="Email" name='email' value={email} onChange={ (e)=>setEmail(e.target.value) } ></input>
                    <input type="password" placeholder="Password" className="mag-t-32 " name='password' value={password} onChange={ (e)=>setPassword(e.target.value) } ></input>
                    <div class="hlp-txt">Help text</div>    
                    <button className="btn-pry-fil mag-t-32 w12" >Login</button>
                </form>
            </div>
        </section>
    )
}