import React from 'react';

export interface CommentsProps {
  comments: CommentProps[];
}

export interface CommentProps {
  email: string;
  comment: string;
  regDt: number;
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
  console.log(comments);
  return (
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
  );
};

export default React.memo(Comments);
