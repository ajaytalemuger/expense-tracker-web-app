import { MouseEventHandler } from "react";

export type ExpenseGroupClient = {
    _id: string,
    admin: string,
    name: string,
    description: string,
    otherUsers: Array<string>,
    createdBy: string,
    createdAt: string,
    updatedAt: string,
    totalTransactionAmount?: number,
};

export type TransactionClient = {
    _id?: string,
    expenseGroup: string,
    name: string,
    description: string,
    amount: number,
    type: string,
    currency: string,
    date: string,
    categories: Array<string>,
    paymentMode: string,
    createdBy?: string,
    createdAt?: Date,
    updatedAt?: Date,
};

export type ExpenseGroupCardProps = {
    expenseGroup: ExpenseGroupClient,
    onSelect: MouseEventHandler<HTMLDivElement>,
    onEdit: MouseEventHandler<HTMLButtonElement>,
    onDelete: MouseEventHandler<HTMLButtonElement>,
    disableEdit: boolean,
    disableDelete: boolean,
};

export type UserDataState = {
    userId: string,
    userEmail: string,
    userName: string,
};

export type ExpenseGroupCreationModalProps = {
    open: boolean,
    onClose: MouseEventHandler<HTMLButtonElement>,
    onCreate: Function,
};

export type ExpenseGroupEditModalProps = {
    open: boolean,
    onClose: MouseEventHandler<HTMLButtonElement>,
    onEdit: Function,
    expenseGroup: ExpenseGroupClient,
};

export type ExpenseGroupState = {
    name: string,
    description: string,
    otherUsers: Array<string>,
};

export type FormatInputProps = {
    id: string,
    placeholder: string,
    type: string,
    value: any,
    onChange: Function,
    error?: boolean,
    className?: string,
};

export type LabelledFormatInputProps = {
    id: string,
    label: string,
    placeholder: string,
    type: string,
    value: any,
    onChange: Function,
    error?: boolean,
    className?: string,
    inputClassName?: string,
    labelClassName?: string,
    min?: number,
};

export type LabelledDropdownProps = {
    id: string,
    label: string,
    options: Array<any>,
    value: any,
    onChange: Function,
    error?: boolean,
    className?: string,
    inputClassName?: string,
};

export type ModalPopupInputProps = {
    open: boolean,
    onClose: MouseEventHandler<HTMLButtonElement>,
    headerText: string,
    content: any,
    className?: string,
}

export type TransactionListProps = {
    transactions: Array<TransactionClient>
    onEdit: Function,
    onDelete: Function,
};

export type TransacationsNonSSRProps = {
    expenseGroupId: string;
};

export type DeleteConfirmationModalProps = {
    open: boolean,
    onClose: MouseEventHandler<HTMLButtonElement>,
    onDeleteClick: MouseEventHandler<HTMLButtonElement>,
    className?: string,
};

export type TransactionCreatonModalProps = {
    open: boolean,
    onClose: Function,
    onCreate: Function,
    expenseGroupId: string,
};

export type TransactionEditModalProps = {
    open: boolean,
    onClose: Function,
    onEdit: Function,
    transaction: TransactionClient,
};

export type TransactionState = {
    name: string,
    description: string,
    amount: number,
    type: string,
    currency: string,
    date: string,
    categories: Array<string>,
    paymentMode: string,
    expenseGroup?: string,
};

export type MultipleInputSelectorProps = {
    values: Array<string>,
    onChange: Function,
    label: string,
    addNewValuePopupText: string,
    value: any,
    className?: string,
    inputClassName?: string,
    labelClassName?: string,
};

export type DateTimePickerProps = {
    value: any,
    label: string,
    onChange: Function,
    className?: string,
    labelClassName?: string,
};

export type Transaction = {
    expenseGroup: string,
    name: string,
    description: string,
    amount: number,
    type: string,
    currency: string,
    date: Date,
    category: Array<string>,
    paymentMode: string,
    createBy: string,
    updatedBy?: string,
};

export type ExpenseGroup = {
    admin: string,
    name: string,
    description: string,
    otherUsers: Array<string>,
    createdBy?: string,
    updatedBy?: string,
};

export type User = {
    name: String,
    email: String,
    pwd: String,
};