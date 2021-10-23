import React, { ReactElement } from 'react'
import Link from 'next/link'
import { animateScroll as scroll } from "react-scroll";
import {
  FooterContainer,
  FooterWrap,
  FooterLinkContainer,
  FooterLinkWrapper,
  FooterLinkItem,
  FooterLinkTitle,
  FooterLink,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  WebsiteRights,
  SocialIcons,
  SocialIconLink,
} from "./styles";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Logo } from "../../../public/assets/images/Logo";
// interface Props {
    
// }

function Footer(): ReactElement {

  const toggleHome = () => {
    scroll.scrollToTop();
  };
    return (
      <FooterContainer>
        <FooterWrap>
          <FooterLinkContainer>
            <FooterLinkWrapper>
              <FooterLinkItem>
                <FooterLinkTitle>Bare Tutorials</FooterLinkTitle>
                <Link href="">
                  <FooterLink>Terms of Service</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Get in Touch</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Courses</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Forum</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Recommendations</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Books</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLinkTitle>Bare Tutorials</FooterLinkTitle>
                <Link href="">
                  <FooterLink>Terms of Service</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Get in Touch</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Courses</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Forum</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Recommendations</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Books</FooterLink>
                </Link>
              </FooterLinkItem>
            </FooterLinkWrapper>
            <FooterLinkWrapper>
              <FooterLinkItem>
                <FooterLinkTitle>Bare Tutorials</FooterLinkTitle>
                <Link href="">
                  <FooterLink>Terms of Service</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Get in Touch</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Courses</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Forum</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Recommendations</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Books</FooterLink>
                </Link>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLinkTitle>Bare Tutorials</FooterLinkTitle>
                <Link href="">
                  <FooterLink>Terms of Service</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Get in Touch</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Courses</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Forum</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Recommendations</FooterLink>
                </Link>
                <Link href="">
                  <FooterLink>Books</FooterLink>
                </Link>
              </FooterLinkItem>
            </FooterLinkWrapper>
          </FooterLinkContainer>
          <SocialMedia>
            <SocialMediaWrap>
              <SocialLogo onClick={toggleHome}>
                <Logo color="white" width="45" height="45" />
              </SocialLogo>
              <WebsiteRights>Baremetals Limited {new Date().getFullYear()}</WebsiteRights>
              <SocialIcons>
                <SocialIconLink href="" target="_blank" aria-label="Twitter">
                  <FaTwitter />
                </SocialIconLink>
                <SocialIconLink href="" target="_blank" aria-label="FaceBook">
                  <FaFacebook />
                </SocialIconLink>
                <SocialIconLink href="" target="_blank" aria-label="Instagram">
                  <FaInstagram />
                </SocialIconLink>
                <SocialIconLink href="" target="_blank" aria-label="Youtube">
                  <FaYoutube />
                </SocialIconLink>
                <SocialIconLink href="" target="_blank" aria-label="Linkedin">
                  <FaLinkedin />
                </SocialIconLink>
              </SocialIcons>
            </SocialMediaWrap>
          </SocialMedia>
        </FooterWrap>
      </FooterContainer>
    );
}

export default Footer
