import React from 'react'
import {
  MessageWrap,
  MessageTop,
  MessageImg,
  MessageText,
  MessageBottom,
  OwnerMessageWrap,
  OwnerMessageText,
} from "./message.styles";

function Message() {
    return (
      <>
        <MessageWrap>
          <MessageTop>
            <MessageImg alt="Message image" src="/prettygirl.jpg" />
            <MessageText>hey sexy how are you living?</MessageText>
          </MessageTop>
          <MessageBottom> 2 mins ago</MessageBottom>
        </MessageWrap>
        <MessageWrap>
          <MessageTop>
            <MessageImg alt="Message image" src="/prettygirl.jpg" />
            <MessageText>are you there?</MessageText>
          </MessageTop>
          <MessageBottom> 2 mins ago</MessageBottom>
        </MessageWrap>
        <OwnerMessageWrap>
          <MessageTop>
            <MessageImg alt="Message image" src="/D.jpg" />
            <OwnerMessageText>yo sup PYT?</OwnerMessageText>
          </MessageTop>
          <MessageBottom> 2 mins ago</MessageBottom>
        </OwnerMessageWrap>
        <MessageWrap>
          <MessageTop>
            <MessageImg alt="Message image" src="/prettygirl.jpg" />
            <MessageText>just checking if you good?</MessageText>
          </MessageTop>
          <MessageBottom> 2 mins ago</MessageBottom>
        </MessageWrap>
        
      </>
    );
}

export default Message
