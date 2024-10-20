import { useState } from 'react'
import styles from './Contact.module.css'
export default function Contact(){
    const [charAmount,setCharAmount] = useState('')

    const handleChange = (e) => {
        setCharAmount(e.target.value); // Atualiza o estado com o valor digitado
    };

    return(
        <section className={styles.ContactContainer}>
            <div className={styles.contactGifWrapper}>
                <img src="/gif/Contact.gif" alt="" className={styles.contactGif}/>
            </div>
            <div className={styles.contactFormWrapper}>
                <form className={styles.form}>
                    <h2>Fale Conosco!</h2>
                    <div className={styles.userEmailControl}>
                        <label htmlFor="">Seu E-Mail:</label>
                        <input type="text" className={styles.inputEmail} placeholder='Digite seu Email...' autoComplete='off'/>
                    </div>
                    <div className={styles.message}>
                        <label htmlFor="">Escreva sua Mensagem:</label>
                        <textarea
                        placeholder='Digite sua mensagem...' autoComplete='off'
                        className={styles.messageInput}
                        maxlength="250"
                        onChange={handleChange}/>
                        <div className={styles.charCount}>{charAmount.length}/250</div>
                    </div>
                    <button className={styles.formBtn}>Enviar</button>
                </form>
            </div>
        </section>
    )
}