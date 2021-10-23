import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll"
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import {
  Nav,
  NavLink,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavBtn,
  NavBtnLink,
  NavBarContainer,
  NavItem,
} from "./NavBar.styles";
import { Logo } from "../../../public/assets/images/Logo"



export default function NavBar({ toggle, ...props }: any) {
  const [scrcollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else setScrollNav(false);
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  })

  const toggleHome = () => {
    scroll.scrollToTop();
  }
  return (
    <Nav scrollNav={scrcollNav} {...props}>
      <NavBarContainer>
        <Link href="/">
          <NavLogo onClick={toggleHome}>
            <Logo color="white" width="50" height="50" />
          </NavLogo>
        </Link>
        <MobileIcon onClick={toggle}>
          <FaBars />
        </MobileIcon>
        <NavMenu>
          <NavItem>
            <NavLink
              {...props}
              to="courses"
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              exact="true"
            >
              Courses
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              {...props}
              to="recommend"
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              exact="true"
            >
              Recommendations
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              {...props}
              to="books"
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              exact="true"
            >
              Books
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              {...props}
              to="forum"
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              exact="true"
            >
              Forum
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              {...props}
              to="signup"
              smooth={true}
              duration={500}
              spy={true}
              offset={-80}
              exact="true"
            >
              Sign Up
            </NavLink>
          </NavItem>
        </NavMenu>
        <NavBtn>
          <Link href="/signup">
            <NavBtnLink>Sign Up</NavBtnLink>
          </Link>
        </NavBtn>
      </NavBarContainer>
    </Nav>
  );
}
