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
};

export type ExpenseGroupCardProps = {
    expenseGroupName: string,
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

export type ModalPopupInputProps = {
    open: boolean,
    onClose: MouseEventHandler<HTMLButtonElement>,
    headerText: string,
    content: any
}