import React from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/mode/simple';
import './Editor.css';


interface EditorProps { }

class Editor extends React.Component<EditorProps> {
    cm: CodeMirror.Editor | null = null;
    cmContainer: React.RefObject<HTMLTextAreaElement>;

    constructor(props: EditorProps) {
        super(props);
        this.cmContainer = React.createRef();
    }

    componentDidMount() {
        if (!this.cmContainer.current) {
            return;
        }

        CodeMirror.defineSimpleMode("sham", {
            start: [
                { regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: "string" },
                { regex: /true|false|null/, token: "atom" },
                { regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i, token: "number" },
                { regex: /\/(?:\\\/|[^\/])*\//, token: "string-2" },
                { regex: /[\{\[]/, indent: true },
                { regex: /[\}\]]/, dedent: true },
            ]
        });

        this.cm = CodeMirror.fromTextArea(this.cmContainer.current, {
            lineNumbers: true,
            indentUnit: 4,
            mode: 'sham',
            autoCloseBrackets: true,
            fixedGutter: false,
            foldGutter: true,
            matchBrackets: true,
            smartIndent: true,
            electricChars: true,
            indentWithTabs: true,
        });
    }

    componentWillUnmount() {
        this.cm = null;
    }

    render() {
        return (
            <div className="editor">
                <textarea
                    ref={this.cmContainer}
                />
            </div>
        );
    }
}


export default Editor;