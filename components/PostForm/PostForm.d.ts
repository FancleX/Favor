export type FormEntity = {
    label: string,
    hideFromUser: boolean,
    isOptional: boolean,
    autoSize: boolean,
    type: FormType,
    verification(context: Verification<T>): void,
    onError(message: string): void,
}

export enum FormType {
    Normal,
    Email,
    Password,
    Address,
    Currency,
    Date,
    Phone,
    CategorySelect,
}

export interface Verification<T extends RootVerification> {
    context: T
}

export interface RootVerification { }

export interface GeneralVerification extends RootVerification {
    content: string
}

export interface AddressVerification extends RootVerification {
    street: string,
    unit: ?string,
    city: string,
    state: string,
    zip: string
}

export interface DateVerification extends RootVerification {
    date: Date
}
