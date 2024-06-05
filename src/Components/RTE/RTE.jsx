import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import './RTE.css';

import attach from '../../assets/rte/attach.svg';
import bold from '../../assets/rte/bold.svg';
import calign from '../../assets/rte/calign.svg';
import code from '../../assets/rte/code.svg';
import image from '../../assets/rte/image.svg';
import italic from '../../assets/rte/italic.svg';
import lalign from '../../assets/rte/lalign.svg';
import olist from '../../assets/rte/olist.svg';
import qoute from '../../assets/rte/qoute.svg';
import ralign from '../../assets/rte/ralign.svg';
import ulist from '../../assets/rte/ulist.svg';

const RTE = () => {
  const [value, setValue] = useState('');
  const [activeButtons, setActiveButtons] = useState({});

  const customIcons = {
    bold: `<img src="${bold}" alt="bold" />`,
    italic: `<img src="${italic}" alt="italic" />`,
    link: `<img src="${attach}" alt="link" />`,
    blockquote: `<img src="${qoute}" alt="blockquote" />`,
    image: `<img src="${image}" alt="image" />`,
    code: `<img src="${code}" alt="code" />`,
    listOrdered: `<img src="${olist}" alt="ordered list" />`,
    listBullet: `<img src="${ulist}" alt="bullet list" />`,
    alignLeft: `<img src="${lalign}" alt="left align" />`,
    alignCenter: `<img src="${calign}" alt="center align" />`,
    alignRight: `<img src="${ralign}" alt="right align" />`
  };

  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic'], 
        ['link', 'blockquote', 'image', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': 'left' }, { 'align': 'center' }, { 'align': 'right' }]
      ],
    }
  };

  const icons = ReactQuill.Quill.import('ui/icons');
  icons['bold'] = customIcons.bold;
  icons['italic'] = customIcons.italic;
  icons['link'] = customIcons.link;
  icons['blockquote'] = customIcons.blockquote;
  icons['image'] = customIcons.image;
  icons['code-block'] = customIcons.code;
  icons['list']['ordered'] = customIcons.listOrdered;
  icons['list']['bullet'] = customIcons.listBullet;
  icons['align']['left'] = customIcons.alignLeft; 
  icons['align']['center'] = customIcons.alignCenter;
  icons['align']['right'] = customIcons.alignRight;

  const handleButtonClick = (button) => {
    setActiveButtons(prevState => ({
      ...prevState,
      [button]: !prevState[button]
    }));
  };

  useEffect(() => {
    const toolbarButtons = document.querySelectorAll('.ql-toolbar .ql-formats button');
    toolbarButtons.forEach(button => {
      button.addEventListener('click', () => {
        const format = button.classList[1].split('-')[1];
        handleButtonClick(format);
      });
    });
    return () => {
      toolbarButtons.forEach(button => {
        button.removeEventListener('click', () => {
          const format = button.classList[1].split('-')[1];
          handleButtonClick(format);
        });
      });
    };
  }, []);

  useEffect(() => {
    Object.keys(activeButtons).forEach(key => {
      const button = document.querySelector(`.ql-${key}`);
      if (button) {
        button.style.backgroundColor = activeButtons[key] ? '#f4e8f6' : 'white';
      }
    });
  }, [activeButtons]);

  return (
    <div className='root'>
      <div className='container'>
        <div className="title">
          <p>Your answer</p>
        </div>
        <div className="editor">
          <ReactQuill
            value={value}
            onChange={setValue}
            modules={modules}
            placeholder="Start typing your answer"
            className="custom-editor"
          />
        </div>
        <div className="btn">
          <button
            onClick={() => alert(value)}
          >
            Post Your Answer
          </button>
          <p>By clicking “Post Your Answer”, you agree to our <br /> <span>terms of service</span> and <span>privacy policy</span>.</p>
        </div>
      </div>
    </div>
  );
};

export default RTE;
