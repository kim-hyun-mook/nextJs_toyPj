// app/components/Button.tsx
/// <reference types="next/image-types/global" />
'use client';
import styled, { css } from 'styled-components';
import CloseBtnImage from '../../public/images/CloseBtn.png'; // 이미지 경로 수정



// 타입 정의
type ButtonProps = {
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  variant?: 'solid' | 'outlined' | 'dashed' | 'text' | 'link';
  children?: React.ReactNode;
  onClick?: () => void; // onClick 핸들러 추가
  isCloseBtn?: boolean; // CloseBtn 여부 확인
};

const Button = ({
  color = 'primary',
  variant = 'solid',
  children,
  onClick,
  isCloseBtn = false,
}: ButtonProps) => {
  if (isCloseBtn) {
    return <StyledCloseBtn onClick={onClick} />;
  }

  return (
    <StyledButton color={(color as keyof typeof COLORS)} variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

// 미리 정의된 색상 팔레트
const COLORS = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
  light: '#f8f9fa',
  dark: '#343a40',
};

const StyledButton = styled.button<ButtonProps>`
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  ${({ color, variant }) => {
    const bgColor = COLORS[color || 'primary'];
    const textColor = color === 'light' ? '#000' : '#fff';

    return css`
      ${variant === 'solid' &&
      css`
        background-color: ${bgColor};
        color: ${textColor};
        border: none;
      `}

      ${variant === 'outlined' &&
      css`
        background-color: transparent;
        color: ${bgColor};
        border: 2px solid ${bgColor};
      `}

      ${variant === 'dashed' &&
      css`
        background-color: transparent;
        color: ${bgColor};
        border: 2px dashed ${bgColor};
      `}

      ${variant === 'text' &&
      css`
        background-color: transparent;
        color: ${bgColor};
        border: none;
      `}

      ${variant === 'link' &&
      css`
        background-color: transparent;
        color: ${bgColor};
        border: none;
        text-decoration: underline;
      `}
    `;
  }}

  &:hover {
    opacity: 0.85;
  }

  &:active {
    opacity: 0.75;
    transform: scale(0.98);
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #a0a0a0;
    cursor: not-allowed;
  }
`;

// CloseBtn 스타일링
const StyledCloseBtn = styled.button`
  width: 30px;
  height: 30px;
  background: url(/images/CloseBtn.png) #fff no-repeat;
  background-size: 30px;
  cursor: pointer;
  border: none;
  display: block;
  position: absolute;
  top: -12px;
  right: -12px;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export default Button;
