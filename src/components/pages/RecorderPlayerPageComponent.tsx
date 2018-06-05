import * as React from "react";
import * as Radium from "radium";

@Radium
export class RecorderPlayerPageComponent extends React.Component<IRecorderPlayerPageComponentProps, IRecorderPlayerPageComponentState> {
    public props: IRecorderPlayerPageComponentProps;
    public state: IRecorderPlayerPageComponentState;

    constructor(props: IRecorderPlayerPageComponentProps) {
        super();
    }

    public render() {
        return (
            <div>

            </div>
        );
    }

    private static styles = {
        base: {
            width: "100vw",
        },
    };
}

export interface IRecorderPlayerPageComponentProps {
}

export interface IRecorderPlayerPageComponentState {
}