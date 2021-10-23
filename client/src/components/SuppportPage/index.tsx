import React from 'react'
import PageContainer, {
  MiddleContainer,
  RightSideContainer,
} from "../Containers/PageContainer";
import LeftSideBar from '../Dashboard/LeftSideBar'
import SmallFooter from '../Dashboard/SmallFooter'
import Topbar from '../Dashboard/TopBar'
import Button from '../Auth/Button'

import {
  SupportH1,
  SupportCardWrapper,
  FAQTitle,
  TextWrap,
  ContactCardWrap,
  ContactCard,
  FormWrap,
  SupportMainContainer,
  SupportInputContainer,
  SupportInput,
  SupportButtonContainer,
  SupportTextArea,
} from "./support.styles";

function SupportPage() {
    return (
      <>
        <Topbar />
        <PageContainer>
          <LeftSideBar />
          <MiddleContainer>
            <SupportH1>Support</SupportH1>
            <SupportCardWrapper>
              <FAQTitle>FAQs</FAQTitle>
              <TextWrap>
                What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
                printing and typesetting industry. Lorem Ipsum has been the
                industrys standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.
              </TextWrap>
            </SupportCardWrapper>
            <ContactCardWrap>
              <FAQTitle>Ask A Question</FAQTitle>
              <ContactCard>
                <FormWrap>
                  <SupportMainContainer>
                    <SupportInputContainer>
                      <SupportInput placeholder="topic" />
                      <SupportInput placeholder="topic" />
                      <SupportTextArea placeholder="write something..." />
                    </SupportInputContainer>
                    <SupportButtonContainer>
                      <Button content="Submit" />
                    </SupportButtonContainer>
                  </SupportMainContainer>
                </FormWrap>
              </ContactCard>
            </ContactCardWrap>
          </MiddleContainer>
          <RightSideContainer>Live Forever Young</RightSideContainer>
        </PageContainer>
        <SmallFooter />
      </>
    );
}

export default SupportPage
