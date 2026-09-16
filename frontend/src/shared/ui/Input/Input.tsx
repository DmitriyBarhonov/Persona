"use client";

import { Input as AntInput } from "antd";
import type { InputProps as AntInputProps, InputRef } from "antd/es/input";
import { forwardRef } from "react";

export type InputProps = AntInputProps;

export const Input = forwardRef<InputRef, InputProps>((props, ref) => (
  <AntInput ref={ref} {...props} />
));

Input.displayName = "Input";
