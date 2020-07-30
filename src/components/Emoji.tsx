import React from 'react';

interface EmojiProps {
  label: string;
  symbol: string;
}
export const Emoji = (props: EmojiProps): JSX.Element => {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={props.label ? props.label : ''}
      aria-hidden={props.label ? 'false' : 'true'}
    >
      {`${props.label} ${props.symbol}`}
    </span>
  );
};
