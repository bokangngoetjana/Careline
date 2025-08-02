'use client';

import { createStyles } from 'antd-style';

export const useStyles = createStyles(({ css }) => ({
  layout: css`
    min-height: 100vh;
  `,
  sider: css`
    background: #001529;
  `,
  logo: css`
    height: 64px;
    margin: 16px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    line-height: 64px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
  `,
  header: css`
    background: #7c5cff;
    padding: 0 24px;
    display: flex;
    align-items: center;
  `,
  content: css`
    margin: 24px;
  `,
  card: css`
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  `,
}));
