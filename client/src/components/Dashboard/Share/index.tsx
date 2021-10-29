import React, { useState } from "react";
import {
  ShareContainer,
  ShareWrapper,
  ShareTop,
  ProfileImage,
  Title,
  ShareHr,
  ShareBottomWrap,
  ShareOptions,
  ShareOptionItem,
  ShareOptionsIcon,
  ShareOptionstext,
  ShareButton,
} from "./share.styles";
import { MdPermMedia, MdOndemandVideo, MdTextsms } from "react-icons/md";
import Modal from "components/ShareForm/Modal";
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";

const Share = () => {
  const { user: user } = useAppSelector(isUser);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ShareContainer>
        <ShareWrapper>
          <ShareTop>
            <ProfileImage src={user?.profileImage} />
            <Title onClick={() => setShowModal(true)} placeholder={`what's on your mind ${user?.username}?`} />
          </ShareTop>
          <ShareHr />
          <ShareBottomWrap>
            <ShareOptions onClick={() => setShowModal(true)}>
              <ShareOptionItem>
                <ShareOptionsIcon>
                  <MdPermMedia />
                </ShareOptionsIcon>
                <ShareOptionstext>Photo</ShareOptionstext>
              </ShareOptionItem>
            </ShareOptions>
            <ShareOptions onClick={() => setShowModal(true)}>
              <ShareOptionItem>
                <ShareOptionsIcon>
                  <MdOndemandVideo />
                </ShareOptionsIcon>
                <ShareOptionstext>Video</ShareOptionstext>
              </ShareOptionItem>
            </ShareOptions>
            <ShareOptions onClick={() => setShowModal(true)}>
              <ShareOptionItem>
                <ShareOptionsIcon>
                  <MdTextsms />
                </ShareOptionsIcon>
                <ShareOptionstext>Text</ShareOptionstext>
              </ShareOptionItem>
            </ShareOptions>
            <ShareButton onClick={() => setShowModal(true)}>send</ShareButton>
          </ShareBottomWrap>
        </ShareWrapper>
      </ShareContainer>
      <Modal
        showModal={showModal}
        closeM={() => setShowModal(false)}
        setShowModal={setShowModal}
      />
    </>
  );
};
export default Share;
