import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class CommentsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          comments: []
        }
    }

    render() {
        return(
            <div className="root">
                <ul className="comments_list">
                    {this.state.comments}
                </ul>
                <button className="get_more_btn" onClick={this.getComments()}>Load comments</button>
            </div>
        );
    }

    async getComments() {
        let response = await axios.get(this.props.url);
        let comments = JSON.parse(response.data);

        let loaded = this.state.comments;
        for(comment of comments)
        {
            loaded.push(<Comment 
                authorName={comment.authorName}
                publicatinDate={comment.publicatinDate}
                commentContent={comment.content} />);
        }

        this.setState({
            comments:loaded
        })
    }
}

class Comment extends React.Component {
    render() {
        return(
            <li className="comment">
                <p className="authors_name">{this.props.authorName}</p>
                <p className="publication_date">{this.props.publicatinDate}</p>
                <div className="commentContent" dangerouslySetInnerHTML={this.props.commentContent}>
                </div>
            </li>
        );
    }
}

ReactDOM.render(<CommentsList url="urlwillgohere" howManyPerClick={5}/>, document.getElementById("index"));