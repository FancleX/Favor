export type FormEntity = {
    label: string,
    isOptional: boolean,
    autoSize: boolean,
    type: FormType,
}

export enum FormType {
    Normal,
    Email,
    Address,
    Currency,
    Date,
    Phone,
    CategorySelect,
}
