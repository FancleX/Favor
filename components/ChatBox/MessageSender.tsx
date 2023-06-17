import React from 'react'

export interface Props {
    onSend(text: string): Promise<void>
}

export default function MessageSender({ }: Props) {
    return (
        <div>MessageSender</div>
    )
}
