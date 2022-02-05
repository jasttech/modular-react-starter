import { Button, ConfirmationDialog } from '@/components/Elements';
import { Authorization, ROLES } from '@/lib/authorization';
import { TrashIcon } from '@heroicons/react/outline';
import PropTypes from 'prop-types';

import { useDeleteDiscussion } from '../api/deleteDiscussion';

export const DeleteDiscussion = ({ id }) => {
  const deleteDiscussionMutation = useDeleteDiscussion();

  return (
    <Authorization allowedRoles={[ROLES.ADMIN]}>
      <ConfirmationDialog
        icon="danger"
        title="Delete Discussion"
        body="Are you sure you want to delete this discussion?"
        triggerButton={
          <Button variant="danger" startIcon={<TrashIcon className="h-4 w-4" />}>
            Delete Discussion
          </Button>
        }
        confirmButton={
          <Button
            isLoading={deleteDiscussionMutation.isLoading}
            type="button"
            className="bg-red-600"
            onClick={async () => await deleteDiscussionMutation.mutateAsync({ discussionId: id })}
          >
            Delete Discussion
          </Button>
        }
      />
    </Authorization>
  );
};

DeleteDiscussion.propTypes = {
  id: PropTypes.string.isRequired,
};
