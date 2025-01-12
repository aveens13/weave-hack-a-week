import './overview.css';
import FlagIcon from '@mui/icons-material/Flag';
import { Send, AccessTimeFilledTwoTone } from '@mui/icons-material';
import img from '../../../assets/avatars/2.png';
import { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import Description from './Description';
import Message from './message_component/message';
import { UserContext } from '../../../App';
import { DatePicker, Space } from 'antd';

export default function Overview({ project, taskInfo }) {
  const [text, setText] = useState();
  const [message, setMessage] = useState([]);
  const [assign, setAssign] = useState(false);
  const user = useContext(UserContext);
  let ws = new WebSocket('ws://localhost:8000/');

  //For websocket connection in frontend
  useEffect(() => {
    ws.onopen = () => {
      console.log('Connection opened!');
    };
    ws.onmessage = ({ data }) => {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result;
        setMessage((prev) => {
          return [...prev, JSON.parse(text)];
        });
      };
      reader.readAsText(data);
    };
    ws.onclose = function () {
      ws = null;
    };
    // Clean up WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    fetch(`/api/messages/${project.projectId}`).then((res) => {
      res.json().then((e) => {
        setMessage(e);
      });
    });
  }, []);

  function handleChange(e) {
    setText({
      sender: user.data.name,
      userId: user.data.userId,
      projectId: project.projectId,
      text: e.target.value,
    });
  }

  function handleClick() {
    if (!ws) {
      console.log('No WebSocket connection :(');
      return;
    }
    ws.send(JSON.stringify(text));
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      // Perform the desired action when "Enter" key is pressed
      handleClick();
    }
  }
  async function handleAddLink() {
    const { value: url } = await Swal.fire({
      input: 'url',
      inputLabel: 'URL address',
      inputPlaceholder: 'Enter the URL',
    });

    if (url) {
      fetch(`/api/update/${project.projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          github_link: url,
        }),
      });
    }
  }

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
      <div className='project-info-hero'>
        <div className='header'>
          <h1 style={{ fontWeight: 600 }}>{project.projectTitle}</h1>
          {assign ? (
            <div className='button'>
              <DatePicker onChange={onChange} />
            </div>
          ) : (
            <div className='button'>
              <button onClick={() => setAssign(true)}>
                <AccessTimeFilledTwoTone />
                Assign meeting time
              </button>
            </div>
          )}
        </div>
        <div className='info-div'>
          <p className='grey'>Priority</p>
          <div className='priority-tag'>
            <FlagIcon />
            Normal
          </div>
        </div>
        <div className='info-div'>
          <p className='grey'>Members</p>
          {project.members.map((member) => (
            <div className='member-info' key={member.userId}>
              <img src={img} alt='' />
              <p className='name'>{member.name}</p>
            </div>
          ))}
        </div>
        <div className='info-div'>
          <p className='grey'>Github</p>
          <p className='link' onClick={handleAddLink}>
            {project.github_link ? 'Update' : 'Add'} github Link
          </p>
        </div>
        {project.projectSupervisor && (
          <div className='info-div'>
            <p className='grey'>Supervisor</p>
            <p className='name'>{project.projectSupervisor}</p>
          </div>
        )}
      </div>
      <div className='project-announcements'>
        <div className='main-overview'>
          <Description project={project} taskInfo={taskInfo} />
        </div>
        <div className='activity'>
          <h3>Activity</h3>
          <div className='comment-section'>
            {message.map((e) => (
              <Message message={e} />
            ))}
          </div>
          <div className='announce'>
            <input
              type='text'
              placeholder='Announce'
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <div className='icon' onClick={handleClick}>
              <Send />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
