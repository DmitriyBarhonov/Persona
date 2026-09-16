"use client";

import { Input as AntInput } from "antd";
import type { PasswordProps } from "antd/es/input";
import { forwardRef } from "react";
import type { InputRef } from "antd/es/input";

export type PasswordInputProps = PasswordProps;

export const PasswordInput = forwardRef<InputRef, PasswordInputProps>(
  (props, ref) => <AntInput.Password ref={ref} {...props} />,
);

PasswordInput.displayName = "PasswordInput";
