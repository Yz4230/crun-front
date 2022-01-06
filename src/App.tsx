import styled from "@emotion/styled";
import Editor from "@monaco-editor/react";
import { logEvent } from "firebase/analytics";
import React, { useCallback } from "react";
import { v1 } from "./api";
import ExecButton from "./components/ExecButton";
import SOURCE_DEFAULT from "./default";
import { analytics } from "./firebase";

const Wrapper = styled.div({
  height: "100vh",
  width: "100vw",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridTemplateRows: "7fr 3fr",
});

const EditorWrapper = styled.div({
  position: "relative",
  background: "white",
  gridColumnStart: 1,
  gridColumnEnd: 3,
  gridRowStart: 1,
  gridRowEnd: 2,
});

const ExecButtonWrapper = styled.div({
  position: "absolute",
  bottom: "20px",
  right: "20px",
});

const Std = styled.div<{ colmun: number }>((props) => ({
  background: "white",
  gridColumnStart: props.colmun,
  gridColumnEnd: props.colmun + 1,
  gridRowStart: 2,
  gridRowEnd: 3,
  border: "1px solid black",
  borderTop: "2px solid black",
  overflow: "scroll",
  padding: "1em",
}));

const App: React.FC = () => {
  const [source, setSource] = React.useState(SOURCE_DEFAULT);
  const [stdout, setStdout] = React.useState("");
  const [stderr, setStderr] = React.useState("");
  const [executing, setExecuting] = React.useState(false);

  const onChange = useCallback((newValue?: string) => {
    if (newValue) {
      setSource(newValue);
    }
  }, []);

  const onSubmit = useCallback(async () => {
    setExecuting(true);
    logEvent(analytics, "submit_source", {
      source,
    });
    const res = await v1.RunProgramRequest(source);

    if (res.compile_output && res.compile_output.exit_code != 0) {
      // compile error
      setStderr(res.compile_output.stderr);
      setStdout(res.compile_output.stdout);
    } else if (res.program_output) {
      // program output
      setStdout(res.program_output.stdout);
      setStderr(res.program_output.stderr);
    }
    setExecuting(false);
  }, [executing, source]);

  return (
    <Wrapper>
      <EditorWrapper>
        <Editor
          language="c"
          onChange={onChange}
          defaultValue={SOURCE_DEFAULT}
        ></Editor>
        <ExecButtonWrapper>
          <ExecButton onClick={onSubmit} executing={executing} />
        </ExecButtonWrapper>
      </EditorWrapper>
      <Std colmun={1}>
        <pre>{stdout}</pre>
      </Std>
      <Std colmun={2}>
        <pre>{stderr}</pre>
      </Std>
    </Wrapper>
  );
};

export default App;
