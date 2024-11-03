import { FaRegCreditCard } from 'react-icons/fa';
import styles from './Payment.module.css'
import { useState } from 'react';
import { FaPix } from 'react-icons/fa6';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
export default function Payment(){

    const [estadoSelecionado, setEstadoSelecionado] = useState('');
    const [cidades, setCidades] = useState([]);
    const [metodoPagamento, setMetodoPagamento] = useState(null);
    const [cidadeSelecionada, setCidadeSelecionada] = useState('');
    const [bandeiraSelecionada,setBandeiraSelecionada] = useState('')

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
            <h1>Forma de Pagamento</h1>
            <form className={styles.form}> 
                <input type="text" placeholder='Nome Completo' className={styles.inputForm}/>
                <input type="text" placeholder='Seu E-Mail' className={styles.inputForm}/>            
                <input type="text" placeholder='CPF'  className={styles.inputForm}/> 
                <input type="text" placeholder='celular com DDD'  className={styles.inputForm}/>
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