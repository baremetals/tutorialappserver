import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  NoticesWrapper,
  NoticeLeftWrap,
  SenderProfileImge,
  NoticeMessage,
  NoticeDate,
  NoticeTopRightWrap,
  DeleteIcon,
} from "./notice.styles";
import {
  PageHeading,
} from "../../styles/common.styles";
import {
  GetMessagesByUserIdDocument,
  useNewMessageSubscription,
} from "../../generated/graphql";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useQuery } from "@apollo/client";
import Dashboard from 'components/Dashboard';
dayjs.extend(relativeTime);

type NotificationsPageType = {
  image: string;
  body: string;
  createdOn: string;
  id: string;
  from: string;
};
function NotificationsPage() {
  const { ...result } = useQuery(GetMessagesByUserIdDocument);
  const notices = result.data?.getMessagesByUserId.msgs;
  const { data } = useNewMessageSubscription();
  const newNotice = data?.newMessage;
  const [noticeArray, setNoticeArray] = useState([]);

  const errrorMessage = result.data?.getMessagesByUserId.messages || ""

  useEffect(() => {
    if (newNotice) {
      const newMessageItem: NotificationsPageType = newNotice;
      const newArrayItem: any = (prevArray: NotificationsPageType[]) => {
        return [newMessageItem, ...prevArray];
      };
      setNoticeArray(newArrayItem);
    }
  }, [newNotice]);

  // console.log(result.data);
  // console.log(data?.newMessage);
  // console.log(data?.newMessage);
  // console.log(data?.newMessage);

  if (!result.data || result.loading) {
    return <div>loading...</div>;
  }

  if (result.error) {
    return <div>oh mate this is embarrasing.....</div>;
  }

  // console.log(noticeArray);

  return (
    <Dashboard>
          <PageHeading>Notifications</PageHeading>
          {errrorMessage ? (
            <div> You do not have any notifications</div>
          ) : (
            <>
              {noticeArray
                .concat(notices)
                .map(
                  (
                    { body, image, createdOn, from }: NotificationsPageType,
                    id
                  ) => (
                    <NoticesWrapper key={id}>
                      <NoticeLeftWrap>
                        <Link href={`user-profile/${from}`}>
                          <SenderProfileImge
                            alt="sender profile image"
                            src={image}
                          />
                        </Link>

                        <NoticeMessage>{body}</NoticeMessage>
                        <NoticeDate>{dayjs(createdOn).fromNow()}</NoticeDate>
                      </NoticeLeftWrap>
                      <NoticeTopRightWrap>
                        <DeleteIcon />
                      </NoticeTopRightWrap>
                    </NoticesWrapper>
                  )
                )}
            </>
          )}
    </Dashboard>
  );
}

export default NotificationsPage;
