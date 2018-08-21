import * as firebase from "firebase";
import GeoPoint = firebase.firestore.GeoPoint;

export interface PostSubmission {
    location: GeoPoint;
    user: String;
    contentText: String;
    visibleUsername: String;
}