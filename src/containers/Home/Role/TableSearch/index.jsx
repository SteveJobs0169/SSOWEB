import React, {useEffect, useState} from 'react';
import {Button, Col, DatePicker, Divider, Form, Input, Row, Select, theme} from 'antd';
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {search_parameter} from "../../../../redux/actions/containers/Home/TableSearch";

const {RangePicker} = DatePicker;

const App = (props) => {
    const {
        token: {
            colorArray
        },
    } = theme.useToken();

    const [form] = Form.useForm();

    const isShow = false;

    // 是否展开
    const [isExpanded, setIsExpanded] = useState(false);

    const onFinish = (values) => {
        props.search_parameter(values);
        // props?.onClick?.({...originalValue, ...values}, form, onReset);
    };

    const onReset = () => {
        form.resetFields();
    };

    const switchExpanded = () => setIsExpanded(!isExpanded);

    useEffect(() => {
        // form.setFieldsValue(originalValue);
    }, [form])

    // 树形数据结构转换为列表数据
    const convertTreeToList = (treeData) => {
        let list = [];
        for (let i = 0; i < treeData.length; i++) {
            list.push(treeData[i]);
            if (treeData[i].children && treeData[i].children.length > 0) {
                list = list.concat(convertTreeToList(treeData[i].children));
            }
        }
        return list;
    }

    return (
        <>
            <Form
                form={form}
                values={{}}
                onFinish={onFinish}
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
            >
                <Row gutter={12}>
                    <Col className="gutter-row" span={6}>
                        <Form.Item name="JSDM" label="角色代码" rules={[]}>
                            <Input type="text"></Input>
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item name="JSMC" label="角色名称" rules={[]}>
                            <Input type="text"></Input>
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item name="MS" label="描述" rules={[]}>
                            <Input type="text"></Input>
                        </Form.Item>
                    </Col>
                    <Col className="gutter-row" span={6}>
                        <Form.Item name="JSZT" label="角色状态" rules={[]}>
                            <Select
                                allowClear
                                options={[
                                    {
                                        value: 'ZC',
                                        label: '正常',
                                    },
                                    {
                                        value: 'YC',
                                        label: '异常',
                                    },
                                ]}
                            ></Select>
                        </Form.Item>
                    </Col>
                    <Col style={{
                        textAlign: "right"
                    }} className="gutter-row" span={6} offset={18}>
                        <span style={{
                            color: colorArray?.[5],
                            cursor: 'pointer',
                            userSelect: 'none',
                        }}
                              onClick={switchExpanded}
                        >
                            {isShow && (isExpanded ?
                                    (
                                        <>
                                            折叠<UpOutlined/>
                                        </>
                                    ) : (
                                        <>
                                            展开<DownOutlined/>
                                        </>
                                    )
                            )}
                        </span>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            清空
                        </Button>
                    </Col>
                    <Divider/>
                </Row>
            </Form>
        </>
    );
};

export default connect(
    state => ({
        tableSearch: state.tableSearch,
    }),
    {
        search_parameter
    }
)(App)