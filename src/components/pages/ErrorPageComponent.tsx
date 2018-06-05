import * as React from "react";
import * as Radium from "radium";

@Radium
export class ErrorPageComponent extends React.Component<IErrorPageComponentProps, IErrorPageComponentState> {
    public props: IErrorPageComponentProps;
    public state: IErrorPageComponentState;

    constructor(props: IErrorPageComponentProps) {
        super();
    }

    public render() {
        return (
            <div style={[
                ErrorPageComponent.styles.base
            ]}>
            </div>
        );
    }

    private static styles = {
        base: {
            width: "100%"
        }
    }
}

export interface IErrorPageComponentProps {
}

export interface IErrorPageComponentState {

}