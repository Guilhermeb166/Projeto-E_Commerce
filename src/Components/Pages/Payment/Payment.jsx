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
                        <select name="estados" id="estados" onChange={handleEstadoChange} className={styles.inputForm}>
                            <option value="" disabled selected>Estados</option>
                            <option value="CE">Ceará</option>
                            <option value="SP">São Paulo</option>
                            <option value="RJ">Rio de Janeiro</option>
                        </select>

                        {/* Select para escolher a cidade, que muda com base no estado selecionado */}
                        {estadoSelecionado && (
                            <select name="cidades" id="cidades" className={styles.inputForm}>
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

                        <div>
                            { metodoPagamento === 'cartao'?(
                                <h1>é cartão</h1>
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