import React, { useState, useEffect } from "react";

import { SkeletonPlaceholder } from "@carbon/react";

import * as Query from "./Query";

import {ToastNotification} from "carbon-components-react";

import io from "./SCSS/Index.module.scss";

const Component = ({ Evaluation }) => {
    const [awaiting, setAwaiting] = useState(true);

    const Handler = Query.State(setAwaiting);

    useEffect(() => {
        switch (awaiting) {
            case true:
                return () => setAwaiting(false);
            case false:
                return () => setAwaiting(true);
            default:
                return () => setAwaiting(null);
        }
    }, [awaiting]);

    const Awaitable = () => {
        const Subtitle = () => (
            <span>Subtitle text goes here. <a href="#example">Example link</a></span>
        );

        return (
            <div className={io.component}>
                <ToastNotification
                    caption="00:00:00 AM"
                    iconDescription="Close Button Description"
                    statusIconDescription="Error"
                    subtitle={<span>Subtitle text goes here. <a href="#example">Example link</a></span>}
                    timeout={0}
                    title="Notification Title"
                    lowContrast={true}
                >
                    <p>
                        Content
                    </p>
                </ToastNotification>
            </div>
        );
    };

    return ((Handler.Waiter && Handler.Waiter !== false) || awaiting === true)
        ? (<SkeletonPlaceholder/>) : (<Awaitable/>);

};

export default Component;