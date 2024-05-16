import React from 'react';
import './index.css';

const App = (props) => {

    return (
        <>
            <div className="table-header-container"
            >
                <div className="dataList-container">数据列表</div>
                {
                    props.children
                }
            </div>
        </>
    );
};

export default App;
