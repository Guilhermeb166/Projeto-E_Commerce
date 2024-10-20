
import { FcGoogle } from 'react-icons/fc'
import styles from './Login.module.css'
import { useRef,useState } from 'react'
import { FaFacebook } from 'react-icons/fa'
import { BiHide, BiShow } from 'react-icons/bi'
export default function Login() {
    const [showPassword,setShowPassword] = useState(false)
    const loginForm = useRef(null)
    const registerForm = useRef(null)
    const handleForm = () => {
        if (loginForm.current && registerForm.current) {
            loginForm.current.style.display = loginForm.current.style.display === 'none' ? 'flex' : 'none';
            registerForm.current.style.display = registerForm.current.style.display === 'none' ? 'flex' : 'none';
        }
    }

    function ShowPassword(){
        setShowPassword(!showPassword)
    }

    return (
        <main className={styles.loginContainer}>
            <div className={styles.loginLeft}>
                <img src="./gif/Login.gif" alt="" className={styles.loginAnimation} />
            </div>
            <div className={styles.loginRight}>
                <div className={styles.formContainer}>
                    <form action="" className={`${styles.registerForm} `} ref={registerForm}>
                        <h1 className={styles.formTitle}>Crie sua Conta!</h1>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="email" className={styles.label}>E-mail:</label>
                            <input type="text" name='email' id="email" className={`${styles.input}`} placeholder='Digite seu email...' autoComplete='off'/>
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="" className={styles.label}>Senha:</label>
                            <div className={styles.passwordWrapper}>
                                <input type={showPassword?'text' :'password'} className={`${styles.inputPassword}`} placeholder='Digite sua senha...' autoComplete='current-password'/>
                                {showPassword ? <BiShow onClick={ShowPassword} className={styles.passwordBtn}/> : <BiHide onClick={ShowPassword} className={styles.passwordBtn}/>}
                            </div>
                        </div>
                        <button className={styles.formBtn}>Cadastrar</button>
                        <p className={styles.forgottenPassword}>Esqueci minha senha</p>
                        <p onClick={handleForm} className={styles.handleForm}>Já tem uma conta? Clique aqui!</p>
                        <div className={styles.plataforms}>
                            <FcGoogle className={styles.googleIcon}/>
                            <FaFacebook className={styles.faceIcon}/>
                        </div>
                    </form>
                    <form action="" className={`${styles.loginForm}`} ref={loginForm} style={{ display: 'none' }}>
                        <h1 className={styles.formTitle}>Entre na sua conta!</h1>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="emailLogin" className={styles.label}>E-mail:</label>
                            <input type="text" name='email' id="emailLogin" className={`${styles.input}`} placeholder='Digite seu email...' autoComplete='off'/>
                        </div>
                        <div className={styles.inputWrapper}>
                            <label htmlFor="" className={styles.label}>Senha:</label>
                            <div className={styles.passwordWrapper}>
                                <input type={showPassword?'text':'password'} className={`${styles.inputPassword}`} placeholder='Digite sua senha...' autoComplete='current-password'/>
                                {showPassword ? <BiShow onClick={ShowPassword} className={styles.passwordBtn}/> : <BiHide onClick={ShowPassword} className={styles.passwordBtn}/>}
                            </div>
                        </div>
                        <button className={styles.formBtn}>Logar</button>
                        <p className={styles.forgottenPassword}>Esqueci minha senha</p>
                        <p onClick={handleForm} className={styles.handleForm}>Não tem uma conta? Clique aqui!</p>
                        <div className={styles.plataforms}>
                            <FcGoogle className={styles.googleIcon}/>
                            <FaFacebook className={styles.faceIcon}/>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}