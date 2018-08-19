import * as firebase from "firebase";
import GeoPoint = firebase.firestore.GeoPoint;
import Timestamp = firebase.firestore.Timestamp;

export interface Post {
    location: GeoPoint;
    user: String;
    contentText: String;
    documentID: String;
    timestamp: Timestamp;
    visibleUsername: String;
}