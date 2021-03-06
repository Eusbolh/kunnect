import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Link } from 'nysa-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@blueprintjs/core';
import Comment from 'components/comment/Comment.component';
import CommentTextArea from 'components/comment/textarea/CommentTextArea.component';
import BasicDialog from 'components/dialogs/basic/BasicDialog.component';
import ReportPostForm from 'components/forms/post/reportPost/ReportPost.form';

class PostDialog extends Component {
  state = {
    isLinkCopied: false,
    isReplySectionOpen: false,
    reply: '',
  }

  /* Reply Helpers */

  onReplyChange = event => this.setState({ reply: event.target.value });

  /* Post Getters */

  getCommentCount = post => post.post && post.post.comment_count;

  getKulusterName = post => post.kuluster && post.kuluster.name;

  getKulusterImageSrc = post => post.kuluster && post.kuluster.image;

  getPostedAt = post => post.post && post.post.posted_at;

  getPostContent = post => post.post && post.post.content;

  getPostID = post => post.id;
  
  getPostImage = post => post.post && post.post.image;

  getPostTitle = post => post.post && post.post.title;

  getUserName = post => post.user && post.user.name;

  getVoteCount = post => post.post && post.post.vote_count;

  /* Vote Buttons */

  getVoteButtonClasses = (post, value) => {
    if (post.vote === value) {
      return 'knc-post-dialog-vote-button knc-post-dialog-vote-button-selected';
    }
    return 'knc-post-dialog-vote-button';
  }

  onClose = () => {
    this.props.onClose();
  }

  /* className Helpers */

  getPostTopClasses = (post) => {
    let classes = 'knc-post-dialog-top';
    switch (post.kuluster.color) {
      case 'blue':
        classes += ' knc-post-dialog-top--blue';
        break;
      case 'orange':
        classes += ' knc-post-dialog-top--orange';
        break;
      case 'red':
        classes += ' knc-post-dialog-top--red';
        break;
      default:
        break;
    }
    return classes;
  }

  /* Share Dialog */

  renderShareDialog = () => (
    <BasicDialog
      isOpen={!!this.state.isShareDialogOpen}
      onClose={() => this.setState({ isShareDialogOpen: false, isLinkCopied: false })}
      title="Share"
    >
      <div className="knc-kuluster-post-share-dialog">
        <div className="knc-kuluster-post-share-dialog-description">You can copy the following link and share this post!</div>
        <div className="knc-kuluster-post-share-dialog-share-link-container">
          <div className="knc-kuluster-post-share-dialog-share-link">
            <textarea
              ref={(textarea) => { this.textArea = textarea; return null; }}
              value={`http://kunnect.co/k/${this.getKulusterName(this.props.data)}/${this.getPostID(this.props.data)}`}
            />
          </div>
          <div className="knc-kuluster-post-share-dialog-copy-button-container">
            <Button
              classes="knc-kuluster-post-share-dialog-copy-button"
              minimal
              onClick={(e) => {
                this.textArea.select();
                document.execCommand('copy');
                e.target.focus();
                this.setState({ isLinkCopied: true });
              }}
            >
              <FontAwesomeIcon icon={['far', 'clone']} />
            </Button>
          </div>
        </div>
        <div className="knc-kuluster-post-share-dialog-copied-text">
          {
            this.state.isLinkCopied
              ? 'Link is copied!'
              : null
          }
        </div>
      </div>
    </BasicDialog>
  )

  /* Report Dialog */

  renderReportDialog = () => (
    <BasicDialog
      isOpen={!!this.state.isReportDialogOpen}
      onClose={() => this.setState({ isReportDialogOpen: false })}
      title="Report"
    >
      <ReportPostForm
        onConfirm={(values) => {
          alert(`Report details: ${values.content}`);
          this.setState({ isReportDialogOpen: false });
        }}
      />
    </BasicDialog>
  )

