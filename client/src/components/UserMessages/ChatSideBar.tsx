import React, { useEffect, useState } from "react";
import Conversation from "../Conversation";
import OnlineChat from "../OnlineChat";
import {
  BackOverlay,
  SearchButton,
} from "components/Dashboard/LeftSideBar/leftside.styles";
import { SearchIcon } from "components/Dashboard/TopBar/topbar.styles";
import {
  MsgContainer,
  MsgChatMenu,
  MsgChatMenuWrapper,
  MsgChatMenuInput,
  OnlineChatContainer,
  OnlineChatWrapper,
  ChatBoxContainer,
  ChatBoxWrapper,
} from "./msg.styles";
import {
  SearchUsersDocument,
  SearchUsersQueryResult,
  useGetAllChatsByUserIdQuery,
} from "generated/graphql";
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";
import { client } from 'lib/initApollo';
import Message from 'components/Message';



const ChatSideBar = ({children}: any) => {
  const { data, loading } = useGetAllChatsByUserIdQuery();
  const [menuState, setMenuState] = useState(false);
  const { user: user } = useAppSelector(isUser);
  {
    menuState && (
      <BackOverlay onClick={() => setMenuState(false)} className="" />
    );
  }
  const [filteredMessages, setFilteredMessages] = useState([]);

  const  chats: any  = data?.getAllChatsByUserId;
  const messages = chats.chats;
  const errMsg: any = data?.getAllChatsByUserId
  const errorMsg = errMsg.messages;
  const me = user;
  
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  // console.log(chats?.chats);

  useEffect(() => {
    setFilteredMessages(messages);
  }, [messages]);

  const handleSearch = async (event: { target: { value: string } }) => {
    setSearchItem(event.target.value);
    // console.log(searchItem);
    if (filteredMessages !== []) {
      if (searchItem !== "") {
        const filteredData = messages.filter((msg: any) => {
          return Object.values(msg.owner.username || msg.recipient.username)
            .join(" ")
            .toLowerCase()
            .includes(searchItem.toLowerCase());
        });
        setFilteredMessages(filteredData);
        if (filteredData && filteredData.length === 0) {
          console.log(filteredData);
          const { data } = await client.query<SearchUsersQueryResult>({
            query: SearchUsersDocument,
            variables: {
              searchItem,
            },
          });

          if (data.searchUsers.users.length !== 0 && searchItem !== "") {
            setSearchedUsers(data.searchUsers.users);
            // console.log(searchedUsers);
          } else setSearchedUsers([]);
        }

        // console.log(filteredData);
      } else setFilteredMessages(filteredMessages);
    } else {
      const { data } = await client.query<SearchUsersQueryResult>({
        query: SearchUsersDocument,
        variables: {
          searchItem,
        },
      });
      // console.log(data)
      if (data.searchUsers.users) {
        setSearchedUsers(data.searchUsers.users);
        // console.log(searchedUsers);
      }
    }
  };

  if (!data?.getAllChatsByUserId || loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <SearchButton onClick={() => setMenuState(true)} className="toggleMenu">
        <SearchIcon></SearchIcon>
      </SearchButton>
      {menuState && (
        <BackOverlay onClick={() => setMenuState(false)} className="" />
      )}
      <MsgContainer>
        <MsgChatMenu className={menuState ? "opened" : ""}>
          <MsgChatMenuWrapper>
            <MsgChatMenuInput
              type="text"
              placeholder="Search for a user"
              onChange={handleSearch}
              name="searchItem"
              // value={searchItem}
            />
            {errorMsg && (
              <>
                <br />
                <br />
                <div> You Currently have no messages</div>
              </>
            )}
            {filteredMessages !== undefined &&
              filteredMessages.map(
                (
                  msg: {
                    id: string | undefined;
                    recipient: {
                      id: string | undefined;
                      username: string;
                      profileImage: string;
                    };
                    owner: {
                      id: string;
                      username: string;
                      profileImage: string;
                    };
                  },
                  id: React.Key | null | undefined
                ) =>
                  me?.id !== msg.recipient.id ? (
                    <div key={id}>
                      <Conversation
                        username={msg.recipient.username}
                        image={msg.recipient.profileImage}
                        id={msg.id}
                      />
                    </div>
                  ) : (
                    <div key={id}>
                      <Conversation
                        username={msg.owner.username}
                        image={msg.owner.profileImage}
                        id={msg.id}
                      />
                    </div>
                  )
              )}
          </MsgChatMenuWrapper>
        </MsgChatMenu>
        <ChatBoxContainer>
          <ChatBoxWrapper>
            <Message />
          </ChatBoxWrapper>
        </ChatBoxContainer>
        <OnlineChatContainer>
          <OnlineChatWrapper>
            {searchedUsers !== [] &&
              searchedUsers.map(({ profileImage, username, online }, id) => (
                <OnlineChat
                  key={id}
                  profileImage={profileImage}
                  username={username}
                  online={online}
                />
              ))}
            {/* {existingChatUsers !== [] &&
              existingChatUsers.map((user, id) => (
                <OnlineChat
                  key={id}
                  profileImage={user.profileImage}
                  username={user.username}
                  online={user.online}
                />
              ))} */}
          </OnlineChatWrapper>
        </OnlineChatContainer>
      </MsgContainer>
    </>
  );
};

export default ChatSideBar
