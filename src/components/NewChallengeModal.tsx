import * as React from "react";
import * as Radium from "radium";
import * as firebase from "firebase";
import GeoPoint = firebase.firestore.GeoPoint;
import {NewChallengeInfo} from "../models/NewChallengeInfo";

@Radium
export class NewChallengeModal extends React.Component<NewChallengeModalProps, NewChallengeModalState> {

    constructor(props) {
        super(props);

        this.state = {
            challengeName: "",
            challengeText: "",
            maxDistance: 100,
            pictureChallengeEnabled: false,
        };
    }

    private onDone = () => {
        let submission: NewChallengeInfo = {
            location: this.props.location,
            challengeName: this.state.challengeName,
            challengeText: this.state.challengeText,
            maxDistance: this.state.maxDistance,
            pictureChallengeEnabled: this.state.pictureChallengeEnabled
        };
        this.props.onSubmit(submission);
    }

    private onCancel = () => {
        this.props.onCancel();
    }

    private onChallengeNameChange = (event) => {
        this.setState({
            challengeName: event.target.value
        });
    }

    private onChallengeTextChange = (event) => {
        this.setState({
            challengeText: event.target.value
        });
    }

    private onMaxDistanceChange = (event) => {
        this.setState({
            maxDistance: parseInt(event.target.value, 10)
        });
    }

    private onPictureChallengeEnabledChange = (event) => {
        this.setState({
            pictureChallengeEnabled: event.target.checked
        });
    }

    render() {
        return (
            <div style={[
                NewChallengeModal.styles.base,
            ]}>
                <div style={{display: "inline"}}>
                    {"Challenge name: "}
                    <label>
                        <input type="text"
                               value={this.state.challengeName}
                               onChange={this.onChallengeNameChange}/>
                    </label>
                </div>

                <br/>

                <div style={{display: "inline"}}>
                    {"Challenge text: "}
                    <label>
                        <input ref="content"
                               type="text"
                               value={this.state.challengeText}
                               onChange={this.onChallengeTextChange}/>
                    </label>
                </div>

                <br/>

                <div style={{display: "inline"}}>
                    {"Max distance: "}
                    <label>
                        <input ref="content"
                               type="text"
                               value={this.state.maxDistance.toString()}
                               onChange={this.onMaxDistanceChange}/>
                    </label>
                </div>

                <br/>

                <div style={{display: "inline"}}>
                    {"Picture challenge enabled?"}
                    <label>
                        <input type="checkbox"
                               onChange={this.onPictureChallengeEnabledChange}/>
                    </label>
                </div>

                <br/>

                <div style={{display: "inline"}}>
                    <button
                        onClick={this.onDone}>
                        {"submit"}
                    </button>

                    <button
                        onClick={this.onCancel}
                    >
                        {"cancel"}
                    </button>
                </div>
            </div>
        );
    }

    private static styles = {
        base: {
            width: "100%"
        },
        button: {
            marginLeft: "5px",
            marginRight: "5px"
        },
        header: {
            fontWeight: "bold",
            fontSize: "1em",
            marginBottom: "15px"
        }
    };
}

export interface NewChallengeModalProps {
    onSubmit: (submission: NewChallengeInfo) => void;
    onCancel: () => void;
    location: GeoPoint;
}

export interface NewChallengeModalState {
    challengeName: string;
    challengeText: string;
    maxDistance: number;
    pictureChallengeEnabled: boolean;
}