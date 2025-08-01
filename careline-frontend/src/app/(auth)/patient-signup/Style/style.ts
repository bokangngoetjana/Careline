'use client';

import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ token, css }) => {
  return {
    container: css`
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #f8faff, #eef1f6);
      position: relative;
      overflow: hidden;
    `,

    decorativeCircle: css`
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.3;
      z-index: 0;
    `,

    circleTopLeft: css`
      width: 300px;
      height: 300px;
      top: -100px;
      left: -100px;
      background: #9b8aff;
    `,

    circleBottomRight: css`
      width: 300px;
      height: 300px;
      bottom: -100px;
      right: -100px;
      background: #7c5cff;
    `,

    formWrapper: css`
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      width: 100%;
      max-width: 420px;
      z-index: 1;
      position: relative;
    `,

    brandName: css`
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      color: #7c5cff;
      margin-bottom: 8px;
    `,

    title: css`
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      color: #444;
      margin-bottom: 24px;
    `,

    formItem: css`
      margin-bottom: 20px !important;
    `,

    input: css`
      padding: 10px 12px;
      border-radius: 10px !important;
    `,

    submitButton: css`
      width: 100%;
      background-color: #7c5cff;
      border-color: #7c5cff;
      padding: 10px 0;
      font-weight: bold;
      border-radius: 10px;
      transition: all 0.3s ease;

      &:hover {
        background-color: #6245cc !important;
        border-color: #6245cc !important;
      }
    `,

    linkText: css`
      display: block;
      text-align: center;
      margin-top: 10px;
      font-size: 14px;
      color: #7c5cff;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    `
  };
});
