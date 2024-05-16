import React, {useEffect, useState} from 'react';
import {Button, message, Popconfirm, Table, Tag} from "antd";
import {connect} from "react-redux";
import Modal from './Modal';
import TableTop from "../../../../components/TableTop";
import {account} from "../../../../api/Home";
import {useCustomEffectHandler} from "../../../../utils/customHook";
import RoleModal from "./RoleModal";

const App = (props) => {

    const columns = [
        {
            title: '序号',
            dataIndex: 'RYBH',
            key: 'RYBH',
            align: 'center',
        },
        {
            title: '账号',
            dataIndex: 'RYZH',
            key: 'RYZH',
            align: 'center',
        },
        {
            title: '姓名',
            dataIndex: 'RYXM',
            key: 'RYXM',
            align: 'center',
        },
        {
            title: '角色',
            dataIndex: 'JS',
            key: 'JS',
            align: 'center',
        },
        {
            title: '最后登录时间',
            dataIndex: 'ZHDLSJ',
            key: 'ZHDLSJ',
            align: 'center',
        },
        {
            title: '登录次数',
            dataIndex: 'ZHDLSJ',
            key: 'ZHDLSJ',
            align: 'center',
        },
        {
            title: '状态',
            dataIndex: 'ZHZT',
            key: 'ZHZT',
            align: 'center',
            render: (_) => (
                {
                    'ZC': <Tag color="green">正常</Tag>,
                    'YC': <Tag color="red">异常</Tag>
                }[_] || <Tag color="blue">{_}</Tag>
            )
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => edit(record)}>
                        编辑
                    </Button>
                    <Button type="link" onClick={() => editRole(record)}>
                        编辑角色
                    </Button>
                    <Popconfirm title="确认删除?" onConfirm={() => del(record.RYBH)}>
                        <Button type="link" danger>
                            删除
                        </Button>
                    </Popconfirm>
                </>
            )
        }
    ]

    const [data, setData] = useState([])

    function edit(data) {
        setModal(i => ({
            ...i,
            title: '修改数据',
            type: 'edit',
            isModalOpen: true,
            originalValue: data,
        }))
    }

    async function del(id) {
        const res = await account.delete({}, id);
        const {code, msg} = res.data;
        if (code === 200) {
            message.success(msg);
        }
        accountGet({...props.tableSearch, page: pagination.current, pageSize: pagination.pageSize});
    }

    //modal
    const openModal = () => setModal(i => ({
        ...i,
        title: '新增数据',
        isModalOpen: true,
        type: 'add',
        originalValue: {
            ZHZT: "ZC"
        },
    }))

    const closeModal = () => setModal(i => ({
        ...i,
        isModalOpen: false,
    }))

    const handleOk = async () => {
        await accountGet({...props.tableSearch, page: pagination.current, pageSize: pagination.pageSize});
        closeModal();
    }

    const [modal, setModal] = useState({
        title: '',
        isModalOpen: false,
        type: '',
        originalValue: {},
    })

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        pageSizeOptions: [1, 2, 5, 10, 20, 50, 100, 99999],
        showLessItems: true,
        showQuickJumper: true,
        showSizeChanger: true,
        showTotal: (total) => `总数：${total} 条`,
        onChange: (page, pageSize) => setPagination(i => ({...i, current: page, pageSize: pageSize})),
        total: 0,
    })

    useCustomEffectHandler(() => {
        if(pagination.current === 1) {
            accountGet({...props.tableSearch, page: pagination.current, pageSize: pagination.pageSize});
        }else {
            setPagination(i => ({...i, current: 1}))
        }
        // setPagination(i => ({...i, current: 1, pageSize: 10}))
    }, [props.tableSearch])

    useEffect(() => {
        accountGet({...props.tableSearch, page: pagination.current, pageSize: pagination.pageSize});
    }, [pagination.current, pagination.pageSize]);

    function accountGet(params) {
        account.get(params).then(res => {
            const {data, total} = res.data;
            setData(data)
            setPagination(i => ({...i, total}))
        })
    }

    const [roleModal, setRoleModal] = useState({
        title: '',
        isModalOpen: false,
        type: '',
        originalValue: {},
    })

    async function roleCloseModal () {
        setRoleModal(i => ({
            ...i,
            isModalOpen: false,
        }))
        await accountGet({...props.tableSearch, page: pagination.current, pageSize: pagination.pageSize});
    }

    function editRole(data) {
        setRoleModal(i => ({
            ...i,
            title: '修改数据',
            type: 'edit',
            isModalOpen: true,
            originalValue: data,
        }))
    }

    return (
        <>
            <TableTop>
                <>
                    <Button type="primary" onClick={openModal}>
                        新增
                    </Button>
                </>
            </TableTop>
            <Table dataSource={data} columns={columns} rowKey={({RYBH}) => RYBH}
                   bordered
                   pagination={pagination}
            />
            <Modal modal={modal} handleOk={handleOk} handleCancel={closeModal}/>
            <RoleModal modal={roleModal} handleCancel={roleCloseModal}/>
        </>
    );
};

export default connect(
    state => ({
        tableSearch: state.tableSearch,
    }),
    {}
)(App)
