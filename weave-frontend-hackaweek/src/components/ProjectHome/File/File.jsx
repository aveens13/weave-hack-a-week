import './file.css';
import pdf from '../../../assets/pdf.svg';
import jpeg from '../../../assets/photo.png';
import docx from '../../../assets/docx.png';
import xlsx from '../../../assets/xlsx.png';
import svg from '../../../assets/svg.png';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Uploader from './uploader';
import Modal from '../../Modal/Modal';
export default function File({ project }) {
  const date = new Date(Date.now());
  const uploaded = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const [uploader, setUploader] = useState(false);
  const [files, setFiles] = useState([]);

  //Fetch the files
  useEffect(() => {
    fetch(`/api/files/${project.projectId}`).then((result) => {
      result.json().then((e) => {
        setFiles(e);
      });
    });
  }, [uploader]);

  //Download the file
  const downloadFileClicked = (id) => {
    fetch(`/api/file/${id}`)
      .then((result) => {
        const fileName = result.headers.get('Content-Disposition');
        return result.blob().then((blob) => ({ fileName, blob }));
      })
      .then(({ fileName, blob }) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
      });
  };
  return (
    <>
      <motion.div
        className='file--hero'
        animate={{ scale: 1 }}
        initial={{ scale: 0.9 }}
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <div className='top-file-section'>
          <h2>Project Files</h2>
          <button
            onClick={() =>
              setUploader((prev) => {
                return !prev;
              })
            }
          >
            <FileUploadIcon />
            Upload
          </button>
        </div>
        <div className='recent-file-section'>
          <h3>Recently Uploaded Files</h3>
          <ul>
            <li className='file-preview'>
              <img src={pdf} alt='pdf' />
              <p>new_invoice.pdf</p>
            </li>
            <li className='file-preview'>
              <img src={jpeg} alt='jpeg' />
              <p>background.png</p>
            </li>
            <li className='file-preview'>
              <img src={docx} alt='docx' />
              <p>procedure.docx</p>
            </li>
            <li className='file-preview'>
              <img src={svg} alt='svg' />
              <p>project_logo.svg</p>
            </li>
            <li className='file-preview'>
              <img src={xlsx} alt='xlsx' />
              <p>project_cost.xlsx</p>
            </li>
          </ul>
        </div>
        <div className='all-file-section'>
          <h3>All Files</h3>
          <ul
            style={{
              listStyle: `none`,
              display: `flex`,
              justifyContent: `space-around`,
              fontWeight: 600,
              fontSize: `1rem`,
            }}
          >
            <li>Name</li>
            <li>Type</li>
            <li>File Size</li>
            <li>File Uploaded</li>
          </ul>
          <div className='file-wrapper'>
            {files.map((file) => (
              <ul
                className='file-items'
                onClick={() => downloadFileClicked(file.fileId)}
              >
                <li className='file--name'>
                  {file.fileType == 'application/pdf' ? (
                    <img src={pdf} alt='' />
                  ) : file.fileType == 'docx' ? (
                    <img src={docx} alt='' />
                  ) : file.fileType == 'xlsx/excel' ? (
                    <img src={xlsx} alt='' />
                  ) : (
                    <img src={jpeg} alt='' />
                  )}
                  <div>{file.fileName}</div>
                </li>
                <li>{file.fileType}</li>
                <li>{Math.round(file.fileSize / 1024)} KB</li>
                <li>{file.fileCreated}</li>
              </ul>
            ))}
          </div>
        </div>
      </motion.div>

      <Modal open={uploader} close={() => setUploader(false)}>
        <Uploader close={() => setUploader(false)} project={project} />
      </Modal>
    </>
  );
}
