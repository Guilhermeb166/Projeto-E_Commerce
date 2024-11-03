import { FaRegCreditCard } from 'react-icons/fa';
import styles from './Payment.module.css'
import { useState } from 'react';
import { FaPix } from 'react-icons/fa6';
export default function Payment(){

    const [estadoSelecionado, setEstadoSelecionado] = useState('');
    const [cidades, setCidades] = useState([]);
    const [metodoPagamento, setMetodoPagamento] = useState(null);

    const handleMetodoPagamento = (method) => {
        setMetodoPagamento((currentMethod) => (currentMethod === method ? null : method));
        //Se o método atual (prevMetodo) já é o método clicado, ele é definido como null, ou seja, desativado.
        //Caso contrário, metodo se torna o método ativo, seja 'cartao' ou 'pix'.
    };

    const handleEstadoChange = (e) => {
        const estado = e.target.value;
        setEstadoSelecionado(estado);

        switch (estado) {
            case 'CE':
                setCidades(['Fortaleza', 'Sobral', 'Juazeiro do Norte']);
                break;
            case 'SP':
                setCidades(['São Paulo', 'Campinas', 'Santos']);
                break;
            case 'RJ':
                setCidades(['Rio de Janeiro', 'Niterói', 'Petrópolis']);
                break;
            default:
                setCidades([]);
        }
    };


    return (
        <section className={styles.paymentContainer}>
            <h1>Forma de Pagamento</h1>
            <form className={styles.form}>
                
                    
                        
                        <input type="text" placeholder='Nome Completo' className={styles.inputForm}/>
                        <input type="text" placeholder='Seu E-Mail' className={styles.inputForm}/>            
                        <input type="text" placeholder='CPF'  className={styles.inputForm}/> 
                        <input type="text" placeholder='celular com DDD'  className={styles.inputForm}/>
                        <input type="text" placeholder='Endereço (rua e número)'  className={styles.inputForm}/>
                        <input type="text" placeholder='Bairro'  className={styles.inputForm}/>
                        <select name="estados" id="estados" onChange={handleEstadoChange} className={styles.selectForm}defaultValue=''>
                            <option value="" disabled>Estados</option>
                            <option value="CE">Ceará</option>
                            <option value="SP">São Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                        </select>

                        {/* Select para escolher a cidade, que muda com base no estado selecionado */}
                        {estadoSelecionado && (
                            <select name="cidades" id="cidades" className={styles.selectForm}>
                                <option value="" disabled selected>Cidades</option>
                                {cidades.map((cidade, index) => (
                                    <option key={index} value={cidade}>{cidade}</option>
                                ))}
                            </select>
                        )}

                        {/* Opções de pagamento */}
                        <div className={styles.paymentOptions}>
                            <div  className={`${styles.paymentOptionsItem} ${metodoPagamento === 'cartao' ? styles.active : ''}`}
                        onClick={() => handleMetodoPagamento('cartao')}>
                                <FaRegCreditCard /> <span>Cartão</span>
                            </div>
                            <div className={`${styles.paymentOptionsItem} ${metodoPagamento === 'pix' ? styles.active : ''}`}
                            onClick={() => handleMetodoPagamento('pix')}>
                                <FaPix /> <span>Pix</span>
                            </div>
                        </div>

                        <div className={styles.paymentOptionsWrapper}>
                            { metodoPagamento === 'cartao'?(

                            <div className={styles.PaymentCardInfo}> 
                                <input type="number" 
                                placeholder="Número do cartão" 
                                className={styles.inputFormCardInfo} 
                                maxLength={16}
                                onInput={(e)=>{
                                    let value = e.target.value
                                    e.target.value = value.slice(0, 16); // Limita a 5 caracteres (MM/AA)
                                }}
                                /> 
                                <div> 
                                    <input type="text" 
                                        placeholder="Validade (Mês/Ano)" 
                                        className={styles.inputFormCardInfo} 
                                        maxLength="5" 
                                        onInput={(e) => {
                                            let value = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
                                            if (value.length > 2) {
                                                value = value.slice(0, 2) + '/' + value.slice(2); // Adiciona a barra após os primeiros 2 dígitos
                                            }
                                            e.target.value = value.slice(0, 5); // Limita a 5 caracteres (MM/AA)
                                        }}
                                    />
                                    <input type="number"
                                    placeholder="CVV" 
                                    className={styles.inputFormCardInfo}
                                    maxLength={3}
                                    onInput={(e)=>{
                                        let value = e.target.value
                                        e.target.value = value.slice(0, 3); // Limita a 5 caracteres (MM/AA)
                                    }}
                                     />
                                </div>
                                <select name='Bandeiras' id='Bandeiras' className={styles.selectForm} defaultValue="">
                                    <option value="" disabled >Qual  a bandeira do seu cartão?</option>
                                    <option value="MC">MasterCard</option>
                                    <option value="VS">Visa</option>
                                    <option value="HC">HiperCard</option>
                                    <option value="EL">Elo</option>
                                    <option value="AE">American Express</option>
                                </select>
                        </div>
                            ): metodoPagamento === 'pix' ? (
                                <h1>é pix</h1>
                            ) : (
                                <p> </p> 
                            )}
                    </div>
                        
            </form>


        </section>
    )
}