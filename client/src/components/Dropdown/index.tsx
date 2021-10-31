import React from "react";
import styled from "styled-components";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const Dropdown = ({ showDropdown, ...props }: any) => {
  return (
    <>
      {showDropdown ? (
        <CardContainer showDropdown={showDropdown} {...props}>
          <DropdownCard>
            <ItemWrapper>
              <EditIcon />
              <ItemText>Edit</ItemText>
            </ItemWrapper>
            <ItemWrapper>
              <DeleteIcon />
              <ItemText>Delete</ItemText>
            </ItemWrapper>
          </DropdownCard>
        </CardContainer>
      ) : null}
    </>
  );
};

export default Dropdown;

export const CardContainer = styled.div`
  display: flex;
  /* margin: 10px 0; */
  justify-content: flex-end;

`;

export const DropdownCard = styled.div`
  background: #fff;
  display: grid;
  /* flex-direction: column; */
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 6px;
    z-index: 2;
  /* padding: 60px; */
  margin-top: 0px;
  width: 12%;
  height: 4rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  margin-top: 5px;
  margin-left: 5px;
`;
export const ItemText = styled.span`
  font-size: 12px;
  margin-left: 5px;
`;
export const EditIcon = styled(MdEdit)`
  font-size: 15px;
`;
export const DeleteIcon = styled(MdDeleteForever)`
  font-size: 15px;
`;
