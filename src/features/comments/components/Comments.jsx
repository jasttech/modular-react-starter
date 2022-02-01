import PropTypes from 'prop-types';

import { CommentsList } from './CommentsList';
import { CreateComment } from './CreateComment';

export const Comments = ({ discussionId }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-1xl font-bold">Comments:</h3>
        <CreateComment discussionId={discussionId} />
      </div>
      <CommentsList discussionId={discussionId} />
    </div>
  );
};

Comments.propTypes = {
  discussionId: PropTypes.string.isRequired,
};
