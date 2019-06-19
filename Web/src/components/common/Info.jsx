import React from 'react';

import PropTypes from 'prop-types';

const Info = ({className, msg, visible}) => visible && (
    <span className={ `${className} info-common` }>
        { msg }
    </span>
);

// Valores por defecto en caso de que no se pase alguna propiedad.
Info.defaultProps = {
    className: '',
    msg: ''
};

// Validar tipo de las propiedades.
// Indicar que propiedades son obligatorias.
// ...
Info.propTypes = {
    className: PropTypes.string,
    visible: PropTypes.bool,
    msg: PropTypes.string
};

export default Info;
