import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <div className="navbar">
            <ul>
                <Link className="link" to="/" exact >Home</Link>
            </ul>
        </div>
    )
}