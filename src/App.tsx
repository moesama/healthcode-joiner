import { createRef, useState } from "react";
import "./App.less";
import { Card, Tabs, Upload, UploadFile } from "antd";
import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Preview } from "./Preview";

function Feature({ type }: { type: "health" | "travel" }) {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [loading, setLoading] = useState(false);
    const previewRef = createRef<{ save: Function }>();

    return (<Card style={{ height: "100%", display: "flex", flexDirection: "column" }}
                  bordered={false}
                  cover={
                      <Preview pics={fileList} type={type} onRef={previewRef} loading={loading}
                               onLoad={() => setLoading(false)}/>
                  }
                  actions={[
                      <SaveOutlined key="save" onClick={() => {
                          if (fileList.length) {
                              previewRef.current?.save();
                          }
                      }}/>
                  ]}
    >
        <Upload
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false}
            onChange={({ fileList }) => {
                // setLoading(true);
                setFileList(fileList);
            }}
        >
            <div onClick={() => setLoading(true)}>
                <PlusOutlined style={{ fontSize: "2em", color: "lightgrey" }}/>
            </div>
        </Upload>
    </Card>);
}

function App() {

    return (
        <div className="App">
            <header className="App-header">
                健康码拼接器
            </header>
            <Tabs centered style={{ flex: 1 }}>
                <Tabs.TabPane key="health" tab="健康码">
                    <Feature type="health"/>
                </Tabs.TabPane>
                <Tabs.TabPane key="travel" tab="行程码">
                    <Feature type="travel"/>
                </Tabs.TabPane>
            </Tabs>
        </div>
    );
}

export default App;
