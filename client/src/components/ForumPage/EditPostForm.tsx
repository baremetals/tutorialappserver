import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
// import { useRouter } from "next/router";

import { useAppSelector } from "app/hooks";
import { isUser } from "features/auth";
// import { setCategory } from "features/ui/reducers";

import {
  useCategoryQuery,
  useEditPostMutation,
} from "generated/graphql";

import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";

const ModalEditor = dynamic(
  () => import("../ShareForm/ModalEditor"),
  {
    ssr: false,
  }
);
import Modal from "components/ShareForm/Modal";

// import htmlToDraft from "html-to-draftjs";
// const htmlToDraft = dynamic(() => import("html-to-draftjs"), {ssr: false});

import { AiFillCloseCircle } from "react-icons/ai";

import {
  CloseButtonWrap,
  CardText,
  InputContainer,
  FormWrap,
  MainContainer,
  TitleInput,
  Select,
  CategoryOptions,
  ButtonContainer,
  BodyTextWrapper,
  SubmitButton,
  CloseButton,
  InputFormGroupRow,
  InputFormGroup,
} from "../ShareForm/modal.styles";
import { FormInput } from "./PostForm"
import { ErrorMsg, SuccessMsg } from 'components/Input';


type editPostType = {
  closeM: any;
  showModal: any;
  setShowModal: any;
//   form: FormInput;
    title: string;
    category: string;
    body: string;
    id: string;
};

const EditPostForm = ({ ...props }: editPostType) =>
  //   { title, category, body, id }: FormInput
  {
    const { data } = useCategoryQuery();

    const [editPost] = useEditPostMutation();
    const { user: user } = useAppSelector(isUser);

    const categories = data?.getAllCategories as any;
    //   dispatch(setCategory(data?.getAllCategories));

    const { closeM, showModal, setShowModal, title, category, body, id } =
      props;
    

    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<FormInput>();

    const [msg, setMsg] = useState("");
    const [success, setSuccess] = useState(false)
     const [error, setError] = useState(false);
    const [content, setContent] = useState<string>(body);
    // const blocksFromHtml = htmlToDraft(content);
    // const { contentBlocks, entityMap } = blocksFromHtml;
    // const contentState = ContentState.createFromBlockArray(
    //   contentBlocks,
    //   entityMap
    // );

    const [editorState, setEditorState] = useState<EditorState>(
      EditorState.createEmpty(),
      // EditorState.createWithContent(contentState)
    );

    const onEditSubmit = async (info: FormInput) => {
    //   console.log(info);
      //   props.setShowModal(false);

        const res = await editPost({
          variables: {
            id: id as string,
            categoryName: category ? category : info.category,
            title: title ? title : info.title,
            body: body ? body : info.body,
          },
        });
        const message = res?.data?.editPost?.messages![0] as string;
        setMsg(message);
        if (res?.data?.editPost?.messages![0].includes("successfully.")) {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
            setShowModal(false);
          }, 5000);
        } else {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 5000);
        }
    };
    return (
      <Modal
        showModal={showModal}
        closeM={() => setShowModal(false)}
        setShowModal={setShowModal}
      >
        <FormWrap onSubmit={handleSubmit(onEditSubmit)}>
          <MainContainer>
            <CloseButtonWrap>
              <AiFillCloseCircle onClick={closeM} />
            </CloseButtonWrap>
            <CardText>Edit Post</CardText>
            {success && <SuccessMsg>{msg}</SuccessMsg>}
            {error && <ErrorMsg>{msg}</ErrorMsg>}
            <InputContainer>
              <InputFormGroupRow>
                <InputFormGroup>
                  <TitleInput
                    {...register("title", { required: true })}
                    placeholder="title"
                    type="text"
                    defaultValue={title}
                    name="title"
                    // {...props}
                  />
                  {errors.title && <span>Title is required</span>}
                </InputFormGroup>
                <InputFormGroup>
                  <Select {...register("category", { required: true })}>
                    <CategoryOptions>{category}</CategoryOptions>
                    {categories?.map(
                      (c: { value: string; name: string; id: string }) => (
                        <CategoryOptions
                          key={c.id}
                          defaultValue={category}
                          value={c.value}
                        >
                          {c.name}
                        </CategoryOptions>
                      )
                    )}
                  </Select>
                  {errors.category && <span>Category is required</span>}
                </InputFormGroup>
              </InputFormGroupRow>

              <BodyTextWrapper>
                <ModalEditor
                  id={user?.id}
                  editorState={editorState}
                  onEditorStateChange={(newState: EditorState) => {
                    setEditorState(newState);
                    setContent(
                      draftToHtml(convertToRaw(newState.getCurrentContent()))
                    );
                    // editorState =
                    //   EditorState.createWithContent(contentState);
                    setValue("body", content);
                  }}
                />
              </BodyTextWrapper>
            </InputContainer>
            <ButtonContainer>
              <CloseButton onClick={props.closeM} {...props} type="button">
                close
              </CloseButton>
              <SubmitButton type="submit">submit</SubmitButton>
            </ButtonContainer>
          </MainContainer>
        </FormWrap>
      </Modal>
    );
  };

export default EditPostForm
