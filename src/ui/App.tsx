import * as React from "react";
import * as ReactDom from "react-dom";
import {LandingPageComponent} from "../components/pages/LandingPageComponent";
import {StyleRoot} from "radium";

ReactDom.render(
    <StyleRoot>
        <LandingPageComponent/>
    </StyleRoot>,
    document.getElementById("app-container")
);


