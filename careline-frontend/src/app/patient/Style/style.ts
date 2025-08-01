import { createStyles, css } from "antd-style";

export const useStyles = createStyles(({ token }) => ({
  card: css`
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    padding: 1rem;
  `,
  checkInButton: css`
    background-color: #292966;
    border-color: #292966;
    &:hover {
      background-color: #5c5c99 !important;
      border-color: #5c5c99 !important;
    }
  `,
}));
