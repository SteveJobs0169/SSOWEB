import React, {useEffect, useState} from "react";
import {Col, Form, Input, message, Modal, Radio, Row} from "antd";
import {get_web_key, web} from "../../../../../api/Home";
import TextArea from "antd/es/input/TextArea";
import {useCustomEffectHandler} from "../../../../../utils/customHook";
import Search from "antd/es/input/Search";

const App = (props) => {

    // Form
    const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // 原始数据
    const [originalValue, setOriginalValue] = useState({});

    const [MY, setMY] = useState('');

    const handleOk = async () => {
        const val = await form.validateFields();
        const values = {...originalValue, ...val, MY};

        if (props.modal.type === 'add') {
            // 新增
            const res = await web.post(values);
            const {code, msg} = res.data;
            if (code === 200) {
                message.success(msg);
            }
        } else if (props.modal.type === 'edit') {
            console.log(props.modal.originalValue)
            const res = await web.put(values, props.modal.originalValue.ID);
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

    useCustomEffectHandler(() => {
        if (props.modal.type === 'add' && props.modal.isModalOpen) {
            get_web_key().then(res => {
                const key = res.data.key;
                setMY(key);
                form.setFieldsValue({
                    MY: key,
                })
            })
        }
    }, [props.modal]);


    return (
        <Modal title={props?.modal?.title || '新增数据'} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
            // width={1000}
        >
            <Form form={form}
                  labelCol={{
                      span: 6,
                  }}
                  wrapperCol={{
                      span: 24,
                  }}
            >
                <Row gutter={12}>
                    <Col className="gutter-row" span={24}>
                        <Form.Item
                            name='WZMC'
                            label='网站名称'
                            rules={requiredStyle}
                        >
                            <Input type='text'
                                // disabled={props.modal.type==='edit'}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={24}>
                        <Form.Item
                            name='WZDM'
                            label='网站代码'
                            rules={requiredStyle}
                        >
                            <Input type='text'
                                // disabled={props.modal.type==='edit'}
                            />
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={24}>
                        <Form.Item
                            name='IP'
                            label='IP'
                            rules={requiredStyle}
                        >
                            <Input type='text'
                                // disabled={props.modal.type==='edit'}
                            />
                        </Form.Item>
                    </Col>
                    {props.modal.type==='add' &&
                        <Col className="gutter-row" span={24}>
                            <Form.Item
                                name='MY'
                                label='MY'
                                rules={requiredStyle}
                            >
                                <Input type='text'
                                    disabled
                                />
                            </Form.Item>
                        </Col>
                    }
                    <Col className="gutter-row" span={24}>
                        <Form.Item
                            name='MS'
                            label='描述'
                            // rules={requiredStyle}
                        >
                            <TextArea rows={4}/>
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={24}>
                        <Form.Item
                            name='ZT'
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