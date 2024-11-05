import { FaRegCreditCard } from 'react-icons/fa';
import styles from './Payment.module.css'
import { useState,useContext } from 'react';
import { FaPix } from 'react-icons/fa6';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Context from '../../../Context/Context';
export default function Payment(){

    const [estadoSelecionado, setEstadoSelecionado] = useState('');
    const [cidades, setCidades] = useState([]);
    const [metodoPagamento, setMetodoPagamento] = useState(null);
    const [cidadeSelecionada, setCidadeSelecionada] = useState('');
    const [bandeiraSelecionada,setBandeiraSelecionada] = useState('')
    const { totalAmount, totalQuantity } = useContext(Context);

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

    const handleBandeiraChange = (e) =>{
        const bandeira = e.target.value
        setBandeiraSelecionada(bandeira)
    }


    return (
        <section className={styles.paymentContainer}>
            <div className={styles.paymentPriceInfo}>
            <p>Valor total a pagar: <span>R$ {totalAmount.toFixed(2)}</span></p>
            <p>Quantidade de produtos: <span>{totalQuantity}</span></p>
            </div>
            <form className={styles.form}> 
                <input type="text" placeholder='Nome Completo' className={styles.inputForm}/>
                <input type="text" placeholder='Seu E-Mail' className={styles.inputForm}/>            
                <input type="text" placeholder='CPF'  className={styles.inputForm}/> 
                <input type="text" placeholder='Celular com DDD'  className={styles.inputForm}
                onInput={(e)=>{
                    let value = e.target.value
                    value = e.target.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
                    if(value.length>2){
                        value = value.slice(0, 2) + ' ' + value.slice(2);
                    }
                    if(value.length>8){
                        value = value.slice(0, 8) + '-' + value.slice(8);
                    }
                    e.target.value = value.slice(0, 13); // Atualiza o valor no campo de entrada
                }}
                />
                <input type="text" placeholder='Endereço (rua e número)'  className={styles.inputForm}/>
                <input type="text" placeholder='Bairro'  className={styles.inputForm}/>

                 {/* Select de Estados com Material-UI */}
                 <FormControl sx={{ width: '80%' }} margin="0">
                    <InputLabel id="estado-label" sx={{ top: '-6px' }}>Estado</InputLabel>
                    <Select
                        labelId="estado-label"
                        value={estadoSelecionado}
                        onChange={handleEstadoChange}
                        label="Estado"
                        className={styles.selectForm}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="CE">Ceará</MenuItem>
                        <MenuItem value="SP">São Paulo</MenuItem>
                        <MenuItem value="RJ">Rio de Janeiro</MenuItem>
                    </Select>
                </FormControl>

                {/* Select de Cidades com Material-UI */}
                {estadoSelecionado && (
                    <FormControl  sx={{ width: '80%' }} margin="normal">
                        <InputLabel id="cidade-label" sx={{ top: '-6px' }}>Cidade</InputLabel>
                        <Select
                            labelId="cidade-label"
                            value={cidadeSelecionada}
                            onChange={(e) => setCidadeSelecionada(e.target.value)}
                            label="Cidade"
                            className={styles.selectForm}
                        >   
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {cidades.map((cidade, index) => (
                                <MenuItem key={index} value={cidade}>
                                    {cidade}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                                    const currentYear = new Date().getFullYear() % 100; // Obtem os dois últimos dígitos do ano atual

                                    // Verifica o mês
                                    let month = value.slice(0, 2);//obtém os dois primeiros caracteres do valor digitado, que representam o mês.
                                    if (month.length === 2) {
                                        const monthNum = parseInt(month, 10);//Converte month para um número inteiro
                                        if (monthNum < 1 || monthNum > 12) {
                                            month = '12'; // Se o mês for inválido, define para '12' como limite superior
                                        }
                                    }

                                    // Verifica o ano
                                    let year = value.slice(2, 4);//pegamos os caracteres do índice 2 ao 4, que representam o ano. 
                                    if (year.length === 2) {
                                        const yearNum = parseInt(year, 10);//Converte year para um número inteiro
                                        if (yearNum < currentYear || yearNum > currentYear+10) {//verifica se yearNum está dentro dos limites permitidos (entre 00 e o ano atual).
                                            year = currentYear.toString(); // Define o ano como o ano atual se ultrapassar o limite
                                        }
                                    }

                                    e.target.value = `${month}${year ? '/' + year : ''}`.slice(0, 5); // Formata como MM/AA e limita a 5 caracteres
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
                        {/* Select de Bandeiras com Material-UI */}
                        <FormControl variant="standard" sx={{ width: '80%' }} margin="normal">
                            <InputLabel id="cartao-label" >Qual  a bandeira do seu cartão?</InputLabel>
                            <Select
                                labelId="cartao-label"
                                value={bandeiraSelecionada}
                                onChange={handleBandeiraChange}
                                label="Bandeiras"
                                className={styles.selectForm}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="MC">MasterCard</MenuItem>
                                <MenuItem value="VS">Visa</MenuItem>
                                <MenuItem value="HC">HiperCard</MenuItem>
                                <MenuItem value="EL">Elo</MenuItem>
                                <MenuItem value="AE">American Express</MenuItem>
                            </Select>
                        </FormControl>
                        <button className={styles.paymentCartBtn}>Concluir Pagamento</button>
                        
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