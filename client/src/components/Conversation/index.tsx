import React from 'react'
import {
  ConversationWrap,
  ConversationImg,
  ConversationUserName,
} from "./converse.styles";

function Conversation() {
    return (
      <>
        <ConversationWrap>
          <ConversationImg alt="conversation image" src="/Aleah.jpg" />
          <ConversationUserName>aleah</ConversationUserName>
        </ConversationWrap>
        <ConversationWrap>
          <ConversationImg alt="conversation image" src="/D.jpg" />
          <ConversationUserName>maguyva</ConversationUserName>
        </ConversationWrap>
        <ConversationWrap>
          <ConversationImg alt="conversation image" src="/prettygirl.jpg" />
          <ConversationUserName>hotness95</ConversationUserName>
        </ConversationWrap>
        
      </>
    );
}

export default Conversation
