import React from 'react'

export interface Props {
    onSend(text: string): Promise<void>
}

export default function MessageBox({ }: Props) {
    return (
        <div>MessageBox</div>
    )
}