  render() {
    const { ...props } = this.props;
    return (
      <Dialog
        className="knc-post-dialog-component"
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <div className="knc-post-dialog-container">
          <div className={this.getPostTopClasses(props.data)}>
            <div className="knc-post-dialog-top-left">
              <div className="knc-post-dialog-info">
                <div className="knc-post-dialog-info-left">
                  <div className="knc-post-dialog-info-kuluster-image-container">
                    <Button classes="knc-post-dialog-info-kuluster-image-button">
                      <img alt="kuluster" className="knc-post-dialog-info-kuluster-image" src={this.getKulusterImageSrc(props.data)} />
                    </Button>
                  </div>
                </div>
                <div className="knc-post-dialog-info-right">
                  <div className="knc-post-dialog-info-kuluster-name">
                    <Link
                      classes="knc-post-dialog-info-kuluster-name-link"
                      href={`http://kunnect.co/k/${this.getKulusterName(props.data)}`}
                      intent="default"
                      onClick={event => this.onLinkClick(event, `/k/${this.getKulusterName(props.data)}`)}
                      text={`k/${this.getKulusterName(props.data)}`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="knc-post-dialog-top-right">
              <div className="knc-post-dialog-info-user-name-and-posted-at">
                <span>posted by</span>
                <span>&nbsp;</span>
                <Link
                  classes="knc-post-dialog-info-user-name-and-posted-at-link"
                  href={`http://kunnect.co/u/${this.getUserName(props.data)}`}
                  intent="default"
                  onClick={event => this.onLinkClick(event, `/u/${this.getUserName(props.data)}`)}
                  text={`u/${this.getUserName(props.data)}`}
                />
                <span>&nbsp;·&nbsp;</span>
                <Link classes="knc-post-dialog-info-user-name-and-posted-at-link" href="http://kunnect.co" text="bsd">{this.getPostedAt(props.data)}</Link>
              </div>
              <div className="knc-post-dialog-top-right-close-button-container">
                <Button
                  classes="knc-post-dialog-top-right-close-button"
                  onClick={props.onClose}
                >
                  <FontAwesomeIcon icon={['fas', 'times']} />
                </Button>
              </div>
            </div>
          </div>
          <div className="knc-post-dialog-middle">
            <div className="knc-post-dialog-title">{this.getPostTitle(props.data)}</div>
            <div className="knc-post-dialog-content">{this.getPostContent(props.data)}</div>
            <div className="knc-post-dialog-image-container">
              {
                this.getPostImage(props.data)
                  ? <img alt="post-dialog-content" className="knc-post-dialog-image" src={this.getPostImage(props.data)} />
                  : null
              }
            </div>
          </div>
          <div className="knc-post-dialog-bottom">
            <div className="knc-post-dialog-bottom-left">
              <div className="knc-post-dialog-vote-buttons">
                <Button
                  classes={this.getVoteButtonClasses(props.data, 1)}
                  onClick={event => this.onVoteClick(event, 1)}
                >
                  <FontAwesomeIcon icon={['fas', 'caret-square-up']} />
                </Button>
                <div className="knc-post-dialog-vote-count">{this.getVoteCount(props.data)}</div>
                <Button
                  classes={this.getVoteButtonClasses(props.data, -1)}
                  onClick={event => this.onVoteClick(event, -1)}
                >
                  <FontAwesomeIcon icon={['fas', 'caret-square-down']} />
                </Button>
              </div>
            </div>
            <div className="knc-post-dialog-bottom-right">
              <div className="knc-post-dialog-bottom-right-section">
                <Button
                  classes="knc-post-dialog-bottom-right-button"
                  minimal={true}
                >
                  <FontAwesomeIcon icon={['fas', 'comment-alt']} />
                  <div className="knc-post-dialog-bottom-right-section-text">{`${this.getCommentCount(props.data)} comments`}</div>
                </Button>
              </div>
              <div className="knc-post-dialog-bottom-right-section">
                <Button
                  classes="knc-post-dialog-bottom-right-button"
                  minimal={true}
                  onClick={() => this.setState({ isShareDialogOpen: true })}
                >
                  <FontAwesomeIcon icon={['fas', 'share']} />
                  <div className="knc-post-dialog-bottom-right-section-text">Share</div>
                </Button>
                {this.renderShareDialog()}
              </div>
              <div className="knc-post-dialog-bottom-right-section">
                <Button
                  classes="knc-post-dialog-bottom-right-button"
                  minimal={true}
                >
                  <FontAwesomeIcon icon={['fas', 'save']} />
                  <div className="knc-post-dialog-bottom-right-section-text">Save</div>
                </Button>
              </div>
              <div className="knc-post-dialog-bottom-right-section">
                <Button
                  classes="knc-post-dialog-bottom-right-button"
                  minimal={true}
                >
                  <FontAwesomeIcon icon={['fas', 'ban']} />
                  <div className="knc-post-dialog-bottom-right-section-text">Hide</div>
                </Button>
                {this.renderReportDialog()}
              </div>
              <div className="knc-post-dialog-bottom-right-section">
                <Button
                  classes="knc-post-dialog-bottom-right-button"
                  minimal={true}
                  onClick={() => this.setState({ isReportDialogOpen: true })}
                >
                  <FontAwesomeIcon icon={['fas', 'flag']} />
                  <div className="knc-post-dialog-bottom-right-section-text">Report</div>
                </Button>
              </div>
            </div>
          </div>
          <div className="knc-post-dialog-comments">
            <div className="knc-post-dialog-comments-post-reply">
              {
                this.state.isReplySectionOpen
                  ? (
                    <CommentTextArea
                      handleChange={this.onReplyChange}
                      name="title"
                      multiline
                      onCancel={() => this.setState({ isReplySectionOpen: false })}
                      onConfirm={() => { console.log(this.state.reply); this.setState({ isReplySectionOpen: false, reply: '' }); }}
                      placeholder="What are your thoughts?"
                      value={this.state.reply}
                    />
                  ) : (
                    <Button
                      classes="knc-post-dialog-comments-post-reply-empty"
                      onClick={() => this.setState({ isReplySectionOpen: true })}
                    >
                      What are your thoughts?
                    </Button>
                  )
              }
            </div>
            <div className="knc-post-dialog-comments-content">
              {props.data && props.data.comments.map(comment => <Comment data={comment} key={`knc-post-dialog-comment-${comment && comment.id}`} />)}
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

PostDialog.propTypes = {
  /* Functions */
  data: PropTypes.shape({}),
  onClose: PropTypes.func.isRequired,
  /* Objects */
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

PostDialog.defaultProps = {
  data: null,
  title: 'null',
};

export default PostDialog;
