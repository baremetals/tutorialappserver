import React from 'react'
import {
  DropDownContainer,
  Icon,
  CloseIcon,
  DropDownWrapper,
  DropDownLinks,
  DropDownMenu,
  DropDownBtnWrapper,
  DropDownBtn
} from "./styles";


const NavDropDown = ({ toggle, isOpen, ...props }: any) => {

  return (
    <DropDownContainer isOpen={isOpen} onClick={toggle} {...props}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <DropDownWrapper>
        <DropDownMenu>
          <DropDownLinks
            {...props}
            to="courses"
            onClick={toggle}
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
          >
            Courses
          </DropDownLinks>

          <DropDownLinks
            {...props}
            to="recommends"
            onClick={toggle}
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
          >
            Recommendations
          </DropDownLinks>

          <DropDownLinks
            {...props}
            to="books"
            onClick={toggle}
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
          >
            Books
          </DropDownLinks>

          <DropDownLinks
            {...props}
            to="forum"
            onClick={toggle}
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
          >
            Forum
          </DropDownLinks>
          <DropDownLinks
            {...props}
            to="signup"
            onClick={toggle}
            smooth={true}
            duration={500}
            spy={true}
            exact="true"
            offset={-80}
          >
            Forum
          </DropDownLinks>
        </DropDownMenu>
        <DropDownBtnWrapper>
          <DropDownBtn>Sign Up</DropDownBtn>
        </DropDownBtnWrapper>
      </DropDownWrapper>
    </DropDownContainer>
  );
};

export default NavDropDown
