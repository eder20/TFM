/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Primero from './Primero'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
state = { loading: true, drizzleState: null };

  componentDidMount() {
    const { drizzle } = this.props;

    this.unsubscribe = drizzle.store.subscribe(() => {
      const drizzleState = drizzle.store.getState();

      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
    <View style={styles.container}>
      {this.state.loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
        <Text style={styles.titleText}>Venta de Invitaciones Madrid Central</Text>

          <Primero
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />
        </View>
      )}
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95D3BF',
  },
  container2: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: '#95D3BF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  titleText: {
    marginHorizontal: 8,
    marginVertical: 50,
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: "center",
  },
  baseText: {
   fontFamily: 'Arial',
 },
 otherContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
    backgroundColor: 'green',
    },
 topBox: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
