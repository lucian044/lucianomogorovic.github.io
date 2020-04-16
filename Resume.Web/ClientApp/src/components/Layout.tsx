import * as React from 'react';
import NavMenu from './NavMenu';

export default (props: { children?: React.ReactNode }) => (
    <div className='main-grid'>
        <NavMenu/>
        <div className='content-container'>
            <div className='content'>
                {props.children}
            </div>
        </div>
    </div>
);
