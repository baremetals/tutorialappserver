import React from 'react'
import {
  ServiceContainer,
  ServiceH1,
  ServiceWrapper,
  ServicesCard,
  ServiceIcon,
  ServiceH2,
  ServiceP,
} from "./styles";

const ServiceCard = () => {
    return (
      <ServiceContainer>
        <ServiceH1>What We Offer</ServiceH1>
        <ServiceWrapper>
          <ServicesCard>
            <ServiceIcon src="/assets/images/learning3.svg" />
            <ServiceH2>What We Offer</ServiceH2>
            <ServiceP>What We Offer blah blah blah</ServiceP>
          </ServicesCard>
          <ServicesCard>
            <ServiceIcon src="/assets/images/learning3.svg" />
            <ServiceH2>What We Offer</ServiceH2>
            <ServiceP>What We Offer blah blah blah</ServiceP>
          </ServicesCard>
          <ServicesCard>
            <ServiceIcon src="/assets/images/learning3.svg" />
            <ServiceH2>What We Offer</ServiceH2>
            <ServiceP>What We Offer blah blah blah</ServiceP>
          </ServicesCard>
        </ServiceWrapper>
      </ServiceContainer>
    );
}

export default ServiceCard
