import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export interface CommentsProps {
  comments: CommentProps[];
  onSubmit: (comment: string) => void;
  onDelete: (commentId: string) => void;
}

export interface CommentProps {
  email: string;
  comment: string;
  regDt: number;
  id?: string;
  commentId?: string;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  onSubmit,
  onDelete,
}) => {
  const [inputComment, setInputComment] = useState<string>('');
  const userEmail = sessionStorage.getItem('user') || '';

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputComment(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputComment.trim() !== '') {
      sendInputComment();
    }
  };

  const cancel = () => {
    setInputComment('');
  };

  const sendInputComment = async () => {
    await onSubmit(inputComment);
    setInputComment('');
  };

  const handleDelete = async (commentId: string) => {
    await onDelete(commentId);
  };

  return (
    <div>
      <div className='flex flex-col space-y-2'>
        <div className='w-full'>
          <Input
            placeholder='댓글 추가....'
            value={inputComment}
            onChange={handleCommentChange}
            onKeyDown={handleKeyDown}
            className='commentInput'
          />
        </div>
        <div className='w-full grid justify-items-end'>
          <div className='flex flex-row space-x-5'>
            <Button variant='commentCancel' onClick={cancel}>
              취소
            </Button>
            <Button
              className={
                inputComment.length > 0
                  ? 'bg-primary'
                  : 'bg-input text-gray-400 hover:bg-input'
              }
              onClick={sendInputComment}
            >
              댓글
            </Button>
          </div>
        </div>
      </div>
      <ul>
        {comments?.length > 0 &&
          comments.map((item, index) => (
            <li key={index} className='pb-3'>
              <div className='flex flex-col items-start space-y-5'>
                <div className='flex flex-col w-full'>
                  {item?.email && (
                    <p className='font-bold text-start'>@{item.email}</p>
                  )}
                  <div className='flex flex-row justify-between w-full'>
                    {item?.comment && (
                      <p className='text-start'>{item.comment}</p>
                    )}
                    {item.email === userEmail && (
                      <button
                        onClick={() => handleDelete(item.commentId!)}
                        className='text-red-500 text-end'
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default React.memo(Comments);
