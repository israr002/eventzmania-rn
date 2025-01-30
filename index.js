/**
 * @format
 */
import "./gesture-handler";

import {AppRegistry} from "react-native";

import App from "./App";
import {name as appName} from "./app.json";
import initI18next from "./src/i18n/initI18next";

initI18next();
AppRegistry.registerComponent(appName, () => App);
