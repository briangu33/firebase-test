import * as firebase from "firebase";
import GeoPoint = firebase.firestore.GeoPoint;
import Timestamp = firebase.firestore.Timestamp;

export interface Challenge {
    location: GeoPoint;
    challengeName: String;
    challengeText: String;
    documentID: String;
    maxDistance: number;
    pictureChallengeEnabled: boolean;
}