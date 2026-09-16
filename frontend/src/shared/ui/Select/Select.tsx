"use client";

import { Select as AntSelect } from "antd";
import type { SelectProps as AntSelectProps } from "antd";

export type SelectProps<ValueType = unknown> = AntSelectProps<ValueType>;

export const Select = <ValueType,>(props: SelectProps<ValueType>) => (
  <AntSelect {...props} />
);
