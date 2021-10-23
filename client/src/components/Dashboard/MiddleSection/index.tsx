import React from 'react'

import Share from '../Share';
import { MiddleContainer, MiddleWrapper } from "./middle.styles";

const MiddleSection = ({children}: any) => {
    return (
      <MiddleContainer>
        <MiddleWrapper>
          <Share />
          {children}
        </MiddleWrapper>
      </MiddleContainer>
    );
}

export default MiddleSection
