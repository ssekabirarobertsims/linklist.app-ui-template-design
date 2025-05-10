import React, { useState, useContext, useEffect } from "react";
import RemoveElement from "../functions/Remove.Element.Function";
import { CgClose } from "react-icons/cg";
import DisplayElement from "../functions/Display.Element.Function";
import axios from "axios";

import SecondaryAuthenticationObjectContext from "../context/Secondary.Authentication.Object.Context";

interface SecondaryAuthenticationProps {
    date: string;
    message: string;
    request_id: string; 
    status_code: string;
    data: {
        id: string,
        username: string,
        avatar: string,
        email: string,
        token: string,
        subscribed: string,
        verified: string,
    }
}

type ListItemProperties = {
    id: string;
    title: string;
    link: string;
    admin_id: string;
};

interface UpdateLinkFormProps {
    selectedLink: ListItemProperties | null;
    onUpdate: (updatedLink: ListItemProperties) => void;
}

const UpdateLinkFormComponent: React.FunctionComponent<UpdateLinkFormProps> = ({
    selectedLink,
    onUpdate,
}) => {
    const currentAdmin = useContext(SecondaryAuthenticationObjectContext) as SecondaryAuthenticationProps;

    const [title, setTitle] = useState<string>(selectedLink?.title || "");
    const [link, setLink] = useState<string>(selectedLink?.link || "");

    useEffect(() => {
        if (selectedLink) {
            setTitle(selectedLink.title);
            setLink(selectedLink.link);
        }
    }, [selectedLink]);

    const handleSubmit = async () => {
        if (!selectedLink) return;

        try {
            const request = await axios.put(
                `http://localhost:3000/saved/links/${selectedLink.id}`,
                { title, link },
                {
                    headers: {
                        Authorization: String(`Bearer ${currentAdmin?.data?.token}` as Partial<Pick<SecondaryAuthenticationProps, "message">>),
                        "Content-Type": "application/json",
                    },
                }
            );

            const response = request.data;

            if (request.status === 200 as Required<Readonly<number>>) {
                onUpdate({ ...selectedLink, title, link });
                const updateForm = document.querySelector(".update-link-form-component") as Required<HTMLElement>;
                RemoveElement(updateForm);
                const notification = document.querySelector(".link-updating-notification-hamburg-component") as Required<HTMLElement>;
                DisplayElement(notification);
                setTimeout(() => {
                    RemoveElement(notification);
                }, 5500 as Required<Readonly<number>>);
            } else {
                console.error("Failed to update the link:", response);
            }
        } catch (error) {
            console.error("Error updating the link:", error);
        }
    };

    return (
        <div className="update-link-form-component">
            <form>
<article>
                <span
                    className="close"
                    onClick={() => {
                        RemoveElement((document.querySelector(".update-link-form-component") as Required<HTMLElement>));
                        (window.document.querySelector("#update-link-form-title-input") as Required<HTMLInputElement>).value = "" as Required<Readonly<string>>;
                        (window.document.querySelector("#update-link-form-link-input") as Required<HTMLInputElement>).value = "" as Required<Readonly<string>>;
                    }}
                >
                    <CgClose />
                </span>
<h2>Update Link</h2>
                <input
                    type="text"
                    id="update-link-form-title-input"
                    placeholder="Enter new title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    maxLength={Number(20) as Required<Readonly<number>>}
                />
                <input
                    type="url"
                    id="update-link-form-link-input"
                    placeholder="Enter new link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                />
                <button type="button" onClick={handleSubmit}>
                    Update Link
                </button>
</article>
            </form>
        </div>
    );
};

export default UpdateLinkFormComponent;
