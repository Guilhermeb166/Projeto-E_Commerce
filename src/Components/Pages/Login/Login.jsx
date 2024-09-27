
import styles from './Login.module.css'
import { useRef } from 'react'
export default function Login() {
    const loginForm = useRef(null)
    const registerForm = useRef(null)
    const handleForm = () => {
        if (loginForm.current && registerForm.current) {
            loginForm.current.style.display = loginForm.current.style.display === 'none' ? 'flex' : 'none';
            registerForm.current.style.display = registerForm.current.style.display === 'none' ? 'flex' : 'none';
        }
    }
    return (
        <main className={styles.loginContainer}>
            <div className={styles.loginLeft}>
                <img src="./gif/Login.gif" alt="" className={styles.loginAnimation} />
            </div>
            <div className={styles.loginRight}>
                <h1>Crie sua Conta!</h1>
                <form action="" className={`${styles.registerForm} `} ref={registerForm}>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input type="text" name='email' id="email" className={`${styles.input}`} />
                    </div>
                    <div>
                        <label htmlFor="">Senha:</label>
                        <input type="text" className={`${styles.input}`} />
                    </div>
                    <button>Cadastrar</button>
                    <p onClick={handleForm}>Já tem uma conta?Clique aqui</p>
                </form>
                <form action="" className={`${styles.loginForm}`} ref={loginForm} style={{ display: 'none' }}>
                    <p>login</p>
                    <p onClick={handleForm}>Não tem uma conta?Clique aqui</p>
                </form>
            </div>
        </main>
    )
}