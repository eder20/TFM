/**
 * @format
 */
import "./shims"
import React from "react";
import { Drizzle, generateStore } from "drizzle";

import Factoria from "./build/contracts/Factoria.json";
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const options = {
  contracts: [Factoria],
  web3: {
    	fallback: {
    		type: "ws",
    		url: "ws://127.0.0.1:7545"
    	}
    }
};
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

AppRegistry.registerComponent(appName, () => () => <App drizzle={drizzle} />);
