import { css } from "@emotion/react";
// padding: 15px
export const headerContainer = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 67px;
  border-bottom: 1px solid #ededed;
`;
export const headerDateMusic = css`
  display: flex;
  & > p {
    width: 230px;
    display: flex;
    align-items: center;
    padding: 15px 15px 15px 17px;
    font-size: 22px;
    font-weight: 600;
  }
`;
export const headerMusic = css``;
export const headerNoMusic = css`
  // margin-left: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > p {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 5px;
  }
  & > button {
    background-color: #d2e3fc;
    font-weight: 500;
    padding: 5px 10px;
    border-radius: 5px;
    &: hover {
      background-color: #9bbbea;
    }
  }
`;
export const headerContainerTool = css`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const headerToolEdit = css`
  background-image: url(https://www.music-flo.com/img/sp_button@2x.97bb1f02.png);
  background-size: 714px 706px;
  background-position: -597px -315px;
  width: 30px;
  height: 30px;
  margin-right: 4px;
  &: hover {
    background-color: #bdc1c6;
    border-radius: 50%;
  }
`;
export const headerToolDelete = css`
  background-image: url(https://www.music-flo.com/img/sp_button@2x.97bb1f02.png);
  background-size: 714px 706px;
  background-position: -450px -630px;
  width: 30px;
  height: 30px;
  &: hover {
    background-color: #bdc1c6;
    border-radius: 50%;
  }
`;
export const bodyContainer = css`
  height: 309px;
  padding: 15px;
  display: flex;
`;
export const bodyDiary = css`
  width: 50%;
  display: flex;
  flex-direction: column;
`;
export const diaryTitle = css`
  font-size: 18px;
  font-weight: 500;
  padding: 0 0 8px 4px;
`;
export const diaryContent = css`
  height: 100%;
  padding: 2px 2px 2px 4px;
  background-color: #eef2f7;
  border: 1px solid #e4e2e2;
  border-radius: 12px;
  word-break: break-all;
  line-height: 1.5;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    border-radius: 4px;
    background-color: #c4c4c4;
  }
`;
export const bodyAnalysis = css`
  width: 50%;
`;
