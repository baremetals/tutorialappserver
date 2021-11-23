import styled from 'styled-components'


export const CoursesH1 = styled.h1`
  font-size: 2.5rem;
  color: #655e5e;
  margin-bottom: 34px;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;
export const DetailsCardWrapper = styled.div`
  padding: 5px;
`;

export const CardTop = styled.div`
  /* display: flex; */
  align-items: center;
  justify-content: space-between;
`;

export const CardLeftWrap = styled.div`
  /* display: flex; */
  align-items: center;
`;

export const CardTitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin: 0 10px;
  padding-top: 20px;
`;

export const StartDateTitle = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin: 0 10px;
  
`;

export const StartDate = styled.span`
  font-size: 20px;
  color: #5bb3aa;
`;

export const CardCenterWrap = styled.div`
  margin: 10px 10px;
`;
export const CardText = styled.span``;

export const ApplyButton = styled.button`
  background: #256ce1;
  color: #fff;
  font-size: 14px;
  border-radius: 4px;
  padding: 5px 11px;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: auto;
`;

export const CardBottom = styled.div`
  align-items: center;
  display: flex;
`;

export const MediaContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  box-shadow: 0px 0px 16px -8px rgba(0, 0, 0, 0.68);
  margin: 30px 0;
  padding-bottom: 20px;
`;

export const CoursesH2 = styled.h2`
  font-size: 2rem;
  color: #655e5e;
  margin-top: 24px;
  margin-bottom: 24px;

  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const CoursesTeacherWrap = styled.div`
  /* align-items: flex-start; */
  display: grid;
`;
export const CoursesTeacherNameAndImageWrap = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px
`;

export const CoursesTeacherName = styled.p`
  font-size: 12px;
  font-weight: 300;
  margin: 0 10px;
`;

export const CoursesTeacherImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;