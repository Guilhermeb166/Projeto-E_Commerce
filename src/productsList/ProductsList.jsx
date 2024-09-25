import phones from './Phones';
import notebooks from './Notebooks';
import derivados from './Derivados';

function ProductListPage () {
  return (
    <div>
      <h1>Lista de Celulares</h1>
      <div>
        {phones.map(phone => (
          <div key={phone.id}>
            <h2>{phone.name}</h2>
            <img src={phone.image} alt={phone.name} />
            <p>{phone.description}</p>
            <p>Preço: R$ {phone.price.toFixed(2)}</p>
            <p>Categoria: {phone.category}</p>
          </div>
        ))}
      </div>

      <h1>Lista de Notebooks</h1>
      <div>
        {notebooks.map(notebook => (
          <div key={notebook.id}>
            <h2>{notebook.name}</h2>
            <img src={notebook.image} alt={notebook.name} />
            <p>{notebook.description}</p>
            <p>Preço: R$ {notebook.price.toFixed(2)}</p>
            <p>Categoria: {notebook.category}</p>
          </div>
        ))}
      </div>

      <h1>Lista de Derivados</h1>
      <div>
        {derivados.map(derivado => (
          <div key={derivado.id}>
            <h2>{derivado.name}</h2>
            <img src={derivado.image} alt={derivado.name} />
            <p>{derivado.description}</p>
            <p>Preço: R$ {derivado.price.toFixed(2)}</p>
            <p>Categoria: {derivado.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
