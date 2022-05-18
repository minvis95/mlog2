/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { calendarRangeState, diaryState } from "atoms/diary";
import Recommend from "components/modal/Recommend";
import LoadingSpinner from "components/LoadingSpinner";
import { createDiary } from "api/diaryApi";
import {
  modal,
  dimmed,
  container,
  formModal,
  itemOfFormModal,
  textboxTag,
} from "./style";

interface IWriteDiaryParams {
  queryParameter: { date?: string };
}

const WriteDiary = ({ queryParameter }: IWriteDiaryParams) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const setCalendarDiary = useSetRecoilState(calendarRangeState);
  const setDiary = useSetRecoilState(diaryState);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!queryParameter.date) {
      history.replace("/main");
    }
  }, []);

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const changeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const submitDiary = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (queryParameter.date) {
        setSubmitLoading(true);
        const { data } = await createDiary(queryParameter.date, {
          title,
          content,
        });
        setSubmitLoading(false);
        if (data.result) {
          setCalendarDiary({
            startDate: `${queryParameter.date.slice(0, 6)}01`,
            endDate: `${queryParameter.date.slice(0, 6)}32`,
          });
          setDiary({ date: queryParameter.date });
          setIsCompleted(true);
        } else {
          alert(data.data.diary);
        }
      }
    } catch (err) {
      alert("서비스를 이용하실 수 없습니다.");
    }
  };

  const closeWriteDiary = () => {
    history.replace(`/main?date=${queryParameter.date}`);
  };

  return (
    <>
      {!isCompleted ? (
        <div css={modal}>
          <div css={dimmed}></div>
          <div css={container}>
            <form onSubmit={submitDiary} css={formModal}>
              <svg
                width="16px"
                height="12px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
                onClick={closeWriteDiary}
              >
                <path
                  fill="#3E4042"
                  fillRule="evenodd"
                  d="M.203.203c.27-.27.708-.27.979 0L6 5.02 10.818.203c.27-.27.709-.27.98 0 .27.27.27.708 0 .979L6.978 6l4.818 4.818c.27.27.27.709 0 .98-.27.27-.709.27-.979 0L6 6.978l-4.818 4.818c-.27.27-.709.27-.98 0-.27-.27-.27-.709 0-.979L5.022 6 .203 1.182c-.27-.27-.27-.709 0-.98z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div css={itemOfFormModal}>
                <p>
                  {queryParameter.date?.slice(0, 4)}년{" "}
                  {queryParameter.date?.slice(4, 6)}월{" "}
                  {queryParameter.date?.slice(6)}일
                </p>
              </div>
              <div css={itemOfFormModal}>
                <input
                  placeholder="제목"
                  onChange={changeTitle}
                  spellCheck="false"
                />
              </div>
              <div css={itemOfFormModal}>
                <textarea
                  css={textboxTag}
                  aria-multiline="true"
                  spellCheck="false"
                  onChange={changeContent}
                ></textarea>
              </div>
              <button>기록하기</button>
            </form>
            {submitLoading ? <LoadingSpinner /> : null}
          </div>
        </div>
      ) : (
        <Recommend date={queryParameter.date as string} />
      )}
    </>
  );
};

export default WriteDiary;
