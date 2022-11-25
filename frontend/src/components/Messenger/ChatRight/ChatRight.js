import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseURI, getSender, getSenderFull } from '../../../utils/helper'
import { images } from '../../../utils/imageParser'
import "./ChatRight.css"
import TimeAgo from 'react-timeago'
import englishString from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import useLocalStorage from '../../../utils/useLocalStorage'
import { useSelector } from 'react-redux'

const ChatRight = ({ selectedChat }) => {

	const { socket } = useSelector(state => state.socket)

	const [msgCollection, setMsgCollection] = useState([]);
	const [msg, setMsg] = useState('')
	const [typing, setTyping] = useState(false);
	const [typingTimeout, settypingTimeout] = useState(null);

	const formatter = buildFormatter(englishString);
	const [local,] = useLocalStorage('user');

	const handleChange = (e) => {
		setMsg(e.target.value);
		if (!selectedChat) return;
		socket.emit("typing-started", { roomId: selectedChat._id });

		if (typingTimeout) clearTimeout(typingTimeout);
		settypingTimeout(
			setTimeout(() => {
				socket.emit("typing-stopped", { roomId: selectedChat._id });
			}, 1000)
		);
	}

	const fetchMessages = async () => {
		if (!selectedChat) return;
		try {
			const { data } = await axios.post(`${baseURI}chats`, { chatId: selectedChat._id },
				{ withCredentials: true }
			);
			setMsgCollection(data);
			socket.emit('join-room', selectedChat._id)
		} catch (error) {
			console.log(error)
		}
	};

	const createMessage = (e) => {
		e.preventDefault();
		axios.post(`${baseURI}sendmessage`, { content: msg, chatId: selectedChat._id }, { withCredentials: true }).then((res) => {
			const { data } = res;
			socket.emit('new-message', { data, id: selectedChat._id });
			setMsg('')
			setMsgCollection([...msgCollection, data])
		})
			.catch(err => console.log(err));
	}

	useEffect(() => {
		fetchMessages();
	}, [selectedChat]);

	useEffect(() => {
		if (!socket) {
			return;
		}
		socket.on('message-recieved', (newMessageRevieved) => {
			setMsgCollection([...msgCollection, newMessageRevieved])
		})
		socket.on("typing-started-from-server", () => setTyping(true));
		socket.on("typing-stoped-from-server", () => setTyping(false));
	})

	return (
		<>
			<div className="tab-content messenger">
				<div className="tab-pane active fade show">
					<div className="row merged">
						<div className="col-lg-12">
							<div className="mesg-area-head">
								<div className="active-user">
									<figure><img src={selectedChat && getSenderFull(local, selectedChat.users).pic} alt="" />
										<span className="status f-online"></span>
									</figure>
									<div>
										<h6 className="unread">{selectedChat && getSenderFull(local, selectedChat.users).name}</h6>
										<span>Online</span>
									</div>
								</div>
								<ul className="live-calls">
									<li className="audio-call"><span><svg viewBox="0 0 512 512"><path d="M480.3 320.3L382.1 278.2c-21.41-9.281-46.64-3.109-61.2 14.95l-27.44 33.5c-44.78-25.75-82.29-63.25-108-107.1l33.55-27.48c17.91-14.62 24.09-39.7 15.02-61.05L191.7 31.53c-10.16-23.2-35.34-35.86-59.87-30.19l-91.25 21.06C16.7 27.86 0 48.83 0 73.39c0 241.9 196.7 438.6 438.6 438.6c24.56 0 45.53-16.69 50.1-40.53l21.06-91.34C516.4 355.5 503.6 330.3 480.3 320.3zM463.9 369.3l-21.09 91.41c-.4687 1.1-2.109 3.281-4.219 3.281c-215.4 0-390.6-175.2-390.6-390.6c0-2.094 1.297-3.734 3.344-4.203l91.34-21.08c.3125-.0781 .6406-.1094 .9531-.1094c1.734 0 3.359 1.047 4.047 2.609l42.14 98.33c.75 1.766 .25 3.828-1.25 5.062L139.8 193.1c-8.625 7.062-11.25 19.14-6.344 29.14c33.01 67.23 88.26 122.5 155.5 155.5c9.1 4.906 22.09 2.281 29.16-6.344l40.01-48.87c1.109-1.406 3.187-1.938 4.922-1.125l98.26 42.09C463.2 365.2 464.3 367.3 463.9 369.3z" /></svg></span></li>
									<li className="video-call"><span><svg viewBox="0 0 576 512"><path d="M557.6 102.3c-11.53-7.406-25.88-8.391-38.28-2.688L416 147V128c0-35.35-28.65-64-64-64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h288c35.35 0 64-28.65 64-64v-19.02l103.3 47.36c5.344 2.453 11.03 3.672 16.69 3.672c7.531 0 15.02-2.141 21.59-6.359C569.1 402.3 576 389.7 576 375.1V136C576 122.3 569.1 109.8 557.6 102.3zM368 384c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V128c0-8.822 7.178-16 16-16h288c8.822 0 16 7.178 16 16V384zM528 363.5L416 312.2V199.8l112-51.33V363.5z" /></svg></span></li>
									<li className="uzr-info"><span><svg viewBox="0 0 512 512"><path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM296 336h-16V248C280 234.8 269.3 224 256 224H224C210.8 224 200 234.8 200 248S210.8 272 224 272h8v64h-16C202.8 336 192 346.8 192 360S202.8 384 216 384h80c13.25 0 24-10.75 24-24S309.3 336 296 336zM256 192c17.67 0 32-14.33 32-32c0-17.67-14.33-32-32-32S224 142.3 224 160C224 177.7 238.3 192 256 192z" /></svg></span></li>
									<li>
										<div className="dropdown">
											<button className="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
												<i><svg viewBox="0 0 448 512"><path d="M144 288h-96C21.49 288 0 309.5 0 336v96C0 458.5 21.49 480 48 480h96C170.5 480 192 458.5 192 432v-96C192 309.5 170.5 288 144 288zM144 432h-96v-96h96V432zM144 32h-96C21.49 32 0 53.49 0 80v96C0 202.5 21.49 224 48 224h96C170.5 224 192 202.5 192 176v-96C192 53.49 170.5 32 144 32zM144 176h-96v-96h96V176zM400 288h-96C277.5 288 256 309.5 256 336v96c0 26.51 21.49 48 48 48h96c26.51 0 48-21.49 48-48v-96C448 309.5 426.5 288 400 288zM400 432h-96v-96h96V432zM400 32h-96C277.5 32 256 53.49 256 80v96C256 202.5 277.5 224 304 224h96C426.5 224 448 202.5 448 176v-96C448 53.49 426.5 32 400 32zM400 176h-96v-96h96V176z" /></svg></i>
											</button>
											<div className="dropdown-menu dropdown-menu-right">
												<a className="dropdown-item audio-call" href="https://google.com"><i><svg viewBox="0 0 512 512"><path d="M256 32C112.9 32 4.563 151.1 0 288l.0042 111.9c0 .8379 .3493 1.621 .4723 2.424C2.969 445.6 38.49 480 82.36 480C107.6 480 128 459.6 128 434.4V301.8C128 276.5 107.5 256 82.25 256C70.67 256 59.69 258.4 49.7 262.7C62.23 159.9 149.9 80.14 256 80.13c106.1 .0137 193.8 79.79 206.3 182.6C452.3 258.4 441.3 256 429.8 256C404.5 256 384 276.5 384 301.8v132.6C384 459.6 404.4 480 429.6 480c43.87 0 79.39-34.39 81.88-77.64c.123-.8027 .4724-1.586 .4724-2.424L512 287.9C507.4 151 399.1 32 256 32zM80 304.1v127.8c-17.85-1.215-32-16.12-32-34.28v-59.39C48 320.1 62.16 305.2 80 304.1zM432 431.9V304.1c17.84 1.164 32 16.05 32 34.18v59.39C464 415.8 449.8 430.7 432 431.9z" /></svg></i>Voice Call</a>
												<a href="https://google.com" className="dropdown-item video-call"><i><svg viewBox="0 0 576 512"><path d="M557.6 102.3c-11.53-7.406-25.88-8.391-38.28-2.688L416 147V128c0-35.35-28.65-64-64-64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h288c35.35 0 64-28.65 64-64v-19.02l103.3 47.36c5.344 2.453 11.03 3.672 16.69 3.672c7.531 0 15.02-2.141 21.59-6.359C569.1 402.3 576 389.7 576 375.1V136C576 122.3 569.1 109.8 557.6 102.3zM368 384c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V128c0-8.822 7.178-16 16-16h288c8.822 0 16 7.178 16 16V384zM528 363.5L416 312.2V199.8l112-51.33V363.5zM288 232H231.1V175.1C231.1 162.7 221.3 152 208 152S184 162.7 184 175.1V232H127.1C114.7 232 104 242.7 104 256c0 13.26 10.73 23.1 23.1 23.1H184v56C184 349.3 194.7 360 208 360c13.26 0 23.1-10.74 23.1-23.1V279.1h56C301.3 279.1 312 269.3 312 256S301.3 232 288 232z" /></svg></i>Video Call</a>
												<hr />
												<a href="https://google.com" className="dropdown-item"><i><svg viewBox="0 0 512 512"><path d="M448 32H64C28.65 32 0 60.65 0 96v64c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V96C512 60.65 483.3 32 448 32zM464 160c0 8.822-7.178 16-16 16H64C55.18 176 48 168.8 48 160V96c0-8.822 7.178-16 16-16h384c8.822 0 16 7.178 16 16V160zM448 288H64c-35.35 0-64 28.65-64 64v64c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64v-64C512 316.7 483.3 288 448 288zM464 416c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16v-64c0-8.822 7.178-16 16-16h384c8.822 0 16 7.178 16 16V416zM352 104c-13.25 0-24 10.74-24 24c0 13.25 10.75 24 24 24S376 141.3 376 128C376 114.7 365.3 104 352 104zM416 104c-13.25 0-24 10.74-24 24c0 13.25 10.75 24 24 24S440 141.3 440 128C440 114.7 429.3 104 416 104zM352 360c-13.25 0-24 10.74-24 24c0 13.25 10.75 24 24 24s24-10.75 24-24C376 370.7 365.3 360 352 360zM416 360c-13.25 0-24 10.74-24 24c0 13.25 10.75 24 24 24s24-10.75 24-24C440 370.7 429.3 360 416 360z" /></svg></i>Clear History</a>
												<a href="https://google.com" className="dropdown-item"><i><svg viewBox="0 0 512 512"><path d="M328 160h-144C170.8 160 160 170.8 160 184v144C160 341.2 170.8 352 184 352h144c13.2 0 24-10.8 24-24v-144C352 170.8 341.2 160 328 160zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z" /></svg></i>Block Contact</a>
												<a href="https://google.com" className="dropdown-item"><i><svg viewBox="0 0 448 512"><path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4C156.6 0 141 8.827 132.4 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16C0 120.9 7.125 128 16 128H32v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16C440.9 128 448 120.9 448 112V96C448 87.13 440.9 80 432 80zM171.9 50.88C172.9 49.13 174.9 48 177 48h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4L171.9 50.88zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320C368 456.8 360.8 464 352 464zM224 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S208 183.2 208 192v208C208 408.8 215.2 416 224 416zM144 416C152.8 416 160 408.8 160 400V192c0-8.844-7.156-16-16-16S128 183.2 128 192v208C128 408.8 135.2 416 144 416zM304 416c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16S288 183.2 288 192v208C288 408.8 295.2 416 304 416z" /></svg></i>Delete Contact</a>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-lg-8 col-md-8">
							<div className="mesge-area">
								<ul className="conversations">
									{selectedChat && msgCollection.map(message => {
										return (<li className={local._id === message.sender._id ? 'me' : 'you'} key={message._id}>
											<figure><img src={message.sender.pic} alt="" /></figure>
											<div className="text-box">
												<p>{message.content}</p>
												<span><i><svg viewBox="0 0 512 512"><path d="M480.1 128.1l-272 272C204.3 405.7 198.2 408 192 408s-12.28-2.344-16.97-7.031l-144-144c-9.375-9.375-9.375-24.56 0-33.94s24.56-9.375 33.94 0L192 350.1l255-255c9.375-9.375 24.56-9.375 33.94 0S490.3 119.6 480.1 128.1z" /></svg></i><i><svg viewBox="0 0 512 512"><path d="M480.1 128.1l-272 272C204.3 405.7 198.2 408 192 408s-12.28-2.344-16.97-7.031l-144-144c-9.375-9.375-9.375-24.56 0-33.94s24.56-9.375 33.94 0L192 350.1l255-255c9.375-9.375 24.56-9.375 33.94 0S490.3 119.6 480.1 128.1z" /></svg></i> <TimeAgo date={message.createdAt} formatter={formatter} /></span>
											</div>
										</li>)
									})}
									{typing && <li class="you">
										{/* <figure><img src={} alt="" /></figure> */}
										<div class="text-box">
											<div class="wave">
												<span class="dot"></span>
												<span class="dot"></span>
												<span class="dot"></span>
											</div>
										</div>
									</li>}
								</ul>
							</div>
							<div className="message-writing-box">
								<form method="post" onSubmit={createMessage}>
									<div className="text-area">
										<input value={msg} onChange={handleChange} type="text" placeholder="write your message here.." />
										<button type="submit"><i><svg viewBox="0 0 512 512"><path d="M501.6 4.186c-7.594-5.156-17.41-5.594-25.44-1.063L12.12 267.1C4.184 271.7-.5037 280.3 .0431 289.4c.5469 9.125 6.234 17.16 14.66 20.69l153.3 64.38v113.5c0 8.781 4.797 16.84 12.5 21.06C184.1 511 188 512 191.1 512c4.516 0 9.038-1.281 12.99-3.812l111.2-71.46l98.56 41.4c2.984 1.25 6.141 1.875 9.297 1.875c4.078 0 8.141-1.031 11.78-3.094c6.453-3.625 10.88-10.06 11.95-17.38l64-432C513.1 18.44 509.1 9.373 501.6 4.186zM369.3 119.2l-187.1 208.9L78.23 284.7L369.3 119.2zM215.1 444v-49.36l46.45 19.51L215.1 444zM404.8 421.9l-176.6-74.19l224.6-249.5L404.8 421.9z" /></svg></i></button>
									</div>

									<div className="attach-file">
										<label className="fileContainer">
											<i><svg viewBox="0 0 512 512"><path d="M186.3 512C98.27 512 28 440.7 28 353.6c0-40.56 15.44-81.13 46.32-112l206.8-206.8C304.3 11.58 334.8 0 365.2 0C428.4 0 484 50.63 484 118.8c0 30.44-11.59 60.88-34.76 84.06l-190.1 190.1c-15.47 15.47-35.78 23.21-56.1 23.21c-42.3 0-79.3-33.94-79.3-79.31c0-20.32 7.735-40.64 23.21-56.1l139.7-139.7C291.4 136.3 297.6 133.9 303.7 133.9c12.79 0 24 10.3 24 24c0 6.141-2.344 12.28-7.032 16.97l-139.7 139.7c-6.11 6.11-9.165 14.13-9.165 22.16c0 18.1 14.78 31.32 31.32 31.32c8.024 0 16.05-3.055 22.16-9.165l190.1-190.1c13.81-13.81 20.72-31.96 20.72-50.11c0-40.94-33.42-70.84-70.83-70.84c-18.14 0-36.28 6.903-50.1 20.72L108.3 275.5c-21.52 21.53-32.28 49.79-32.28 78.06c0 30.87 22.98 109.3 110.3 109.3c28.6 0 57.21-10.42 78.05-31.27l156.5-156.5c4.688-4.688 10.83-7.032 16.97-7.032c12.79 0 24 10.3 24 24c0 6.141-2.344 12.28-7.032 16.97l-156.5 156.5C268.4 495.5 228.6 512 186.3 512z" /></svg></i>
											<input type="file" />
										</label>
									</div>
								</form>
							</div>
						</div>
						<div className="col-lg-4 col-md-4">
							<div className="chater-info">
								<figure><img src={selectedChat && getSenderFull(local, selectedChat.users).pic} alt="" /></figure>
								<h6>{selectedChat && getSenderFull(local, selectedChat.users).name}</h6>
								<span>Online</span>
								<div className="userabout">
									<span>About</span>
									<p>I love reading, traveling and discovering new things. You need to be happy in life.</p>
									<ul>
										<li><span>Phone:</span> +123976980</li>
										<li><span>Website:</span> <a href="https://google.com" title="">www.abc.com</a></li>
										<li><span>Email:</span> {selectedChat && getSenderFull(local, selectedChat.users).email}</li>
										<li><span>Phone:</span> Ontario, Canada</li>
									</ul>
									<div className="media">
										<span>Media</span>
										<ul>
											<li><img src={images['audio-user1.jpg']} alt="" /></li>
											<li><img src={images['audio-user1.jpg']} alt="" /></li>
											<li><img src={images['audio-user1.jpg']} alt="" /></li>
											<li><img src={images['audio-user1.jpg']} alt="" /></li>
											<li><img src={images['audio-user1.jpg']} alt="" /></li>
											<li><img src={images['audio-user1.jpg']} alt="" /></li>
											<li><img src={images['audio-user1.jpg']} alt="" /></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ChatRight