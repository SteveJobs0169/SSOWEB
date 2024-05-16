import React, {useEffect, useState} from "react";
import {Col, Form, Input, message, Modal, Radio, Row} from "antd";
import {account} from "../../../../../api/Home";

const App = (props) => {

    // Form
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // 原始数据
    const [originalValue, setOriginalValue] = useState({});

    const handleOk = async () => {
        const val = await form.validateFields();
        const values = {...originalValue, ...val};

        if (props.modal.type === 'add') {
            // 新增
            const res = await account.post(values);
            const {code, msg} = res.data;
            if (code === 200) {
                message.success(msg);
            }
        } else if (props.modal.type === 'edit') {
            const res = await account.put(values, props.modal.originalValue.RYBH);
            const {code, msg} = res.data;
            if (code === 200) {
                message.success(msg);
            }
        }

        props.handleOk?.(values, form);
    };

    const handleCancel = () => {
        // setIsModalOpen(false);
        props.handleCancel?.(form.getFieldsValue(), form);
    };

    useEffect(() => {
        setIsModalOpen(props.modal.isModalOpen);
        setOriginalValue(props.modal.originalValue);
    }, [props.modal]);

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(originalValue);
    }, [form, originalValue])

    const requiredStyle = [{
        required: true,
        message: '${label}是必填项!',
    }]

    return(
        <Modal title={props?.modal?.title || '新增数据'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
               // width={1000}
        >
            <Form form={form}
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 18,
            }}
            >
                <Row gutter={12}>
                    <Col className="gutter-row" span={24}>
                        <Form.Item
                            name='RYZH'
                            label='账户'
                            rules={requiredStyle}
                        >
                            <Input type='text' disabled={props.modal.type==='edit'}/>
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={24}>
                        <Form.Item
                            name='RYXM'
                            label='姓名'
                            rules={requiredStyle}
                        >
                            <Input type='text' />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={24}>
                        <Form.Item
                            name='ZHZT'
                            label='状态'
                            rules={requiredStyle}
                        >
                            <Radio.Group onChange={() => {
                            }} value={1}>
                                <Radio value={'ZC'}>正常</Radio>
                                <Radio value={'YC'}>异常</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default App;