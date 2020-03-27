import * as React from 'react';
import { Link } from 'react-router-dom';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {

    public render() {
        return (
            <div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/counter">Counter</Link>
                    </li>
                    <li>
                        <Link to="/fetch-data">Fetch Data</Link>
                    </li>
                </ul>
            </div>
        );
    }
}
