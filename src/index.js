import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

"use strict";

class CommentsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          comments: [],
          howManyLoaded: 0
        }

        this.getComments = this.getComments.bind(this);
    }

    render() {
        return(
            <div className="root">
                <ul className="comments_list">
                    {this.state.comments}
                </ul>
                <button className="get_more_btn" onClick={() => this.getComments()}>Load comments</button>
            </div>
        );
    }

    async getComments() {
        let response = await axios.get(this.props.url + `?loaded=${this.state.howManyLoaded}`);
        
        let loaded = this.state.comments;
        for(let comment of response.data)
        {
            loaded.push(<Comment 
                authorName={comment.authorName}
                publicatinDate={comment.publicationDate}
                commentContent={comment.commentContent} />);
        }

        this.setState({
            comments:loaded,
            howManyLoaded: loaded.length
        })
    }
}

class Comment extends React.Component {
    render() {
        return(
            <li className="comment">
                <p className="authors_name">{this.props.authorName}</p>
                <p className="publication_date">{this.props.publicatinDate}</p>
                <div className="commentContent" dangerouslySetInnerHTML={{__html: this.props.commentContent}}>
                </div>
            </li>
        );
    }
}

ReactDOM.render(<CommentsList url="http://127.0.0.1:5000/getc"/>, document.getElementById("index"));