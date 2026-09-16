"use client";

import { Table as AntTable } from "antd";
import type { TableProps as AntTableProps } from "antd";

export type TableProps<RecordType extends object = Record<string, unknown>> =
  AntTableProps<RecordType>;

export const Table = <RecordType extends object = Record<string, unknown>>(
  props: TableProps<RecordType>,
) => <AntTable {...props} />;
