import { createStyles, css } from 'antd-style';

export const useStyles = createStyles(() => ({
  container: css`
    min-height: 100vh;
    display: flex;
    background: linear-gradient(135deg, #00D4FF, #090979);
  `,
  leftPane: css`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4rem;
    color: white;
    background: transparent;

    h1 {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.2rem;
      line-height: 1.8;
      max-width: 480px;
    }
  `,
  rightPane: css`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem;
    background-color: rgba(255, 255, 255, 0.97);
  `,
  formWrapper: css`
    width: 100%;
    max-width: 480px;
  `,
  title: css`
    margin-bottom: 2rem;
    font-weight: 700;
    font-size: 2rem;
    color: #292966;
    text-align: center;
  `,
  form: css`
    margin-top: 1rem;
  `,
  submitBtn: css`
    background-color: #292966;
    border-color: #292966;
    color: white;
    height: 48px;
    font-weight: 600;
    width: 100%;
    border-radius: 8px;
    margin-top: 1rem;

    &:hover {
      background-color: #5c5c99;
      border-color: #5c5c99;
    }
  `,
  footerText: css`
    margin-top: 2rem;
    font-size: 0.95rem;
    color: #5c5c99;
    text-align: center;

    a {
      color: #292966;
      font-weight: 500;
      &:hover {
        text-decoration: underline;
      }
    }
  `,
}));
