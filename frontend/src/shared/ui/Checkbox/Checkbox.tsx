"use client";

import { Checkbox as AntCheckbox } from "antd";
import type { CheckboxProps as AntCheckboxProps } from "antd";
import type { CheckboxRef } from "antd/es/checkbox";
import { forwardRef } from "react";

export type CheckboxProps = AntCheckboxProps;

export const Checkbox = forwardRef<CheckboxRef, CheckboxProps>((props, ref) => (
  <AntCheckbox ref={ref} {...props} />
));

Checkbox.displayName = "Checkbox";
