import { Fade, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useMaterialUIController, setMessageObject } from '../../context/UIContext';
import { Box } from '@mui/system';
import MDAlertRoot from '../MDAlert/MDAlertRoot';
import MDBox from '../MDBox';
import MDAlertCloseIcon from '../MDAlert/MDAlertCloseIcon';
import style from './index.module.css';


export const LoadingProcess = () => {
    const [controller, dispatch] = useMaterialUIController();
    const { loadingAnimation } = controller;

    return (
        <>
            {loadingAnimation ? <Box
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    position: 'fixed',
                    zIndex: 2000,
                    backgroundColor: '#0004',
                }}>
                <Box>
                    <main className={style['main']}>
                        <svg className={style['pl']} viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" strokeLinecap="round" strokeWidth="16" transform="rotate(-90,64,64)">
                                <circle className={style['pl__ring']} r="56" cx="64" cy="64" stroke="#ddd" />
                                <circle className={`${style['pl__worm']} ${style['pl__worm__moving']}`} r="56" cx="64" cy="64" stroke="currentColor" strokeDasharray="22 307.86 22" data-worm />
                            </g>
                            <g data-particles></g>
                        </svg>
                    </main>
                </Box>
            </Box> : null}
        </>
    )
};


export const Message = () => {

    return (
        <Box
            style={{
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                position: 'fixed',
                zIndex: 2000,
                backgroundColor: '#0000',
            }}>
            <MessageRoot
                style={{ marginTop: '1rem' }}
            />
        </Box>
    )
};


export const MessageRoot = ({ ...rest }) => {

    const [controller, dispatch] = useMaterialUIController();
    const { messageObject } = controller;

    let timer = null;

    const handleMessageObject = () => {
        if (timer) { clearTimeout(timer) }
        setMessageObject(dispatch, { ...messageObject, state: "unmount" })
    }

    useEffect(() => {
        if (messageObject.state == 'mount') {
            timer = setTimeout(() => setMessageObject(dispatch, { ...messageObject, state: "fadeOut" }),
                messageObject.type === 'success' ? 3100 : 5300)
        }
    }, [messageObject])

    const messageContainer = (mount = true) => (
        <Fade in={mount} timeout={300}>
            <MDAlertRoot ownerState={{ color: messageObject.type }} {...rest}>
                <MDBox display="flex" alignItems="center" color="white">
                    {messageObject.message}
                </MDBox>
                {messageObject.type != 'success' ? (
                    <MDAlertCloseIcon onClick={mount ? handleMessageObject : null}>&times;</MDAlertCloseIcon>
                ) : null}
            </MDAlertRoot>
        </Fade>
    );
    switch (true) {
        case messageObject.state === "mount":
            return messageContainer();
        case messageObject.state === "fadeOut":
            if (timer) { clearTimeout(timer) }
            setTimeout(() => setMessageObject(dispatch, { ...messageObject, state: "unmount" }), 400);
            return messageContainer(false);
        default:
            messageContainer();
            break;
    }
    return null;
}

