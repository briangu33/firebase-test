import * as React from "react";
import * as Radium from "radium";
import {Post} from "../models/Post";
import {getOffset} from "tzjs";
import {ChangeEvent} from "react";
import {PostTableCell} from "./PostTableCell";
import {db} from "./pages/LandingPageComponent";
import {Challenge} from "../models/Challenge";
import {ChallengeTableCell} from "./ChallengeTableCell";

@Radium
export class ChallengesFeedComponent extends React.Component<IChallengeFeedComponentProps, IChallengeFeedComponentState> {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    private onRefreshPress() {
        this.props.onRefreshPress();
    }

    private onDeleteChallenge = (challengeID: string) => {
        // delete checkins, submissions, submission upvotes (firebase offers no way to do this at all levels)

        console.log("delet this: ", challengeID);
        db.collection("challenges").doc(challengeID).collection("checkIns").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let id = doc.data().documentID;
                    db.collection("posts").doc(challengeID).collection("checkIns").doc(id).delete();
                });
            });
        db.collection("challenges").doc(challengeID).collection("challengeSubmissions").get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let id = doc.data().documentID;
                    db.collection("challenges").doc(challengeID).collection("challengeSubmissions").doc(id).collection("upvotes").get()
                        .then((querySnapshot2) => {
                            querySnapshot.forEach((doc2) => {
                                let id2 = doc2.data().documentID;
                                db.collection("challenges").doc(challengeID).collection("challengeSubmissions")
                                    .doc(id).collection("upvotes").doc(id2).delete();
                            });
                        });
                    db.collection("challenges").doc(challengeID).collection("challengeSubmissions").doc(id).delete();
                });
            });
        db.collection("challenges").doc(challengeID).delete().then(() => {
            console.log("successfully deleted challenge");
            this.onRefreshPress();
        });
    }

    public render() {
        let rows = this.props.challenges.map((challenge: Challenge, rowIndex: number) => {
            return (
                <ChallengeTableCell
                    challenge={challenge}
                    key={rowIndex}
                    index={rowIndex}
                    onDeleteChallenge={this.onDeleteChallenge}
                    onHover={this.props.onHoverOverChallenge}
                    onUnhover={this.props.onUnhoverOverChallenge}
                    isSelected={(this.props.selectedIndex !== null) && (this.props.selectedIndex === rowIndex)}
                />
            );
        });

        return (
            <div
                style={{
                    display: "block"
                }}
            >
                {rows}
                <div>
                    <input
                        type="text"
                    />
                    <input
                        type="button"
                        value="query by challenge name"
                    />
                </div>
            </div>
        );
    }
}

/**
 * eg. toLocalTimeEastern(new Date("2020-01-01T04:00:00Z")) returns "2020-01-01T00:00"
 */
function toLocalTimeEastern(date: Date): string {
    const offset = getOffset("America/New_York", date);
    const easternIso = new Date(date.getTime() - offset * 60 * 1000).toISOString();
    return easternIso.substring(0, 16);
}

function randomString(length = 20): string {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

export interface IChallengeFeedComponentProps {
    challenges: Challenge[];
    onRefreshPress: () => void;
    isChoosingChallengeLocation: boolean;
    isWritingChallenge: boolean;
    onHoverOverChallenge: (index: number) => void;
    onUnhoverOverChallenge: (index: number) => void;
    selectedIndex: number;
}

export interface IChallengeFeedComponentState {
}