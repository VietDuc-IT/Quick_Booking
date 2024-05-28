import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/system/BreadCrumb';
import SearchTop from '~/components/system/SearchTop';
import { toast } from 'react-toastify';
import { Avatar, Checkbox, Dropdown, Table } from 'flowbite-react';
import { currentUser } from '~/redux/selectors';
import useAxiosPrivate from '~/hooks/useAxiosPrivate';

function Host() {
    const data = [];

    const handleRole = () => {};

    const handleDelete = () => {};

    return (
        <>
            <BreadCrumb pageName="Môi giới" />

            <div>
                <div class="relative overflow-x-auto">
                    <SearchTop />
                    <div className="overflow-x-auto">
                        <Table hoverable>
                            <Table.Head>
                                <Table.HeadCell className="p-4">
                                    <Checkbox />
                                </Table.HeadCell>
                                <Table.HeadCell>Tên & Email</Table.HeadCell>
                                <Table.HeadCell>Số điện thoại</Table.HeadCell>
                                <Table.HeadCell>Khu vực</Table.HeadCell>
                                <Table.HeadCell>Ngày tạo</Table.HeadCell>
                                <Table.HeadCell>
                                    <span className="sr-only">Action</span>
                                </Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y text-nowrap">
                                {data?.map((item) => (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="p-4">
                                            <Checkbox />
                                        </Table.Cell>
                                        <Table.Cell className="flex">
                                            <Avatar img={item.profilePicture} rounded>
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div>{item.username}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {item.email}
                                                    </div>
                                                </div>
                                            </Avatar>
                                        </Table.Cell>
                                        <Table.Cell>{item.phoneNumber && `0${item.phoneNumber}`}</Table.Cell>

                                        <Table.Cell>
                                            <div class="flex items-center">
                                                <div class="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Online
                                            </div>
                                        </Table.Cell>
                                        <Table.Cell>{new Date(item.createdAt).toLocaleDateString()}</Table.Cell>

                                        <Table.Cell>
                                            <Dropdown label="Cấp quyền" inline placement="bottom">
                                                <Dropdown.Item
                                                    onClick={() => handleRole({ id: item._id, role: 'Admin' })}
                                                >
                                                    Admin
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => handleRole({ id: item._id, role: 'User' })}
                                                >
                                                    User
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => handleRole({ id: item._id, role: 'Customer' })}
                                                >
                                                    Customer
                                                </Dropdown.Item>
                                            </Dropdown>
                                            {' / '}

                                            <button
                                                onClick={() => handleDelete(item._id)}
                                                class="font-medium text-red-500 dark:text-red-500 hover:underline"
                                            >
                                                Xóa
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Host;
