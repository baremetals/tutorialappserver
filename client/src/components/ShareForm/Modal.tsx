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
  Select,
  CategoryOptions,
  // BodyText,
  ButtonContainer,
  // UploadWrapper,
  // UploadLabel,
  BodyTextWrapper,
  // UploadInput,
  SubmitButton,
  CloseButton,
  Background,
  EditorBodyText,
} from "./modal.styles";
import { AiFillCloseCircle } from "react-icons/ai";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { storage } from "lib/admin"
import { useCategoryQuery, useCreatePostMutation } from "generated/graphql";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { setCategory } from "features/ui/reducers";
import { isUser } from 'features/auth';
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import ModalEditor from "./ModalEditor";




type FormInput = {
  title: string
  category: string;
  body: string;
  upload?: any;
};


export const Modal = ({ closeM, showModal, setShowModal, ...props }: any) => {
  const dispatch = useAppDispatch();
  const [post] = useCreatePostMutation();
  const { data } = useCategoryQuery();
  const { user: user } = useAppSelector(isUser);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [content, setContent] = useState<string>("");
  dispatch(setCategory(data?.getAllCategories));
  console.log(user?.id);
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


  // const handleImageChange = (_name: string) => (event: { target: { files: {}[]; }; }) => {
  //   upload = event.target.files[0];
  //   setValue("upload", upload as any);
  // };


  const onSubmit = async (info: FormInput) => {
    setShowModal(false);
    console.log(info);
    const testingRef = ref(storage, `testing folder/${info.upload.name}`) || null;
    let url: string;
    console.log(info.upload.name);
    try {
      await uploadBytes(testingRef, info?.upload).then(async () => {
        url = await getDownloadURL(testingRef) || "";
        const response = post({
          variables: {
            userId: user?.id as string,
            categoryName: info.category,
            title: info.title,
            body: info.body || url,
            postType: "",
          },
        });
        console.log(response);
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
                    <Select {...register("category", { required: true })}>
                      <CategoryOptions>
                        Please select a category
                      </CategoryOptions>
                      {categories?.map(
                        (c: { value: string; name: string; id: string }) => (
                          <CategoryOptions key={c.id} value={c.value}>
                            {c.name}
                          </CategoryOptions>
                        )
                      )}
                    </Select>
                    {errors.category && <span>Category is required</span>}
                    {/* <UploadWrapper>
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
                    </UploadWrapper> */}
                    <BodyTextWrapper>
                      {/* <BodyText
                        {...props}
                        {...register("body")}
                        placeholder="write something...."
                      ></BodyText> */}
                      <ModalEditor
                        editorState={editorState}
                        onEditorStateChange={(newState: EditorState) => {
                          setEditorState(newState);
                          setContent(
                            draftToHtml(
                              convertToRaw(newState.getCurrentContent())
                            )
                          );
                          setValue("body", content);
                        }}
                      />
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
