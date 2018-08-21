import * as React from "react";
import * as Radium from "radium";
import * as firebase from "firebase";
import GeoPoint = firebase.firestore.GeoPoint;
import {PostSubmission} from "../models/PostSubmission";

@Radium
export class NewPostModal extends React.Component<NewPostModalProps, NewPostModalState> {

    constructor(props) {
        super(props);

        this.state = {
            visibleUsername: "",
            contentText: ""
        };
    }

    private onDone = () => {
        let submission: PostSubmission = {
            location: this.props.location,
            user: "wya-tester-" + this.state.visibleUsername,
            visibleUsername: (this.state.visibleUsername === "") ? "anonymous" : this.state.visibleUsername,
            contentText: this.state.contentText
        };
        this.props.onSubmit(submission);
    }

    private onCancel = () => {
        this.props.onCancel();
    }

    private onContentTextChange = (event) => {
        this.setState({
            contentText: event.target.value
        });
    }

    private onUserTextChange = (event) => {
        this.setState({
            visibleUsername: event.target.value
        });
    }

    render() {
        return (
            <div style={[
                NewPostModal.styles.base,
            ]}>
                <div style={{display: "inline"}}>
                    {"Enter content: "}
                    <label>
                        <input ref="content"
                               type="text"
                               value={this.state.contentText}
                               onChange={this.onContentTextChange}/>
                    </label>
                </div>

                <br/>

                <div style={{display: "inline"}}>
                    {"as user: "}
                    <label>
                        <input ref="content"
                               type="text"
                               value={this.state.visibleUsername}
                               onChange={this.onUserTextChange}/>
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

export interface NewPostModalProps {
    onSubmit: (submission: PostSubmission) => void;
    onCancel: () => void;
    location: GeoPoint;
}

export interface NewPostModalState {
    visibleUsername: string;
    contentText: string;
}