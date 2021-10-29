import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useForm } from "react-hook-form";
import {
  PageContainer,
  CloseButtonWrap,
  CardText,
  InputContainer,
  FormWrap,
  MainContainer,
  TitleInput,
  CategorySecetion,
  CategoryOptions,
  BodyText,
  ButtonContainer,
  UploadWrapper,
  UploadLabel,
  BodyTextWrapper,
  UploadInput,
  SubmitButton,
  CloseButton,
  Background,
} from "./modal.styles";
import { AiFillCloseCircle } from "react-icons/ai";
// import Uploader from "components/Uploader";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "lib/admin"
import { useCategoryQuery } from "generated/graphql";
import { useAppDispatch } from "app/hooks";
import { setCategory } from "features/ui/reducers";

type FormInput = {
  title: string;
  category: string;
  body?: string;
  upload?: string;
};

// const categories = [
//   { value: "grocery", name: "Grocery", id: "1" },
//   { value: "women-cloths", name: "Women Cloths", id: "2" },
//   { value: "bags", name: "Bags", id: "3" },
//   { value: "makeup", name: "Makeup", id: "4" },
// ];

export const Modal = ({ closeM, showModal, setShowModal, ...props }: any) => {
  const dispatch = useAppDispatch();

  const { data } = useCategoryQuery();
  dispatch(setCategory(data?.getAllCategories));
  // console.log(data?.getAllCategories);
  const categories = data?.getAllCategories as any;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();

  let [upload,] = useState({});

  const modalRef = useRef();
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e: { target: undefined; }) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);


  const handleImageChange = (_name: string) => (event: { target: { files: {}[]; }; }) => {
    upload = event.target.files[0];
    setValue("upload", upload as any);
  };

  const onSubmit = async (data: any) => {
    const testingRef = ref(storage, `testing folder/${data.upload.name}`)
    let url: string;
    console.log(data.upload.name)
    try {
      await uploadBytes(testingRef, data.upload).then(async () => {
        url = await getDownloadURL(testingRef);
        console.log(url);
      });
    } catch (err) {
      console.log("");

    }
  };
  return (
    <>
      {showModal ? (
        <Background onClick={closeModal} ref={modalRef} {...props}>
          <animated.div styled={animation} {...props}>
            <PageContainer showModal={showModal} {...props}>
              <FormWrap onSubmit={handleSubmit(onSubmit)}>
                <MainContainer>
                  <CloseButtonWrap>
                    <AiFillCloseCircle onClick={closeM} />
                  </CloseButtonWrap>
                  <CardText>Create Post</CardText>
                  <InputContainer>
                    <TitleInput
                      {...register("title", { required: true })}
                      placeholder="title"
                      type="text"
                      name="title"
                      {...props}
                    />
                    {errors.title && <span>Title is required</span>}
                    <CategorySecetion
                      {...register("category", { required: true })}
                    >
                      <CategoryOptions>
                        Please select a category
                      </CategoryOptions>
                      {categories?.map(
                        (
                          c: {
                            value:
                              | string
                              | number
                              | readonly string[]
                              | undefined;
                            name:
                              | boolean
                              | React.ReactChild
                              | React.ReactFragment
                              | React.ReactPortal
                              | null
                              | undefined;
                          },
                          id: string
                        ) => (
                          <CategoryOptions key={id} value={c.value}>
                            {c.name}
                          </CategoryOptions>
                        )
                      )}
                    </CategorySecetion>
                    {errors.category && <span>Category is required</span>}
                    <UploadWrapper>
                      <UploadLabel
                        {...props}
                        htmlFor="file-input"
                        name="body"
                      ></UploadLabel>
                      <UploadInput
                        {...props}
                        onChange={handleImageChange("upload")}
                        type="file"
                        name="upload"
                      />
                      {/* <Uploader onChange={handleUploader} /> */}
                    </UploadWrapper>
                    <BodyTextWrapper>
                      <BodyText
                        {...props}
                        {...register("body")}
                        placeholder="write something...."
                      ></BodyText>
                    </BodyTextWrapper>
                  </InputContainer>
                  <ButtonContainer>
                    <CloseButton onClick={closeM} {...props} type="button">
                      close
                    </CloseButton>
                    <SubmitButton type="submit">submit</SubmitButton>
                  </ButtonContainer>
                </MainContainer>
              </FormWrap>
            </PageContainer>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
};


export default Modal;
