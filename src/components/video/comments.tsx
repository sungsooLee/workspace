import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export interface CommentsProps {
  comments: CommentProps[];
  onSubmit: (comment: string) => void;
}

export interface CommentProps {
  email: string;
  comment: string;
  regDt: number;
  id?: string;
}

const Comments: React.FC<CommentsProps> = ({ comments, onSubmit }) => {
  const [inputComment, setInputComment] = useState<string>('');

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
        {comments.map((item, index) => (
          <li key={index} className='pb-3'>
            <div className='flex flex-col items-start space-y-5'>
              <p className='font-bold'>@{item.email}</p>
              {item.comment}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Comments);
