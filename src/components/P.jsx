import React from 'react';
import Routes from "../Routes";

import Primero from './Primero';
import PrimeroPropietarios from './PrimeroPropietarios';
import drizzle from "../drizzle";
class P extends React.Component {

    state = { loading: true, drizzleState: null };

    componentDidMount() {

        const { drizzle } = this.props;
        // subscribirse a los cambios en el store:
        this.unsubscribe = drizzle.store.subscribe(() => {

           // Cada vez que cambie el estado del store, si Drizzle ya se ha
           // inicializado, entonces actualizo el estado del componente.
           const drizzleState = drizzle.store.getState();
           if (drizzleState.drizzleStatus.initialized) {
               this.setState({ loading: false, drizzleState });
           }
        });

    }

    compomentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (this.state.loading) return "Cargando Drizzle...";
        return (
            <div className="P">
                <PrimeroPropietarios drizzle={this.props.drizzle}
                         drizzleState={this.state.drizzleState} />
            </div>
        );
    }
}

export default P;
