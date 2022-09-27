export interface ISchema {
  label: string;
  name: string;
  initialValues?: { [key: string]: any };
  metadata?: { name: string; label: string }[];
  elements: any[];
  validation?: boolean;
}
