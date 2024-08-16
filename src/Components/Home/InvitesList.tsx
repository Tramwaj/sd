import React from "react";
import { Invite } from "../../Pages/HomePage";
import { Button, Container, ListGroup } from "react-bootstrap";
import './invitesList.css'

interface InvitesProps {
    invites: Invite[];
    buttonAccept: string | null;
    onclickAccept: ((id: string) => void) | undefined;
    buttonReject: string;
    onclickReject: (id: string) => void;
}

export const InvitesList: React.FC<InvitesProps> = ({ invites, buttonAccept, onclickAccept, buttonReject, onclickReject }) => {
    return (
        <Container className="container">
            <ListGroup className="group">
                <div className="invite-list">
                    {invites.map(invite => (
                        <div className="invite-single"key={invite.id}>
                            <div>Invitee: {invite.invitee} / Inviter: {invite.inviter} / Starting Player: {invite.playerStarting}</div>
                            {buttonAccept &&
                                <Button className="invite-button" onClick={() => onclickAccept!(invite.id)} >{buttonAccept ?? "ERR"}</Button>
                            }
                            <Button className="invite-button" onClick={() => onclickReject(invite.id)} value={buttonReject} >{buttonReject}</Button>

                        </div>
                    ))}
                </div>
            </ListGroup>
        </Container>
    )
}