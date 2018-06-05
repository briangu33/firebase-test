import * as React from "react";
import * as Radium from "radium";
import {Post} from "../models/Post";

@Radium
export class FeedComponent extends React.Component<IFeedComponentProps, IFeedComponentState> {
    constructor(props) {
        super(props);

        this.state = {
            newContent: ""
        };
    }

    private onContentChange(event) {
        this.setState({
            newContent: event.target.value
        });
    }

    private onContentSubmit() {
        this.props.onPostSubmit(this.state.newContent);
    }

    private onRefreshPress() {
        this.props.onRefreshPress();
    }

    public render() {
        let rows = this.props.posts.map((post: Post, rowIndex: number) => {
            return (
                <div key={rowIndex} style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    height: 40,
                    borderWidth: 3,
                }}>
                    {rowIndex}
                    {post.content}
                </div>
            );
        });

        return (
            <div>
                {rows}
                <div>
                    <input ref="newPostContent"
                           type="text"
                           value={this.state.newContent}
                           onChange={this.onContentChange.bind(this)}/>

                    <input
                        type="button"
                        value="submit"
                        onClick={this.onContentSubmit.bind(this)}/>

                    <input
                        type="button"
                        value="refresh"
                        onClick={this.onRefreshPress.bind(this)}/>
                </div>
            </div>
        );
    }

}

export interface IFeedComponentProps {
    posts: Post[];
    onPostSubmit: (string) => void;
    onRefreshPress: () => void;
}

export interface IFeedComponentState {
    newContent: string;
}