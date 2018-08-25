import * as React from "react";
import * as Radium from "radium";
import * as moment from "moment";
import {db} from "./pages/LandingPageComponent";
import {Challenge} from "../models/Challenge";

@Radium
export class ChallengeTableCell extends React.Component<IChallengeTableCellProps, IChallengeTableCellState> {

    private _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            checkIns: 0,
            challengeSubmissions: 0
        };

        db.collection("challenges").doc(this.props.challenge.documentID).collection("checkIns")
            .onSnapshot((querySnapshot) => {
                this.setState({ checkIns: querySnapshot.size });
            });

        db.collection("challenges").doc(this.props.challenge.documentID).collection("challengeSubmissions")
            .onSnapshot((querySnapshot) => {
                this.setState({ challengeSubmissions: querySnapshot.size });
            });
    }

    public componentDidMount() {
        this._isMounted = true;
    }

    public componentWillUnmount() {
        this._isMounted = false;
    }

    private onHoverStart = () => {
        if (this._isMounted) {
            this.props.onHover(this.props.index);
        }
    }

    private onHoverEnd = () => {
        if (this._isMounted) {
            this.props.onUnhover(this.props.index);
        }
    }

    private onDeleteClick = () => {
        if (window.confirm("Are you sure you want to delete this challenge?")) {
            this.props.onDeleteChallenge(this.props.challenge.documentID as string);
        }
    }

    public render() {

        return (
            <div
                onMouseEnter={this.onHoverStart}
                onMouseLeave={this.onHoverEnd}
                style={[ChallengeTableCell.styles.container, { backgroundColor: this.props.isSelected ? "#cccccc" : "#ffffff" }]}
            >
                <div style={[ChallengeTableCell.styles.topBar]}>
                    <div>
                        {"name: " + this.props.challenge.challengeName}
                    </div>
                    <div>
                        {"document ID: " + this.props.challenge.documentID}
                    </div>
                </div>
                <div style={[ChallengeTableCell.styles.contentAndButtonsContainer]}>
                    <div style={[ChallengeTableCell.styles.contentAndMetadataContainer]}>
                        <div style={[ChallengeTableCell.styles.contentContainer]}>
                            {this.props.challenge.challengeText}
                        </div>
                        <div>
                            {"checkIns: " + this.state.checkIns.toString()}
                        </div>
                        <div>
                            {"submissions: " + this.state.challengeSubmissions.toString()}
                        </div>
                    </div>
                    <div style={[ChallengeTableCell.styles.buttonsContainer]}>
                        <button
                            onClick={this.onDeleteClick}
                        >
                            {"delete"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    private static styles = {
        container: {
            display: "flex",
            padding: "10px",
            flexDirection: "column",
            borderWidth: 2,
            borderBottomStyle: "solid",
            borderColor: "#22bbff",
            width: "100%",
            backgroundColor: "#ffffff"
        },
        topBar: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomStyle: "solid",
            borderColor: "#999999",
            borderWidth: 1,
            marginBottom: "10px"
        },
        contentAndButtonsContainer: {
            display: "flex",
            flexDirection: "row",
        },
        buttonsContainer: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            marginLeft: "10px"
        },
        contentAndMetadataContainer: {
            borderRightStyle: "solid",
            borderColor: "#999999",
            borderWidth: 1,
            paddingRight: "10px"
        },
        contentContainer: {
            marginBottom: "10px"
        }
    };
}

export interface IChallengeTableCellProps {
    challenge: Challenge;
    index: number;
    onDeleteChallenge: (challengeID: string) => void;
    onHover: (index: number) => void;
    onUnhover: (index: number) => void;
    isSelected: boolean;
}

export interface IChallengeTableCellState {
    checkIns: number;
    challengeSubmissions: number;
}

