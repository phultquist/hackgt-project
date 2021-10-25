import { useState } from "react";


export default function History({ problemHistory }) {
    return (
        <div className="">
            <div className="mb-6">
                <h1 className='text-3xl font-bold'>History</h1>
            </div>
            <div className="flex flex-col overflow-x-scroll py-2">
                {/* <div className="-my-2 sm:-mx-6 lg:-mx-8"> */}
                <div className="">
                    {/* <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 overflow-hidden"> */}
                    <div className="py-2 align-middle inline-block min-w-full overflow-hidden">
                        <div className="border border-gray-200 sm:rounded-lg overflow-hidden">
                            {/* <table className="min-w-full divide-y divide-gray-200"> */}
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Store
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Product
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Description
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            User
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {problemHistory.map((problem) => <Row problem={problem} key={problem.itemCode + problem.reportIndex} />)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Row({ problem }) {
    let possibleStatuses = ["broken", "fixed", "service"];
    const [status, setStatus] = useState(problem.status);
    return (
        <tr key={problem.date}>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="">
                    <div className="text-sm font-medium text-gray-900">{problem.siteInfo.name}</div>
                    <div className="text-sm text-gray-500">{problem.siteInfo.address}</div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{problem.itemName}</div>
                <div className="text-sm text-gray-500">{problem.itemCode}</div>
            </td>
            <td className="px-6 py-4 whitespace-normal">
                <div className="text-xs text-gray-500">{problem.description}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <Tag status={toTitleCase(status)} onClick={() => {
                    const newStatus = possibleStatuses[(possibleStatuses.indexOf(status) + 1) % possibleStatuses.length];
                    setStatus(newStatus);
                    try {
                        fetch(
                            `${process.env.SERVER_HOST}/update-status`,
                            {
                                body: JSON.stringify({
                                    itemCode: problem.itemCode,
                                    newStatus: newStatus,
                                    reportIndex: problem.reportIndex
                                }),
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                method: 'PUT'
                            }
                        )
                    } catch (e) {
                        console.log(e);
                        alert("Something went wrong")
                    }
                }} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{problem.email}</td>
        </tr>
    )
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function Tag({ status, onClick }) {
    let color = "green"
    switch (status.toLowerCase()) {
        case "broken":
            color = "red";
            break;
        case "fixed":
            color = "green";
            break;
        case "service":
            color = "yellow";
            break;
        default:
            color = "green";
    }

    return (
        <div onClick={onClick}>
            <span className={`cursor-pointer px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-${color}-100 text-${color}-800`}>
                {status}
            </span>
        </div>
    )
}

export async function getServerSideProps() {
    const problemHistoryRes = await fetch(`${process.env.SERVER_HOST}/history`);
    const problemHistory = await problemHistoryRes.json();

    return {
        props: {
            problemHistory
        }
    }
}