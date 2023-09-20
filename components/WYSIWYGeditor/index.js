import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase'


export class EditorConvertToHTML extends Component {
    constructor(props) {
        super(props);
        const contentBlock = htmlToDraft(props?.value ?? "<p> </p>");
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
            };
        }
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });

        this.props?.onChagedValue(draftToHtml(convertToRaw(editorState.getCurrentContent())))
    };

    uploadImageCallBack = async (file) => {
        if (!file) return;
        const storageRef = ref(
            storage,
            'files/' + file.name + Math.random() * 10,
        );
        const downloadURL = await uploadBytes(storageRef, file).then(async (response) => {
            return await getDownloadURL(response.ref).then(async (downloadURL) => downloadURL);
        });
        return {
            data: {
                link: downloadURL
            }
        };
    }

    render() {
        const { editorState } = this.state;
        return (
            <div className="p-3 bg-white rounded-lg shadow-md">
                <span className="block my-2 text-sm font-bold text-gray-500">{this.props?.label}</span>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    editorStyle={{ minHeight: '200px', maxHeight: '400px' }}
                    toolbar={{
                        image: {
                            urlEnabled: true,
                            uploadEnabled: true,
                            uploadCallback: this.uploadImageCallBack,
                            previewImage: true,
                            alt: { present: false, mandatory: false }
                        },
                    }}

                />

            </div>

        );
    }
}

export default EditorConvertToHTML;