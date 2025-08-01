import { createStyles, css } from 'antd-style';

export const useStyles = createStyles(({ token }) => ({
  container: css`
    min-height: 100vh;
    background: linear-gradient(135deg, #ccccff, #a3a3cc);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  `,
  card: css`
    width: 100%;
    max-width: 420px;
    padding: 2.5rem 2rem;
    border-radius: 18px;
    background: #ffffffee;
    box-shadow: 0 12px 32px rgba(41, 41, 102, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(8px);
    text-align: center;
    transition: transform 0.2s ease;
    &:hover {
      transform: translateY(-2px);
    }
  `,
  title: css`
    margin-bottom: 1.5rem;
    font-weight: 700;
    font-size: 1.6rem;
    color: #292966;
  `,
  form: css`
    text-align: left;
    margin-top: 1rem;
  `,
  submitBtn: css`
    background-color: #292966;
    border-color: #292966;
    color: white;
    height: 42px;
    font-weight: 600;
    width: 100%;
    border-radius: 8px;
    &:hover {
      background-color: #5c5c99;
      border-color: #5c5c99;
    }
  `,
  footerText: css`
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: #5c5c99;
    a {
      color: #292966;
      font-weight: 500;
      &:hover {
        text-decoration: underline;
      }
    }
  `,
}));