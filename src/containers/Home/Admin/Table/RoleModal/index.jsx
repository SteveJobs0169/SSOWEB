import React, {useEffect, useState} from "react";
import {Col, Form, Input, message, Modal, Radio, Row, Select, Space, Tag} from "antd";
import {account, accountRole, role} from "../../../../../api/Home";
import {useCustomEffectHandler} from "../../../../../utils/customHook";

const App = (props) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    // 原始数据
    const [originalValue, setOriginalValue] = useState({});

    const handleOk = async () => {
        props.handleOk?.();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        props.handleCancel?.();
    };

    useEffect(() => {
        setIsModalOpen(props.modal.isModalOpen);
        setOriginalValue(props.modal.originalValue);
    }, [props.modal]);

    const [options, setOptions] = useState([]);

    useEffect(() => {
        role.get().then(res => {
            const {data} = res.data;
            setOptions(data);
        })
    }, []);

    useCustomEffectHandler(() => {
        accountRole.get({RYBH: originalValue.RYBH}).then(res => {
            const {data} = res.data;
            setValue(data.map(({JSDM}) => JSDM));
        })
    }, [originalValue.RYBH]);

    const [value, setValue] = useState([])

    const onSelect = (value, option) => {
        accountRole.post({RYBH: originalValue.RYBH, JSDM: value}).then(res => {
            setValue(i => ([...i, value]));
        })
    }

    function onDeselect(value, option) {
        accountRole.delete({RYBH: originalValue.RYBH, JSDM: value}).then(res => {
            setValue(i => i.filter(item => item !== value));
        })
    }

    return (
        <Modal title={props?.modal?.title || '新增数据'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            // width={1000}
            footer={[]}
        >
            <Space
                style={{
                    width: '100%',
                }}
                direction="vertical"
            >
                <Select
                    mode="multiple"
                    allowClear
                    style={{
                        width: '100%',
                    }}
                    fieldNames={{
                        label: 'JSMC',
                        value: 'JSDM',
                    }}
                    onSelect={onSelect}
                    onDeselect={onDeselect}
                    placeholder="选择角色"
                    value={value}
                    // defaultValue={['a10', 'c12']}
                    // onChange={handleChange}
                    options={options}
                />
            </Space>
        </Modal>
    )
}

export default App;