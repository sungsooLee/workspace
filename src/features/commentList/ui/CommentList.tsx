import React, { useState } from 'react';
import { Button } from '../../../shared/components/ui/button';
import { CommentInput } from './CommentInput';
import { CommentListProps } from '../model/commentList';

const CommentList: React.FC<CommentListProps> = ({
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
    if (inputComment.trim() !== '') {
      await onSubmit(inputComment);
      setInputComment('');
    }
  };

  const handleDelete = async (commentId: string) => {
    await onDelete(commentId);
  };

  return (
    <div>
      <div className='flex flex-col space-y-2'>
        <div className='w-full'>
          <CommentInput
            placeholder='댓글 추가....'
            value={inputComment}
            onChange={handleCommentChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className='grid w-full justify-items-end'>
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
                <div className='flex w-full flex-col'>
                  {item?.email && (
                    <p className='text-start font-bold'>@{item?.email}</p>
                  )}
                  <div className='flex w-full flex-row justify-between'>
                    {item?.comment && (
                      <p className='text-start'>{item.comment}</p>
                    )}
                    {item?.email === userEmail && (
                      <button
                        onClick={() => handleDelete(item.commentId!)}
                        className='text-end text-red-500'
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

export default React.memo(CommentList);
