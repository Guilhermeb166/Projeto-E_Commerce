import Context from "./Context";
import propTypes from 'prop-types'

export default function Provider({children}){
    return(<Context.Provider value={'#'}>
        {children}
     </Context.Provider>
)}
Provider.propTypes = {
    children:propTypes.any
}.isRequired