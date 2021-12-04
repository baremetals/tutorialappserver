import React, { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LeftSideBar from "components/Dashboard/LeftSideBar";
import SmallFooter from "components/Dashboard/SmallFooter";
import TopBar from "components/Dashboard/TopBar";
import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth/selectors";
import {
  PageContainer,
  InnerContainer,
  PageRightSide,
  PageHeading,
} from "../../styles/common.styles";
import styled from 'styled-components';
import { ErrorMsg, Error, SuccessMsg } from "../Input";
import {
  getChangePasswordValidationSchema,
  getProfileDetailsValidationSchema,
} from "utils/formValidation";

type PasswordInput = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  error: string;
  success: string;
};

type ProfileDetails = {
  fullName: string;
  username: string;
  email: string;
};

type Image = {
  profileImage: string;
  success: string;
};

type FileType = {
  lastModified: any;
  lastModifiedDate: {};
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};


const EditProfile = () => {
  const { user: user } = useAppSelector(isUser);
  const [error, setError] = useState({
    isError: false,
    isProfError: false,
    isImgError: false,
  });
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState({
    isSuccess: false,
    isProfSuccess: false,
    isImgSuccess: false,
  });
  const schema = getChangePasswordValidationSchema();
  const profSchema = getProfileDetailsValidationSchema();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<PasswordInput>({
    resolver: yupResolver(schema),
  });
  
  const {
    register: registerProfile,
    formState: { errors: profileErrors },
    handleSubmit: handleProfSubmit,
  } = useForm<ProfileDetails>({
    resolver: yupResolver(profSchema),
  });
 
  const {
    setValue,
    formState: { errors: imgErrors },
    handleSubmit: handleImgSubmit,
  } = useForm <
  Image>({
    resolver: yupResolver(profSchema),
  });
   let [upload] = useState<FileType>({
     lastModified: 0,
     lastModifiedDate: {},
     name: "",
     size: 0,
     type: "",
     webkitRelativePath: "",
   });

  // console.log(user);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const handlePasswordSubmit: SubmitHandler<PasswordInput> = async (
    data: PasswordInput
  ) => {
    console.log(data);
    //   setMsg("yankee doodle");
    //   setSuccess({
    //     isSuccess: true,
    //     isProfSuccess: false,
    //   });
  };

  const handleProfileSubmit: SubmitHandler<ProfileDetails> = async (
    data: ProfileDetails
  ) => {
    const fullName = data.fullName == "" ? user?.fullName : data.fullName;
    const username = data.username == "" ? user?.username : data.username;
    const email = data.email == "" ? user?.email : data.email;
    console.log(email, fullName, username, data);
    //   setMsg("yankee doodle");
    //   setError({
    //     isError: false,
    //     isProfError: true,
    //   });
  };

  const handleImageChange =
    (_name: string) => (event: { target: { files: {}[] } } |File |any) => {
      upload = event.target.files[0];
      console.log(upload);
      if (upload.size > 1024) {
        setMsg("File size cannot exceed more than 1MB");
        error.isImgError = true;
        setTimeout(() => {
          setError({
            isError: false,
            isProfError: false,
            isImgError: false,
          });
        }, 3000);
      }

      setValue("profileImage", upload as any);
    };

  const handleImageSubmit: SubmitHandler<Image> = async (data: Image) => {
    const profileImage = data.profileImage == "" ? user?.profileImage : data.profileImage;
    console.log(profileImage, data);
    //   setMsg("yankee doodle");
    //   setError({
    //     isError: false,
    //     isProfError: true,
    //   });
  };
  return (
    <>
      <TopBar />
      <PageContainer>
        <LeftSideBar />
        <InnerContainer>
          <PageHeading>Edit Profile Settings</PageHeading>
          <div>
            <h4>Change Password</h4>
            <br />
            <form
              style={{ display: "grid" }}
              onSubmit={handleSubmit(handlePasswordSubmit)}
            >
              {error.isError && <ErrorMsg>{msg}</ErrorMsg>}
              {success.isSuccess && <SuccessMsg>{msg}</SuccessMsg>}
              <label htmlFor="full name">Current Password</label>
              <Input
                type="password"
                placeholder="Enter current password"
                {...register("currentPassword", { required: true })}
                name="currentPassword"
              />
              {errors.currentPassword && (
                <Error>{errors.currentPassword?.message}</Error>
              )}
              <br></br>
              <label htmlFor="full name">New Password</label>
              <Input
                type="password"
                placeholder="Enter new password"
                {...register("newPassword")}
                name="newPassword"
              />
              {errors.newPassword && (
                <Error>{errors.newPassword?.message}</Error>
              )}
              <Input
                type="password"
                placeholder="Confirm new password"
                {...register("confirmPassword")}
                name="confirmPassword"
              />
              {errors.confirmPassword && (
                <Error>{errors.confirmPassword?.message}</Error>
              )}

              <br></br>
              <Button type="submit">submit</Button>
            </form>
          </div>
          <HorizontalRule />
          <br />
          {/* Image Form */}
          <h4>Change Profile Image</h4>
          <br />
          <form onSubmit={handleImgSubmit(handleImageSubmit)}>
            {success.isImgSuccess && <SuccessMsg>{msg}</SuccessMsg>}
            {error.isImgError && <ErrorMsg>{msg}</ErrorMsg>}
            <ProfileImage src={user?.profileImage} alt="Profile Image" />
            <br />
            <input
              type="file"
              onChange={handleImageChange("profileImage")}
              name="profileImage"
              required
            />
            {imgErrors.profileImage && (
              <Error>Image required</Error>
            )}
            <br />
            <br />
            <Button type="submit">submit</Button>
          </form>
          <br />
          <HorizontalRule />
          {/* Profile Form */}
          <h4>Profile Details</h4>
          <br />
          <form
            style={{ display: "grid" }}
            onSubmit={handleProfSubmit(handleProfileSubmit)}
          >
            {success.isProfSuccess && <SuccessMsg>{msg}</SuccessMsg>}
            {error.isProfError && <ErrorMsg>{msg}</ErrorMsg>}
            <label htmlFor="full name">Full Name</label>
            <StyledInput
              type="text"
              defaultValue={user?.fullName}
              {...registerProfile("fullName", { minLength: 3 })}
              name="fullName"
            />
            {profileErrors.fullName && (
              <Error>Minimum of 3 characters required</Error>
            )}
            {profileErrors.fullName && (
              <Error>{profileErrors.fullName?.message}</Error>
            )}
            <br></br>
            <label htmlFor="username">Username</label>

            <StyledInput
              type="text"
              defaultValue={user?.username}
              {...registerProfile("username", { minLength: 3 })}
              name="username"
            />
            {profileErrors.username && (
              <Error>{profileErrors.username?.message}</Error>
            )}
            <br></br>
            <label htmlFor="email">Email</label>
            <StyledInput
              type="text"
              defaultValue={user?.email}
              {...registerProfile("email")}
              name="email"
            />
            {profileErrors.email && (
              <Error>{profileErrors.email?.message}</Error>
            )}
            <br></br>
            <Button type="submit">submit</Button>
          </form>
        </InnerContainer>
        <PageRightSide>live fast die young</PageRightSide>
      </PageContainer>
      <SmallFooter />
    </>
  );
}

export default EditProfile

export const Button = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  cursor: pointer;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #fff;
  text-transform: capitalize;
  border: none;
  width: 30%;
  border-radius: 0.5rem;
  box-shadow: 0 0 1rem rgb(0 0 0 / 50%);
`;

export const Input = styled.input`
  /* width: 15rem; */
  background-color: #e9e9e9;
  display: flex;
  align-items: center;
  border-radius: 0.5rem;
  height: 2rem;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0.25rem 0;
  outline: none !important;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 0.5rem;
    margin-top: 0.2rem;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
  width: 70%;
`;

export const StyledInput = styled.input`
  background: #e9e9e9fd;
  box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.37);
  border-radius: 0.5rem;
  width: 70%;
  height: 2rem;
  padding: 0.5rem 1rem;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 0.2rem;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 0.5rem;
    margin-top: 0.2rem;
  }
  &::placeholder {
    color: #a8a4b199;
    font-weight: 100;
    font-size: 1rem;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
  margin-bottom: 10px;
`;

export const HorizontalRule = styled.hr`
  width: 100%;
  height: 3px;
  border-radius: 1rem;
  border: none;
  background-color: rgb(31, 38, 135, 0.37);
  margin: 1.5rem auto;
`;