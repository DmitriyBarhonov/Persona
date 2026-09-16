"use client";

import { Button as AntButton } from "antd";
import type { ButtonProps as AntButtonProps } from "antd";
import { forwardRef } from "react";

export type ButtonProps = AntButtonProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => <AntButton ref={ref} {...props} />,
);

Button.displayName = "Button";
