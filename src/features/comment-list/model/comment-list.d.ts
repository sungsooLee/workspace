import { Comment } from '@/entities/comment/model/comment';

export interface CommentListProps {
  comments: Comment[];
  onSubmit: (comment: string) => void;
  onDelete: (commentId: string) => void;
}
