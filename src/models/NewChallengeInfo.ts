import * as firebase from "firebase";
import GeoPoint = firebase.firestore.GeoPoint;

export interface NewChallengeInfo {
    location: GeoPoint;
    challengeName: String;
    challengeText: String;
    maxDistance: number;
    pictureChallengeEnabled: boolean;
}