import { getById } from '@/db/DALs/expenseGroupsDAL';
import { headers } from 'next/headers'
import { Types } from "mongoose";
import TransactionsNonSSR from './TransacationsNonSSR';

export default async function TransactionsPage({ params }: { params: { expenseGroupId: string } }) {
    
    let userHasAccess = false;

    const { expenseGroupId } = params;

    const headerList = headers();
    const userDataString = headerList.get("userData");

    let userId;
    if (userDataString) {
        const userData = JSON.parse(userDataString);
        userId = userData._id
    }

    // check if the logged in user has access to this expense group (either by being admin or one of the 'otherUsers')
    if (expenseGroupId && userId) {
        const expenseGroup = await getById(expenseGroupId);

        if (expenseGroup) {
            let usersInExpenseGroup = [];

            expenseGroup.otherUsers.forEach((userIdObj: Types.ObjectId) => {
                usersInExpenseGroup.push(userIdObj.toString());
            });

            usersInExpenseGroup.push(expenseGroup.admin.toString());

            userHasAccess = usersInExpenseGroup.includes(userId);
            
        }
    }

    if (userHasAccess)
    {
        return <TransactionsNonSSR expenseGroupId={expenseGroupId} />
    }
    else
    {
        return <div>You do not have access to this expense group&apos;s transactions</div>;
    }
}
