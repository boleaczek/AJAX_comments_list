import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ReactSVG from "react-svg"

class CommentsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          comments: [],
          howManyLoaded: 0,
          noMoreLeft: false,
          waitingForResponse: false
        }

        this.getComments = this.getComments.bind(this);
    }

    render() {
        let button;
        if(this.state.waitingForResponse) {
            button = <ReactSVG className="loadingIcon" path="./assets/load_icon.svg" />;
        }
        else if(this.state.noMoreLeft) {
            button = null;
        }
        else {
            button = <button className="get_more_btn" onClick={() => this.getComments()}>Load comments</button>;
        }
        
        return(
            <div className="root">
                <ul className="comments_list">
                    {this.state.comments}
                </ul>
                {button}
            </div>
        );
    }

    async getComments() {
        this.setState({
            waitingForResponse:true
        })
        let response = await axios.get(this.props.url + `?loaded=${this.state.howManyLoaded}`);
        
        console.log(response.data);

        let loaded = this.state.comments;
        for(let comment of response.data.comments)
        {
            console.log(comment);
            loaded.push(<Comment 
                authorName={comment.author}
                publicatinDate={comment.publicationDate}
                commentContent={comment.content} 
                key={loaded.length + 1}/>);
        }

        this.setState({
            comments:loaded,
            howManyLoaded: loaded.length,
            noMoreLeft: response.data.isLast,
            waitingForResponse: false
        })
    }
}

class Comment extends React.Component {
    render() {
        return(
            <li className="comment" key={this.props.key}>
                <p className="authors_name">{this.props.authorName}</p>
                <p className="publication_date">{this.props.publicatinDate}</p>
                <div className="commentContent" dangerouslySetInnerHTML={{__html: this.props.commentContent}}>
                </div>
            </li>
        );
    }
}


let comments_app = document.getElementById("comments_app")

ReactDOM.render(<CommentsList 
    url={comments_app.dataset.url} />, comments_app);